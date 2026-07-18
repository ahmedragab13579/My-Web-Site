import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import ProjectsIndex from "./pages/projects/ProjectsIndex";
import ProjectDetail from "./pages/projects/ProjectDetail";
import BlogIndex from "./pages/blog/BlogIndex";
import ArticleDetail from "./pages/blog/ArticleDetail";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminArticles from "./pages/admin/AdminArticles";
import AdminSkills from "./pages/admin/AdminSkills";
import AdminExperience from "./pages/admin/AdminExperience";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminProfile from "./pages/admin/AdminProfile";
import NotFoundPage from "./pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "projects",
        element: <ProjectsIndex />,
      },
      {
        path: "projects/:slug",
        element: <ProjectDetail />,
      },
      {
        path: "blog",
        element: <BlogIndex />,
      },
      {
        path: "blog/:slug",
        element: <ArticleDetail />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: "/portal-access-sec-2026",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "projects",
        element: <AdminProjects />,
      },
      {
        path: "articles",
        element: <AdminArticles />,
      },
      {
        path: "skills",
        element: <AdminSkills />,
      },
      {
        path: "experiences",
        element: <AdminExperience />,
      },
      {
        path: "messages",
        element: <AdminMessages />,
      },
      {
        path: "profile",
        element: <AdminProfile />,
      },
    ],
  },
]);
