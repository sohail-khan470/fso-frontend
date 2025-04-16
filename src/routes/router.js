import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
// import Dashboard from "../layouts/Dashboard";
// import StaticCategory from "../pages/StaticCategory";
// import StaticWallpaper from "../pages/StaticWallpaper";
// import LiveCategory from "../pages/LiveCategory";
// import LiveWallpaper from "../pages/LiveWallpaper";
// import EliteCategory from "../pages/EliteCategory";


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <PublicRoutes />,
//     children: [
//       {
//         path: "/",
//         element: <LoginPage />,
//       },
//     ],
//   },
//   {
//     path: "/dashboard",
//     element: <PrivateRoutes />,
//     children: [
//       {
//         path: "app", // Relative path
//         element: <DashboardPage />,
//       },
//       {
//         path: "static-categories", // Relative path
//         element: <StaticCategory />,
//       },
//       {
//         path: "static-wallpaper/:catName", // Relative path
//         element: <StaticWallpaper />,
//       },
//       {
//         path: "live-categories", // Relative path
//         element: <LiveCategory />,
//       },
 
//     ],
//   },
// ]);

import { Navigate } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import NotFound from './components/NotFound';

// Example authentication check function
const isAuthenticated = () => {
  // Implement your actual authentication logic here
  return localStorage.getItem('authToken') !== null;
};

// Route protection wrapper component
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const PublicRoute = ({ children }) => {
  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

// Main routes configuration
export const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/login',
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
];