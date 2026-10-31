import { createServer } from "node:http";
import { Server } from "socket.io";
import { app } from "./app";
import { env } from "./config/env";
import { prisma } from "./config/prisma";
import { registerChatSockets } from "./sockets/chat";

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: env.CLIENT_ORIGIN, credentials: true, methods: ["GET", "POST"] },
  transports: ["websocket", "polling"],
});
registerChatSockets(io);

httpServer.listen(env.PORT, () => {
  console.log(`Omnify API listening on http://localhost:${env.PORT}`);
});

async function shutdown(signal: string) {
  console.log(`${signal} received; shutting down`);
  io.close();
  httpServer.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}
process.on("SIGINT", () => void shutdown("SIGINT"));
process.on("SIGTERM", () => void shutdown("SIGTERM"));
