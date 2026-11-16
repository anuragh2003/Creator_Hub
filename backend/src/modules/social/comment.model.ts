import mongoose, { Schema } from "mongoose";

export interface IComment {
  _id: mongoose.Types.ObjectId;
  author: mongoose.Types.ObjectId;
  post: mongoose.Types.ObjectId;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<IComment>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true, index: true },
    content: { type: String, required: true, maxlength: 1000 },
  },
  { timestamps: true, versionKey: false }
);

export const CommentModel = mongoose.model<IComment>("Comment", commentSchema);
