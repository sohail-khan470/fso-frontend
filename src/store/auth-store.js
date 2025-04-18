import { create } from "zustand";
import Cookies from "js-cookie";
import userService from "../api/user-service";

// Helper function to safely get and parse user info
const getInitialUserInfo = () => {
  try {
    const userInfo = Cookies.get("userInfo");
    return userInfo ? JSON.parse(userInfo) : null;
  } catch (error) {
    console.error("Failed to parse userInfo:", error);
    Cookies.remove("userInfo"); // Clear invalid data
    return null;
  }
};

const authStore = create((set, get) => ({
  userInfo: getInitialUserInfo(),
  isLoading: false,
  error: null,

  login: async (username, password) => {
    try {
      set({ isLoading: true, error: null });

      const data = await userService.login({ username, password });

      // Validate response data structure
      if (!data || !data.token) {
        throw new Error("Invalid response from server");
      }

      Cookies.set("userInfo", JSON.stringify(data), {
        expires: 7, // Expires in 7 days
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      set({ userInfo: data, isLoading: false });
      return true; // Indicate success
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Login failed";

      set({
        error: errorMessage,
        isLoading: false,
      });
      return false; // Indicate failure
    }
  },

  register: async (username, name, password) => {
    try {
      set({ isLoading: true, error: null });

      const data = await userService.register({ username, name, password });

      if (!data || !data.token) {
        throw new Error("Invalid registration response");
      }

      Cookies.set("userInfo", JSON.stringify(data), {
        expires: 7,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      set({ userInfo: data, isLoading: false });
      return true;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Registration failed";

      set({
        error: errorMessage,
        isLoading: false,
      });
      return false;
    }
  },

  logout: () => {
    Cookies.remove("userInfo", {
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });
    set({ userInfo: null });
  },

  clearError: () => set({ error: null }),

  // Optional: Add token refresh functionality
}));

export default authStore;
