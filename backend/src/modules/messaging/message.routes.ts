import { Router } from "express";
import { getConversations, startConversation, sendMessage, getMessages } from "./message.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const router = Router();

router.use(authenticate);

router.get("/conversations", getConversations);
router.post("/conversations/:userId", startConversation);
router.post("/:conversationId", sendMessage);
router.get("/:conversationId", getMessages);

export default router;
