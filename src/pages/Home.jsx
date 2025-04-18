import { useStore } from "zustand";
import authStore from "../store/auth-store";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    authStore.getState().logout();
    // No need for manual redirect - router will handle it
  };

  const handleNavigate = () => {
    navigate("/notes");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="text-center p-10 bg-white rounded-2xl shadow-xl max-w-xl">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">
          Welcome Home! 🏠
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          You’re logged in. This is your homepage. Go ahead and explore your
          dashboard or start building something awesome!
        </p>
        <div className="flex justify-center gap-4">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
            Notes
          </button>
          <button
            onClick={handleLogout}
            className="px-6 py-2 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-100"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
