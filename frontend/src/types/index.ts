export interface User {
  _id: string;
  username: string;
  email: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  followersCount: number;
  followingCount: number;
  skills: string[];
}

export interface Post {
  _id: string;
  author: Pick<User, "_id" | "username" | "displayName" | "avatarUrl">;
  title: string;
  description: string;
  mediaUrls: string[];
  category: string;
  tags: string[];
  likesCount: number;
  commentsCount: number;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
