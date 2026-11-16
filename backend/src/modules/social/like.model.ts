import mongoose, { Schema } from "mongoose";

export interface ILike {
  user: mongoose.Types.ObjectId;
  post: mongoose.Types.ObjectId;
  createdAt: Date;
}

const likeSchema = new Schema<ILike>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false }, versionKey: false }
);

likeSchema.index({ user: 1, post: 1 }, { unique: true });

export const LikeModel = mongoose.model<ILike>("Like", likeSchema);
