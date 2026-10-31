import { Router } from "express";
import { z } from "zod";
import { prisma } from "../config/prisma";
import { authenticate } from "../middleware/auth";

export const usersRouter = Router();
usersRouter.use(authenticate);

// Search the user directory so clients can start direct conversations.
// Authentication is required and private account fields are never returned.
usersRouter.get("/", async (req, res) => {
  const parsed = z.string().trim().min(2).max(80).safeParse(req.query.search);
  if (!parsed.success) {
    res.status(400).json({ error: "Search must contain between 2 and 80 characters" });
    return;
  }

  const users = await prisma.user.findMany({
    where: {
      id: { not: req.user!.id },
      OR: [
        { name: { contains: parsed.data, mode: "insensitive" } },
        { email: { contains: parsed.data, mode: "insensitive" } },
      ],
    },
    select: { id: true, name: true, email: true, avatarUrl: true },
    orderBy: { name: "asc" },
    take: 20,
  });

  res.json({ users });
});
