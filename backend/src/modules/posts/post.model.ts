import mongoose, { Schema } from "mongoose";

export type PostCategory =
  | "illustration"
  | "photography"
  | "design"
  | "animation"
  | "music"
  | "writing"
  | "other";

export interface IPost {
  _id: mongoose.Types.ObjectId;
  author: mongoose.Types.ObjectId;
  title: string;
  description: string;
  mediaUrls: string[];
  category: PostCategory;
  tags: string[];
  likesCount: number;
  commentsCount: number;
  viewsCount: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema<IPost>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, required: true, trim: true, maxlength: 120 },
    description: { type: String, default: "", maxlength: 2000 },
    mediaUrls: [{ type: String }],
    category: {
      type: String,
      enum: ["illustration", "photography", "design", "animation", "music", "writing", "other"],
      default: "other",
    },
    tags: [{ type: String, lowercase: true, trim: true }],
    likesCount: { type: Number, default: 0, min: 0 },
    commentsCount: { type: Number, default: 0, min: 0 },
    viewsCount: { type: Number, default: 0, min: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

postSchema.index({ author: 1, createdAt: -1 });
postSchema.index({ tags: 1 });
postSchema.index({ category: 1 });

export const PostModel = mongoose.model<IPost>("Post", postSchema);
