import { ChallengeModel } from "./challenge.model.js";
import { SubmissionModel } from "./submission.model.js";
import { VoteModel } from "./vote.model.js";
import { ApiError } from "../../utils/ApiError.js";

export const challengeService = {
  async getChallenges(status?: string, page = 1, limit = 20) {
    const filter = status ? { status } : {};
    const [challenges, total] = await Promise.all([
      ChallengeModel.find(filter).sort({ startDate: -1 }).skip((page - 1) * limit).limit(limit),
      ChallengeModel.countDocuments(filter),
    ]);
    return { challenges, total, page, limit };
  },

  async getChallenge(challengeId: string) {
    const challenge = await ChallengeModel.findById(challengeId).populate(
      "createdBy",
      "username displayName avatarUrl"
    );
    if (!challenge) throw ApiError.notFound("Challenge not found");
    return challenge;
  },

  async submitEntry(
    userId: string,
    challengeId: string,
    data: { title: string; description?: string },
    mediaUrls: string[] = []
  ) {
    const challenge = await ChallengeModel.findById(challengeId);
    if (!challenge || challenge.status !== "active") {
      throw ApiError.badRequest("Challenge is not accepting submissions");
    }
    const submission = await SubmissionModel.create({
      challenge: challengeId,
      submitter: userId,
      ...data,
      mediaUrls,
    });
    await ChallengeModel.findByIdAndUpdate(challengeId, { $inc: { submissionsCount: 1 } });
    return submission;
  },

  async voteOnSubmission(userId: string, submissionId: string) {
    const existing = await VoteModel.findOne({ user: userId, submission: submissionId });
    if (existing) {
      await existing.deleteOne();
      await SubmissionModel.findByIdAndUpdate(submissionId, { $inc: { votesCount: -1 } });
      return { voted: false };
    }
    await VoteModel.create({ user: userId, submission: submissionId });
    await SubmissionModel.findByIdAndUpdate(submissionId, { $inc: { votesCount: 1 } });
    return { voted: true };
  },
};
