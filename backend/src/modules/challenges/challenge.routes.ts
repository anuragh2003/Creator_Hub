import { Router } from "express";
import { getChallenges, getChallenge, submitEntry, voteOnSubmission } from "./challenge.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getChallenges);
router.get("/:challengeId", getChallenge);
router.post("/:challengeId/submit", authenticate, submitEntry);
router.post("/submissions/:submissionId/vote", authenticate, voteOnSubmission);

export default router;
