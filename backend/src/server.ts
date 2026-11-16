import http from "http";
import { Server as SocketIOServer } from "socket.io";
import app from "./app.js";
import { connectDatabase } from "./config/database.js";
import { env } from "./config/env.js";
import { initSocketIO } from "./modules/messaging/message.socket.js";

const PORT = Number(env.PORT) || 5000;

const bootstrap = async () => {
  await connectDatabase();

  const httpServer = http.createServer(app);

  const io = new SocketIOServer(httpServer, {
    cors: { origin: env.CLIENT_URL, credentials: true },
  });

  initSocketIO(io);

  httpServer.listen(PORT, () => {
    console.log(`🚀 Creators Hub API running on http://localhost:${PORT}`);
    console.log("📡 Socket.IO server ready");
    console.log(`🌍 Environment: ${env.NODE_ENV}`);
  });

  const shutdown = (signal: string) => {
    console.log(`\n${signal} received. Shutting down gracefully...`);
    httpServer.close(() => {
      console.log("HTTP server closed");
      process.exit(0);
    });
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
};

bootstrap().catch((err) => {
  console.error("❌ Failed to start server:", err);
  process.exit(1);
});
