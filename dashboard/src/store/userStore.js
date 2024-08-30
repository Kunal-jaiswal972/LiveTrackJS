import { create } from "zustand";
import { axiosInstance } from "@/lib/axiosInstance";

export const useUserStore = create((set) => ({
  sites: [],
  activity: [],
  error: null,
  isLoading: false,

  getSites: async () => {
    set({ isLoading: true, error: null });
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    try {
      const response = await axiosInstance.get("/user/sites");
      set({
        sites: response.data.sites,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error fetching sites",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  getActivity: async (siteId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(
        `/user/sites/${siteId}/activities`
      );
      set({
        activity: response.data.activities,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error fetching activities",
      });
    } finally {
      set({ isLoading: false });
    }
  },
  // for now only repalce with good solution!!
  handleRefresh: async () => {
    try {
      await axiosInstance.get(`/general/sync`);
      console.log("Synced data!!");
      window.location.reload();
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error syncing",
      });
    }
  },
}));
