import { Link, useNavigate } from "react-router-dom";
import { Palette, Bell, Search, LogOut, User } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem("accessToken"));
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between h-full px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
            <Palette size={16} className="text-white" />
          </div>
          <span className="text-lg font-bold text-gray-900">Creators Hub</span>
        </Link>

        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search creators, posts, challenges..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-100 rounded-full border border-transparent focus:outline-none focus:border-violet-400 focus:bg-white transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <button
                aria-label="Notifications"
                className="relative p-2 text-gray-500 hover:text-violet-600 hover:bg-violet-50 rounded-full transition-colors"
              >
                <Bell size={20} />
              </button>
              <Link
                to="/profile"
                aria-label="Profile"
                className="p-2 text-gray-500 hover:text-violet-600 hover:bg-violet-50 rounded-full transition-colors"
              >
                <User size={20} />
              </Link>
              <button
                onClick={handleLogout}
                aria-label="Logout"
                className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
              >
                <LogOut size={20} />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-violet-600 transition-colors">
                Sign in
              </Link>
              <Link
                to="/register"
                className="text-sm font-medium px-4 py-2 bg-violet-600 text-white rounded-full hover:bg-violet-700 transition-colors"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
