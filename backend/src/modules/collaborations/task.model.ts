import mongoose, { Schema } from "mongoose";

export interface ITask {
  _id: mongoose.Types.ObjectId;
  project: mongoose.Types.ObjectId;
  title: string;
  description: string;
  assignee?: mongoose.Types.ObjectId;
  status: "todo" | "in_progress" | "done";
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<ITask>(
  {
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true, index: true },
    title: { type: String, required: true, maxlength: 120 },
    description: { type: String, default: "" },
    assignee: { type: Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["todo", "in_progress", "done"], default: "todo" },
    dueDate: Date,
  },
  { timestamps: true, versionKey: false }
);

export const TaskModel = mongoose.model<ITask>("Task", taskSchema);
