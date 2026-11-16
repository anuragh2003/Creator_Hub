import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import LandingPage from "../pages/LandingPage";
import Login from "../modules/auth/pages/Login";
import Register from "../modules/auth/pages/Register";
import HomeFeed from "../modules/posts/pages/HomeFeed";
import CreatePost from "../modules/posts/pages/CreatePost";
import PostDetails from "../modules/posts/pages/PostDetails";
import Explore from "../modules/discovery/pages/Explore";
import SearchResults from "../modules/discovery/pages/SearchResults";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<MainLayout />}>
          <Route path="/feed" element={<HomeFeed />} />
          <Route path="/posts/create" element={<CreatePost />} />
          <Route path="/posts/:postId" element={<PostDetails />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/search" element={<SearchResults />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
