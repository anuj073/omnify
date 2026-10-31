import type { Server, Socket } from "socket.io";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { env } from "../config/env";
import { prisma } from "../config/prisma";

type SocketUser = { id: string; email: string };
type AuthenticatedSocket = Socket & { data: { user: SocketUser } };

const sendMessageSchema = z.object({
  conversationId: z.string().uuid(),
  content: z.string().trim().min(1).max(5000),
  clientMessageId: z.string().max(100).optional(),
});

export function registerChatSockets(io: Server) {
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (typeof token !== "string") return next(new Error("Authentication required"));
      const payload = jwt.verify(token, env.JWT_ACCESS_SECRET) as jwt.JwtPayload;
      if (!payload.sub || typeof payload.email !== "string") return next(new Error("Invalid token"));
      socket.data.user = { id: payload.sub, email: payload.email };
      next();
    } catch {
      next(new Error("Invalid or expired access token"));
    }
  });

  io.on("connection", (rawSocket) => {
    const socket = rawSocket as AuthenticatedSocket;
    const userId = socket.data.user.id;
    socket.join(`user:${userId}`);
    socket.emit("connected", { userId });

    socket.on("join_conversation", async (payload: unknown, ack?: (result: unknown) => void) => {
      try {
        const parsed = z.object({ conversationId: z.string().uuid() }).safeParse(payload);
        if (!parsed.success) return ack?.({ ok: false, error: "Invalid conversation ID" });
        const member = await prisma.conversationMember.findUnique({
          where: { conversationId_userId: { conversationId: parsed.data.conversationId, userId } },
        });
        if (!member) return ack?.({ ok: false, error: "Not a conversation member" });
        socket.join(`conversation:${parsed.data.conversationId}`);
        ack?.({ ok: true });
      } catch {
        ack?.({ ok: false, error: "Unable to join conversation" });
      }
    });

    socket.on("send_message", async (payload: unknown, ack?: (result: unknown) => void) => {
      try {
        const parsed = sendMessageSchema.safeParse(payload);
        if (!parsed.success) return ack?.({ ok: false, error: "Invalid message payload" });
        const member = await prisma.conversationMember.findUnique({
          where: { conversationId_userId: { conversationId: parsed.data.conversationId, userId } },
        });
        if (!member) return ack?.({ ok: false, error: "Not a conversation member" });

        const message = await prisma.message.create({
          data: { conversationId: parsed.data.conversationId, senderId: userId, content: parsed.data.content },
          include: { sender: { select: { id: true, name: true, avatarUrl: true } } },
        });
        await prisma.conversation.update({
          where: { id: parsed.data.conversationId },
          data: { updatedAt: new Date() },
        });
        const event = { message, clientMessageId: parsed.data.clientMessageId };
        io.to(`conversation:${parsed.data.conversationId}`).emit("new_message", event);
        ack?.({ ok: true, message });
      } catch (error) {
        console.error("send_message failed", error);
        ack?.({ ok: false, error: "Unable to send message" });
      }
    });

    socket.on("typing_start", async (payload: unknown) => {
      const parsed = z.object({ conversationId: z.string().uuid() }).safeParse(payload);
      if (!parsed.success) return;
      const member = await prisma.conversationMember.findUnique({
        where: { conversationId_userId: { conversationId: parsed.data.conversationId, userId } },
      });
      if (member) socket.to(`conversation:${parsed.data.conversationId}`).emit("user_typing", { conversationId: parsed.data.conversationId, userId });
    });

    socket.on("typing_stop", async (payload: unknown) => {
      const parsed = z.object({ conversationId: z.string().uuid() }).safeParse(payload);
      if (!parsed.success) return;
      const member = await prisma.conversationMember.findUnique({
        where: { conversationId_userId: { conversationId: parsed.data.conversationId, userId } },
      });
      if (member) socket.to(`conversation:${parsed.data.conversationId}`).emit("user_stopped_typing", { conversationId: parsed.data.conversationId, userId });
    });

    socket.on("disconnect", () => {
      socket.broadcast.emit("user_offline", { userId });
    });
  });
}
