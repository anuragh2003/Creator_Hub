import { PostModel } from "./post.model.js";
import { ApiError } from "../../utils/ApiError.js";
import type { CreatePostInput } from "./post.validation.js";

export const postService = {
  async createPost(userId: string, data: CreatePostInput, mediaUrls: string[] = []) {
    return PostModel.create({ author: userId, ...data, mediaUrls });
  },

  async getFeed(page = 1, limit = 20) {
    const filter = { isPublished: true };
    const [posts, total] = await Promise.all([
      PostModel.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("author", "username displayName avatarUrl"),
      PostModel.countDocuments(filter),
    ]);
    return { posts, total, page, limit };
  },

  async getPost(postId: string) {
    const post = await PostModel.findById(postId).populate(
      "author",
      "username displayName avatarUrl"
    );
    if (!post) throw ApiError.notFound("Post not found");
    return post;
  },
};
