import { useQuery } from "@tanstack/react-query";
import Loader from "../../../components/common/Loader";
import Card from "../../../components/ui/Card";
import apiClient from "../../../services/api";

interface PostItem {
  _id: string;
  title: string;
  description: string;
  author: { username: string; displayName: string; avatarUrl?: string };
  likesCount: number;
  commentsCount: number;
  createdAt: string;
}

export default function HomeFeed() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["feed"],
    queryFn: async () => {
      const res = await apiClient.get<{ data: PostItem[] }>("/posts/feed");
      return res.data;
    },
    retry: 1,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader size="lg" />
      </div>
    );
  }

  const posts = data?.data ?? [];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Home Feed</h1>
      </div>

      {error ? (
        <Card className="p-8 text-center text-gray-500">
          <p>Failed to load feed. Connect the backend and MongoDB database to see live posts.</p>
        </Card>
      ) : posts.length === 0 ? (
        <Card className="p-12 text-center text-gray-500">
          <p className="text-base font-medium text-gray-700">No posts in your feed yet</p>
          <p className="text-sm text-gray-500 mt-1">
            Follow creators or share your first creative project to get started!
          </p>
        </Card>
      ) : (
        posts.map((post) => (
          <Card key={post._id} className="p-6">
            <p className="text-xs font-semibold text-violet-600 uppercase tracking-wider mb-1">
              {post.author?.displayName} (@{post.author?.username})
            </p>
            <h2 className="text-lg font-bold text-gray-900 mb-2">{post.title}</h2>
            {post.description && <p className="text-gray-600 text-sm">{post.description}</p>}
          </Card>
        ))
      )}
    </div>
  );
}
