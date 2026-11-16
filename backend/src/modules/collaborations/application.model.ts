import mongoose, { Schema } from "mongoose";

export interface IApplication {
  _id: mongoose.Types.ObjectId;
  project: mongoose.Types.ObjectId;
  applicant: mongoose.Types.ObjectId;
  message: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}

const applicationSchema = new Schema<IApplication>(
  {
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true, index: true },
    applicant: { type: Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, maxlength: 500, default: "" },
    status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
  },
  { timestamps: true, versionKey: false }
);

export const ApplicationModel = mongoose.model<IApplication>("Application", applicationSchema);
