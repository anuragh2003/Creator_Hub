import { Router } from "express";
import { followUser, unfollowUser, toggleLike, addComment, getComments } from "./social.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/follow/:userId", authenticate, followUser);
router.delete("/follow/:userId", authenticate, unfollowUser);
router.post("/like/:postId", authenticate, toggleLike);
router.post("/comments/:postId", authenticate, addComment);
router.get("/comments/:postId", getComments);

export default router;
