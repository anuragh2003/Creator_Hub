import { NavLink } from "react-router-dom";
import { Home, Compass, PlusSquare, Users, MessageCircle, Trophy, Briefcase } from "lucide-react";

const navItems = [
  { to: "/feed", icon: Home, label: "Home Feed" },
  { to: "/explore", icon: Compass, label: "Explore" },
  { to: "/posts/create", icon: PlusSquare, label: "Create Post" },
  { to: "/social", icon: Users, label: "Community" },
  { to: "/collaborations", icon: Briefcase, label: "Collaborations" },
  { to: "/messages", icon: MessageCircle, label: "Messages" },
  { to: "/challenges", icon: Trophy, label: "Challenges" },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <nav className="p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? "bg-violet-50 text-violet-600"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`
            }
          >
            <item.icon size={20} />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
