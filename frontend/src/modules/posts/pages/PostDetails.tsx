// TODO (Member 2): Complete post details view with interactive comment section
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../components/common/Loader";
import Card from "../../../components/ui/Card";
import apiClient from "../../../services/api";

interface PostDetail {
  _id: string;
  title: string;
  description: string;
  category: string;
  author: { displayName: string; username: string };
}

export default function PostDetails() {
  const { postId } = useParams<{ postId: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ["post", postId],
    queryFn: async () => {
      const res = await apiClient.get<{ data: PostDetail }>(`/posts/${postId}`);
      return res.data;
    },
    enabled: Boolean(postId),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader size="lg" />
      </div>
    );
  }

  const post = data?.data;

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="p-8">
        <span className="text-xs font-semibold px-2.5 py-1 bg-violet-100 text-violet-700 rounded-full uppercase tracking-wider">
          {post?.category ?? "Artwork"}
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">{post?.title ?? "Post Details"}</h1>
        <p className="text-sm text-gray-500 mb-6">
          Created by <span className="font-semibold text-violet-600">{post?.author?.displayName}</span>
        </p>
        <p className="text-gray-700 leading-relaxed">{post?.description}</p>
      </Card>
    </div>
  );
}
