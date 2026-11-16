import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { messageService } from "./message.service.js";

export const getConversations = asyncHandler(async (req: Request, res: Response) => {
  const conversations = await messageService.getConversations(req.user!.userId);
  return ApiResponse.success(res, conversations);
});

export const startConversation = asyncHandler(async (req: Request, res: Response) => {
  const conversation = await messageService.getOrCreateConversation(
    req.user!.userId,
    String(req.params.userId)
  );
  return ApiResponse.success(res, conversation);
});

export const sendMessage = asyncHandler(async (req: Request, res: Response) => {
  const { content } = req.body;
  const message = await messageService.sendMessage(
    req.user!.userId,
    String(req.params.conversationId),
    content
  );
  return ApiResponse.created(res, message);
});

export const getMessages = asyncHandler(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 50;
  const result = await messageService.getMessages(
    String(req.params.conversationId),
    page,
    limit
  );
  return ApiResponse.paginated(res, result.messages, result.total, page, limit);
});
