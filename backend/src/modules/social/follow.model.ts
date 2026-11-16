import mongoose, { Schema } from "mongoose";

export interface IFollow {
  follower: mongoose.Types.ObjectId;
  following: mongoose.Types.ObjectId;
  createdAt: Date;
}

const followSchema = new Schema<IFollow>(
  {
    follower: { type: Schema.Types.ObjectId, ref: "User", required: true },
    following: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false }, versionKey: false }
);

followSchema.index({ follower: 1, following: 1 }, { unique: true });

export const FollowModel = mongoose.model<IFollow>("Follow", followSchema);
