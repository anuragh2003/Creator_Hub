import mongoose, { Schema } from "mongoose";

export interface IProject {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  owner: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
  tags: string[];
  status: "open" | "in_progress" | "completed" | "archived";
  coverImageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    description: { type: String, default: "", maxlength: 2000 },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    tags: [{ type: String, lowercase: true, trim: true }],
    status: {
      type: String,
      enum: ["open", "in_progress", "completed", "archived"],
      default: "open",
    },
    coverImageUrl: { type: String, default: "" },
  },
  { timestamps: true, versionKey: false }
);

export const ProjectModel = mongoose.model<IProject>("Project", projectSchema);
