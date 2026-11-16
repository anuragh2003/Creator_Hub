import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { collaborationService } from "./collaboration.service.js";

export const createProject = asyncHandler(async (req: Request, res: Response) => {
  const project = await collaborationService.createProject(req.user!.userId, req.body);
  return ApiResponse.created(res, project, "Project created successfully");
});

export const getProjects = asyncHandler(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const result = await collaborationService.getProjects(page, limit);
  return ApiResponse.paginated(res, result.projects, result.total, page, limit);
});

export const getProject = asyncHandler(async (req: Request, res: Response) => {
  const project = await collaborationService.getProject(String(req.params.projectId));
  return ApiResponse.success(res, project);
});
