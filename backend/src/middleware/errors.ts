import type { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";

export function notFound(_req: Request, res: Response) {
  res.status(404).json({ error: "Route not found" });
}

export function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
    res.status(409).json({ error: "A record with this value already exists" });
    return;
  }
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
    res.status(404).json({ error: "Record not found" });
    return;
  }
  console.error(error);
  res.status(500).json({ error: "Internal server error" });
}
