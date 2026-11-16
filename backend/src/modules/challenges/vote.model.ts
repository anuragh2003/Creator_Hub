import mongoose, { Schema } from "mongoose";

export interface IVote {
  user: mongoose.Types.ObjectId;
  submission: mongoose.Types.ObjectId;
  createdAt: Date;
}

const voteSchema = new Schema<IVote>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    submission: { type: Schema.Types.ObjectId, ref: "Submission", required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false }, versionKey: false }
);

voteSchema.index({ user: 1, submission: 1 }, { unique: true });

export const VoteModel = mongoose.model<IVote>("Vote", voteSchema);
