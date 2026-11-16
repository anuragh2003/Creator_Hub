import { FollowModel } from "./follow.model.js";
import { LikeModel } from "./like.model.js";
import { CommentModel } from "./comment.model.js";
import { UserModel } from "../users/user.model.js";
import { PostModel } from "../posts/post.model.js";
import { ApiError } from "../../utils/ApiError.js";

export const socialService = {
  async followUser(followerId: string, targetUserId: string) {
    if (followerId === targetUserId) throw ApiError.badRequest("Cannot follow yourself");
    const follow = await FollowModel.create({ follower: followerId, following: targetUserId });
    await UserModel.findByIdAndUpdate(followerId, { $inc: { followingCount: 1 } });
    await UserModel.findByIdAndUpdate(targetUserId, { $inc: { followersCount: 1 } });
    return follow;
  },

  async unfollowUser(followerId: string, targetUserId: string) {
    const result = await FollowModel.findOneAndDelete({
      follower: followerId,
      following: targetUserId,
    });
    if (!result) throw ApiError.notFound("Follow relationship not found");
    await UserModel.findByIdAndUpdate(followerId, { $inc: { followingCount: -1 } });
    await UserModel.findByIdAndUpdate(targetUserId, { $inc: { followersCount: -1 } });
  },

  async toggleLike(userId: string, postId: string) {
    const existing = await LikeModel.findOne({ user: userId, post: postId });
    if (existing) {
      await existing.deleteOne();
      await PostModel.findByIdAndUpdate(postId, { $inc: { likesCount: -1 } });
      return { liked: false };
    }
    await LikeModel.create({ user: userId, post: postId });
    await PostModel.findByIdAndUpdate(postId, { $inc: { likesCount: 1 } });
    return { liked: true };
  },

  async addComment(userId: string, postId: string, content: string) {
    const comment = await CommentModel.create({ author: userId, post: postId, content });
    await PostModel.findByIdAndUpdate(postId, { $inc: { commentsCount: 1 } });
    return comment;
  },

  async getComments(postId: string, page = 1, limit = 20) {
    const [comments, total] = await Promise.all([
      CommentModel.find({ post: postId })
        .populate("author", "username displayName avatarUrl")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      CommentModel.countDocuments({ post: postId }),
    ]);
    return { comments, total, page, limit };
  },
};
