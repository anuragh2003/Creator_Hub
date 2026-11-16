import mongoose, { Schema } from "mongoose";

export interface IUser {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  passwordHash: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  portfolioUrl: string;
  skills: string[];
  socialLinks: {
    website?: string;
    twitter?: string;
    instagram?: string;
    behance?: string;
    dribbble?: string;
  };
  followersCount: number;
  followingCount: number;
  isVerified: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
      match: /^[a-zA-Z0-9_]+$/,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: true, select: false },
    displayName: { type: String, required: true, trim: true, maxlength: 60 },
    bio: { type: String, default: "", maxlength: 500 },
    avatarUrl: { type: String, default: "" },
    portfolioUrl: { type: String, default: "" },
    skills: [{ type: String, trim: true }],
    socialLinks: {
      website: String,
      twitter: String,
      instagram: String,
      behance: String,
      dribbble: String,
    },
    followersCount: { type: Number, default: 0, min: 0 },
    followingCount: { type: Number, default: 0, min: 0 },
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

userSchema.index({ username: 1 });
userSchema.index({ email: 1 });

export const UserModel = mongoose.model<IUser>("User", userSchema);
