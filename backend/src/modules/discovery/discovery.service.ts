import { UserModel } from "../users/user.model.js";
import { PostModel } from "../posts/post.model.js";

export const discoveryService = {
  async searchCreators(query: string, page = 1, limit = 20) {
    const filter = query
      ? {
          $or: [
            { username: { $regex: query, $options: "i" } },
            { displayName: { $regex: query, $options: "i" } },
            { bio: { $regex: query, $options: "i" } },
          ],
          isActive: true,
        }
      : { isActive: true };

    const [users, total] = await Promise.all([
      UserModel.find(filter).select("-passwordHash").skip((page - 1) * limit).limit(limit),
      UserModel.countDocuments(filter),
    ]);
    return { users, total, page, limit };
  },

  async searchPosts(query: string, page = 1, limit = 20) {
    const filter = query
      ? {
          $or: [
            { title: { $regex: query, $options: "i" } },
            { tags: { $regex: query, $options: "i" } },
          ],
          isPublished: true,
        }
      : { isPublished: true };

    const [posts, total] = await Promise.all([
      PostModel.find(filter)
        .populate("author", "username displayName avatarUrl")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      PostModel.countDocuments(filter),
    ]);
    return { posts, total, page, limit };
  },

  async getExplore(page = 1, limit = 20) {
    const filter = { isPublished: true };
    const [posts, total] = await Promise.all([
      PostModel.find(filter)
        .sort({ likesCount: -1, createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("author", "username displayName avatarUrl"),
      PostModel.countDocuments(filter),
    ]);
    return { posts, total, page, limit };
  },
};
