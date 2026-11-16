import mongoose, { Schema } from "mongoose";

export interface IChallenge {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  rules: string;
  category: string;
  coverImageUrl: string;
  startDate: Date;
  endDate: Date;
  prizes: string[];
  submissionsCount: number;
  status: "upcoming" | "active" | "voting" | "ended";
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const challengeSchema = new Schema<IChallenge>(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    description: { type: String, required: true, maxlength: 3000 },
    rules: { type: String, default: "", maxlength: 2000 },
    category: { type: String, default: "general" },
    coverImageUrl: { type: String, default: "" },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    prizes: [{ type: String }],
    submissionsCount: { type: Number, default: 0, min: 0 },
    status: {
      type: String,
      enum: ["upcoming", "active", "voting", "ended"],
      default: "upcoming",
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true, versionKey: false }
);

export const ChallengeModel = mongoose.model<IChallenge>("Challenge", challengeSchema);
