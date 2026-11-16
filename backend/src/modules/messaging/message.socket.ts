import type { Server as SocketIOServer, Socket } from "socket.io";
import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";
import type { JwtPayload } from "../../middlewares/auth.middleware.js";

type AuthenticatedSocket = Socket & { user?: JwtPayload };

export const initSocketIO = (io: SocketIOServer): void => {
  io.use((socket: AuthenticatedSocket, next) => {
    const token = socket.handshake.auth?.token as string | undefined;
    if (!token) return next(new Error("Authentication required"));

    try {
      const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
      socket.user = decoded;
      next();
    } catch {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket: AuthenticatedSocket) => {
    const user = socket.user;
    if (!user) return;
    console.log(`🔌 Socket connected: ${user.userId}`);

    socket.join(`user:${user.userId}`);

    socket.on("join:conversation", (conversationId: string) => {
      socket.join(`conversation:${conversationId}`);
    });

    socket.on("leave:conversation", (conversationId: string) => {
      socket.leave(`conversation:${conversationId}`);
    });

    socket.on("message:send", (data: { conversationId: string; content: string }) => {
      socket.to(`conversation:${data.conversationId}`).emit("message:receive", {
        conversationId: data.conversationId,
        content: data.content,
        sender: user.userId,
        timestamp: new Date().toISOString(),
      });
    });

    socket.on("disconnect", () => {
      console.log(`🔌 Socket disconnected: ${user.userId}`);
    });
  });
};
