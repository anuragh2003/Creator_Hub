// TODO (Member 3): Implement explore grid, trending tags, and category filtering
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../components/common/Loader";
import Card from "../../../components/ui/Card";
import apiClient from "../../../services/api";

interface ExploreItem {
  _id: string;
  title: string;
  author: { displayName: string };
}

export default function Explore() {
  const { data, isLoading } = useQuery({
    queryKey: ["explore"],
    queryFn: async () => {
      const res = await apiClient.get<{ data: ExploreItem[] }>("/discovery/explore");
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

  const items = data?.data ?? [];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Explore Creators & Projects</h1>
      {items.length === 0 ? (
        <Card className="p-12 text-center text-gray-500">
          <p className="font-medium text-gray-700">No projects to explore yet</p>
          <p className="text-sm mt-1">Be the first to share your work with the world!</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Card key={item._id} className="p-5">
              <div className="aspect-video bg-gradient-to-br from-violet-100 to-indigo-100 rounded-xl mb-4" />
              <h3 className="font-bold text-gray-900">{item.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{item.author?.displayName}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
