import { create } from "zustand";
import axios from "axios";

const API_URL =
  (import.meta.env.MODE === "development"
    ? "http://localhost:3000"
    : import.meta.env.VITE_SERVER_URL) + "/api/v1";

axios.defaults.withCredentials = true;

export const useUserStore = create((set) => ({
  apiKey: undefined,
  error: null,
  isLoading: false,

  generateApiKey: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/user/generate-api-key`);
      set({
        apiKey: response.data.apiKey,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error generating API key",
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
