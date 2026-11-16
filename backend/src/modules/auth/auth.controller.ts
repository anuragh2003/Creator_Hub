import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { registerSchema, loginSchema } from "./auth.validation.js";
import { authService } from "./auth.service.js";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const data = registerSchema.parse(req.body);
  const result = await authService.register(data);
  return ApiResponse.created(res, result, "Registration successful");
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const data = loginSchema.parse(req.body);
  const result = await authService.login(data);
  return ApiResponse.success(res, result, "Login successful");
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  return ApiResponse.success(res, { user: req.user }, "Current user identity");
});

export const logout = asyncHandler(async (_req: Request, res: Response) => {
  res.clearCookie("accessToken");
  return ApiResponse.success(res, null, "Logged out successfully");
});
