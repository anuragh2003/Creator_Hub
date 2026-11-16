import { UserModel } from "./user.model.js";
import { ApiError } from "../../utils/ApiError.js";

export const userService = {
  async getProfile(username: string) {
    const user = await UserModel.findOne({ username, isActive: true }).select(
      "-passwordHash"
    );
    if (!user) throw ApiError.notFound("User not found");
    return user;
  },

  async updateProfile(
    userId: string,
    data: Partial<{
      displayName: string;
      bio: string;
      portfolioUrl: string;
      skills: string[];
      socialLinks: Record<string, string>;
    }>
  ) {
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { $set: data },
      { new: true, runValidators: true }
    ).select("-passwordHash");
    if (!user) throw ApiError.notFound("User not found");
    return user;
  },
};
