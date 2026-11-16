import mongoose, { Schema } from "mongoose";

export interface ISubmission {
  _id: mongoose.Types.ObjectId;
  challenge: mongoose.Types.ObjectId;
  submitter: mongoose.Types.ObjectId;
  title: string;
  description: string;
  mediaUrls: string[];
  votesCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const submissionSchema = new Schema<ISubmission>(
  {
    challenge: { type: Schema.Types.ObjectId, ref: "Challenge", required: true, index: true },
    submitter: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, maxlength: 120 },
    description: { type: String, default: "", maxlength: 1000 },
    mediaUrls: [{ type: String }],
    votesCount: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true, versionKey: false }
);

export const SubmissionModel = mongoose.model<ISubmission>("Submission", submissionSchema);
