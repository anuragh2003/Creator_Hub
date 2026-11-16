import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { env } from "./config/env.js";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware.js";

import authRouter from "./modules/auth/auth.routes.js";
import userRouter from "./modules/users/user.routes.js";
import postRouter from "./modules/posts/post.routes.js";
import discoveryRouter from "./modules/discovery/discovery.routes.js";
import socialRouter from "./modules/social/social.routes.js";
import collaborationRouter from "./modules/collaborations/collaboration.routes.js";
import messageRouter from "./modules/messaging/message.routes.js";
import challengeRouter from "./modules/challenges/challenge.routes.js";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

if (env.NODE_ENV !== "test") {
  app.use(morgan(env.NODE_ENV === "development" ? "dev" : "combined"));
}

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Creators Hub API is running",
    data: {
      status: "healthy",
      timestamp: new Date().toISOString(),
      environment: env.NODE_ENV,
    },
  });
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/discovery", discoveryRouter);
app.use("/api/social", socialRouter);
app.use("/api/collaborations", collaborationRouter);
app.use("/api/messages", messageRouter);
app.use("/api/challenges", challengeRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
