import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import NoteForm from "../components/NoteForm";
import Layout from "../components/Layout";
import NotFound from "../pages/NotFound";
import { useStore } from "zustand";
import authStore from "../store/auth-store";
import NotesList from "../pages/NotesList";
import NoteDetails from "../pages/NotesDetails";
import Home from "../pages/Home";

function PublicRoutes() {
  const token = useStore(authStore, (state) => state.userInfo?.token);
  return token ? <Navigate to="/notes" replace /> : <Outlet />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Layout wraps everything
    children: [
      // Public routes
      {
        index: true,
        element: <LoginPage />,
      },

      // Protected routes
      {
        element: <PrivateRoutes />,
        children: [
          {
            element: <Outlet />,
            children: [
              {
                path: "/home",
                element: <Home />,
              },
              {
                path: "/notes",
                children: [
                  {
                    index: true,
                    element: <NotesList />,
                  },
                  {
                    path: ":noteId",
                    element: <NoteDetails />,
                  },
                  {
                    path: "new",
                    element: <NoteForm />,
                  },
                  {
                    path: "edit/:noteId",
                    element: <NoteForm />,
                  },
                ],
              },
            ],
          },
        ],
      },

      // 404 catch-all
      { path: "*", element: <NotFound /> },
    ],
  },
]);

// Updated PrivateRoutes component
function PrivateRoutes() {
  const token = useStore(authStore, (state) => state.userInfo?.token);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default router;
