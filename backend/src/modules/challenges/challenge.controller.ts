import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { challengeService } from "./challenge.service.js";

export const getChallenges = asyncHandler(async (req: Request, res: Response) => {
  const status = req.query.status as string | undefined;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const result = await challengeService.getChallenges(status, page, limit);
  return ApiResponse.paginated(res, result.challenges, result.total, page, limit);
});

export const getChallenge = asyncHandler(async (req: Request, res: Response) => {
  const challenge = await challengeService.getChallenge(String(req.params.challengeId));
  return ApiResponse.success(res, challenge);
});

export const submitEntry = asyncHandler(async (req: Request, res: Response) => {
  const submission = await challengeService.submitEntry(
    req.user!.userId,
    String(req.params.challengeId),
    req.body
  );
  return ApiResponse.created(res, submission, "Entry submitted successfully");
});

export const voteOnSubmission = asyncHandler(async (req: Request, res: Response) => {
  const result = await challengeService.voteOnSubmission(
    req.user!.userId,
    String(req.params.submissionId)
  );
  return ApiResponse.success(res, result);
});
