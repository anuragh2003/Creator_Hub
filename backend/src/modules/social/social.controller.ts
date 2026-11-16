import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { socialService } from "./social.service.js";

export const followUser = asyncHandler(async (req: Request, res: Response) => {
  const result = await socialService.followUser(req.user!.userId, String(req.params.userId));
  return ApiResponse.created(res, result, "Followed successfully");
});

export const unfollowUser = asyncHandler(async (req: Request, res: Response) => {
  await socialService.unfollowUser(req.user!.userId, String(req.params.userId));
  return ApiResponse.success(res, null, "Unfollowed successfully");
});

export const toggleLike = asyncHandler(async (req: Request, res: Response) => {
  const result = await socialService.toggleLike(req.user!.userId, String(req.params.postId));
  return ApiResponse.success(res, result, result.liked ? "Post liked" : "Post unliked");
});

export const addComment = asyncHandler(async (req: Request, res: Response) => {
  const { content } = req.body;
  const comment = await socialService.addComment(req.user!.userId, String(req.params.postId), content);
  return ApiResponse.created(res, comment, "Comment added successfully");
});

export const getComments = asyncHandler(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const result = await socialService.getComments(String(req.params.postId), page, limit);
  return ApiResponse.paginated(res, result.comments, result.total, page, limit);
});
