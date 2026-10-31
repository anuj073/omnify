import { Router } from "express";
import { z } from "zod";
import { prisma } from "../config/prisma";
import { authenticate } from "../middleware/auth";

export const conversationsRouter = Router();
conversationsRouter.use(authenticate);

const createSchema = z.object({
  memberIds: z.array(z.string().uuid()).min(1).max(49),
  type: z.enum(["DIRECT", "GROUP"]).default("DIRECT"),
  title: z.string().trim().min(1).max(100).optional(),
});

conversationsRouter.post("/", async (req, res) => {
  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid conversation data", details: parsed.error.flatten() });
    return;
  }
  const { memberIds, type, title } = parsed.data;
  const uniqueIds = [...new Set([req.user!.id, ...memberIds])];
  if (type === "DIRECT" && uniqueIds.length !== 2) {
    res.status(400).json({ error: "A direct conversation must contain exactly two users" });
    return;
  }
  if (type === "GROUP" && uniqueIds.length < 2) {
    res.status(400).json({ error: "A group must contain at least two users" });
    return;
  }
  const users = await prisma.user.findMany({ where: { id: { in: uniqueIds } }, select: { id: true } });
  if (users.length !== uniqueIds.length) {
    res.status(400).json({ error: "One or more users do not exist" });
    return;
  }

  if (type === "DIRECT") {
    const candidates = await prisma.conversation.findMany({
      where: { type: "DIRECT", members: { some: { userId: req.user!.id } } },
      include: { members: true },
      take: 100,
      orderBy: { updatedAt: "desc" },
    });
    const existing = candidates.find((conversation) =>
      conversation.members.length === 2 && uniqueIds.every((id) => conversation.members.some((member) => member.userId === id))
    );
    if (existing) {
      res.status(200).json({ conversation: existing });
      return;
    }
  }

  const conversation = await prisma.conversation.create({
    data: {
      type,
      title: type === "GROUP" ? title : null,
      members: { create: uniqueIds.map((userId) => ({ userId })) },
    },
    include: { members: { include: { user: { select: { id: true, name: true, email: true, avatarUrl: true } } } } },
  });
  res.status(201).json({ conversation });
});

conversationsRouter.get("/", async (req, res) => {
  const conversations = await prisma.conversation.findMany({
    where: { members: { some: { userId: req.user!.id } } },
    include: {
      members: { include: { user: { select: { id: true, name: true, avatarUrl: true } } } },
      messages: { orderBy: { createdAt: "desc" }, take: 1, include: { sender: { select: { id: true, name: true } } } },
    },
    orderBy: { updatedAt: "desc" },
  });
  res.json({ conversations });
});

conversationsRouter.get("/:conversationId", async (req, res) => {
  const conversation = await prisma.conversation.findFirst({
    where: { id: req.params.conversationId, members: { some: { userId: req.user!.id } } },
    include: { members: { include: { user: { select: { id: true, name: true, avatarUrl: true } } } } },
  });
  if (!conversation) {
    res.status(404).json({ error: "Conversation not found" });
    return;
  }
  res.json({ conversation });
});
