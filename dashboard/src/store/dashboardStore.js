import { create } from "zustand";
import { axiosInstance } from "@/lib/axiosInstance";
import toast from "react-hot-toast";

export const useDashboardStore = create((set) => ({
  sites: [],
  activity: [],
  subscription: null,
  error: null,
  isLoading: false,

  getSites: async () => {
    set({ isLoading: true, error: null });
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
  getSubscriptions: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/user/plans");
      set({
        subscription: response.data.subscription,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error fetching subscriptions",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  // for now only, replace with good solution!!
  handleRefresh: async () => {
    try {
      const res = await axiosInstance.get(`/general/sync`);
      toast.success(res.data.message || "Synced data successfully");
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error syncing",
      });
    }
  },
}));
