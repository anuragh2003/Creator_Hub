import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { discoveryService } from "./discovery.service.js";

export const searchCreators = asyncHandler(async (req: Request, res: Response) => {
  const query = String(req.query.q ?? "");
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const result = await discoveryService.searchCreators(query, page, limit);
  return ApiResponse.paginated(res, result.users, result.total, page, limit);
});

export const searchPosts = asyncHandler(async (req: Request, res: Response) => {
  const query = String(req.query.q ?? "");
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const result = await discoveryService.searchPosts(query, page, limit);
  return ApiResponse.paginated(res, result.posts, result.total, page, limit);
});

export const getExplore = asyncHandler(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const result = await discoveryService.getExplore(page, limit);
  return ApiResponse.paginated(res, result.posts, result.total, page, limit);
});
