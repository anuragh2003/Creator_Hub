import { Router } from "express";
import { createPost, getFeed, getPost } from "./post.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const router = Router();

router.get("/feed", getFeed);
router.get("/:postId", getPost);
router.post("/", authenticate, createPost);

export default router;
