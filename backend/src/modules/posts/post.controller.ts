import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { createPostSchema } from "./post.validation.js";
import { postService } from "./post.service.js";

export const createPost = asyncHandler(async (req: Request, res: Response) => {
  const data = createPostSchema.parse(req.body);
  const post = await postService.createPost(req.user!.userId, data);
  return ApiResponse.created(res, post, "Post created successfully");
});

export const getFeed = asyncHandler(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const result = await postService.getFeed(page, limit);
  return ApiResponse.paginated(res, result.posts, result.total, page, limit);
});

export const getPost = asyncHandler(async (req: Request, res: Response) => {
  const post = await postService.getPost(String(req.params.postId));
  return ApiResponse.success(res, post);
});
