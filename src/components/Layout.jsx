import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStore } from "zustand";
import authStore from "../store/auth-store";

const Layout = () => {
  const user = useStore(authStore, (state) => state.userInfo);

  const handleLogout = () => {
    authStore.getState().logout();
    // No need for manual redirect - router will handle it
  };

  return (
    <div className="min-h-screen flex flex-col">
      <ToastContainer position="top-right" />

      {/* Navbar */}
      <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Notes App</h1>
          <div className="space-x-4">
            {user ? (
              <>
                <Link to="/notes" className="hover:underline">
                  My Notes
                </Link>
                <button onClick={handleLogout} className="hover:underline">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/" className="hover:underline">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 shadow-inner">
        <div className="container mx-auto text-center text-sm">
          &copy; {new Date().getFullYear()} Notes App. Built with 💙 by YourName
        </div>
      </footer>

      <ToastContainer />
    </div>
  );
};

export default Layout;
