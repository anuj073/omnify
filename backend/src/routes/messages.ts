import { Router } from "express";
import { z } from "zod";
import { prisma } from "../config/prisma";
import { authenticate } from "../middleware/auth";

export const messagesRouter = Router();
messagesRouter.use(authenticate);

messagesRouter.get("/:conversationId", async (req, res) => {
  const conversationId = z.string().uuid().safeParse(req.params.conversationId);
  if (!conversationId.success) {
    res.status(400).json({ error: "Invalid conversation ID" });
    return;
  }
  const membership = await prisma.conversationMember.findUnique({
    where: { conversationId_userId: { conversationId: conversationId.data, userId: req.user!.id } },
  });
  if (!membership) {
    res.status(404).json({ error: "Conversation not found" });
    return;
  }
  const cursor = typeof req.query.cursor === "string" ? req.query.cursor : undefined;
  const limit = Math.min(Math.max(Number(req.query.limit) || 30, 1), 100);
  const messages = await prisma.message.findMany({
    where: { conversationId: conversationId.data },
    take: limit + 1,
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
    orderBy: { createdAt: "desc" },
    include: {
      sender: { select: { id: true, name: true, avatarUrl: true } },
      receipts: { select: { userId: true, deliveredAt: true, readAt: true } },
    },
  });
  const hasMore = messages.length > limit;
  if (hasMore) messages.pop();
  res.json({ messages: messages.reverse(), nextCursor: hasMore ? messages[0]?.id ?? null : null });
});
