import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { userService } from "./user.service.js";

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.getProfile(String(req.params.username));
  return ApiResponse.success(res, user, "User profile retrieved");
});

export const updateProfile = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.updateProfile(req.user!.userId, req.body);
  return ApiResponse.success(res, user, "Profile updated successfully");
});
