import { Link } from "react-router-dom";
import { Palette, Users, Zap, Trophy, MessageCircle, ArrowRight, Star } from "lucide-react";

const features = [
  { icon: Palette, title: "Showcase Your Work", description: "Build a stunning portfolio and share your creative work with creators worldwide." },
  { icon: Users, title: "Discover Creators", description: "Connect with talented artists, designers, illustrators, and photographers." },
  { icon: Zap, title: "Collaborate", description: "Create and join innovative multi-disciplinary creative projects." },
  { icon: Trophy, title: "Challenges & Contests", description: "Sharpen your skills in community challenges and earn peer recognition." },
  { icon: MessageCircle, title: "Real-time Chat", description: "Communicate directly with creators through high-speed real-time messaging." },
  { icon: Star, title: "Get Discovered", description: "Gain visibility and find potential partners for future creative opportunities." },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
            <Palette size={16} className="text-white" />
          </div>
          <span className="text-lg font-bold text-gray-900">Creators Hub</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-violet-600 transition-colors">
            Sign in
          </Link>
          <Link
            to="/register"
            className="text-sm font-medium px-4 py-2 bg-violet-600 text-white rounded-full hover:bg-violet-700 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 via-white to-indigo-50/40 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 rounded-full text-violet-700 text-sm font-medium mb-8">
            <Star size={14} />
            The collaborative creative platform
          </div>

          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Where Creators{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Collaborate & Thrive
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Showcase your portfolio, discover other creative minds, collaborate on ambitious projects, and compete in community challenges.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-violet-600 text-white font-semibold rounded-xl hover:bg-violet-700 transition-colors shadow-sm"
            >
              Start Creating <ArrowRight size={18} />
            </Link>
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
            >
              Explore Feed
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="flex flex-wrap items-center justify-center gap-12 mt-16 pt-8 border-t border-gray-100">
            {[
              { value: "10K+", label: "Creators" },
              { value: "50K+", label: "Portfolios" },
              { value: "200+", label: "Collaborations" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-extrabold text-violet-600">{stat.value}</div>
                <div className="text-sm font-medium text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 px-6 bg-gray-50/70 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Crafted for every creative discipline</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From visual design to sound and illustration, explore tools made specifically for modern creators.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-violet-300 hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-violet-600 transition-colors">
                  <feature.icon size={24} className="text-violet-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 px-6 border-t border-gray-200 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Creators Hub. All rights reserved.</p>
      </footer>
    </div>
  );
}
