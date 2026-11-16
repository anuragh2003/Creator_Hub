import { useSearchParams } from "react-router-dom";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Search results for <span className="text-violet-600">&quot;{query}&quot;</span>
      </h1>
      <p className="text-gray-500">
        Search and discovery features are being developed by Member 3.
      </p>
    </div>
  );
}
