import { create } from "zustand";
import { axiosInstance } from "@/lib/axiosInstance";
import toast from "react-hot-toast";

export const useCheckoutStore = create((set) => ({
  isLoading: false,
  error: null,

  createCheckoutSession: async (plan) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post(
        "/payments/create-checkout-session",
        {
          plan,
        }
      );

      if (response.status === 200) {
        toast.loading("Redirecting to checkout session...")
        window.location.href = response.data.url;
      } else {
        throw new Error("No checkout session URL received");
      }
    } catch (error) {
      set({
        error: error.response?.message || "Error creating checkout session!!",
      });
    } finally {
      set({ isLoading: false });
    }
  },
  
  createBillingPortalSession: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post(
        "/payments/create-billing-portal-session"
      );
      
      if (response.status === 200) {
        toast.loading("Redirecting to billing portal...")
        window.location.href = response.data.url;
      } else {
        throw new Error("No billing session URL received");
      }
    } catch (error) {
      set({
        error: error.response?.message || "Error creating billing session!!",
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
