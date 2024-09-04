import { create } from "zustand";
import { axiosInstance } from "@/lib/axiosInstance";

export const useCheckoutStore = create((set) => ({
  isLoading: false,
  error: null,

  createCheckoutSession: async (planType) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post(
        "/payments/create-checkout-session",
        {
          planType,
        }
      );

      if (response.status === 200) {
        window.location.href = response.data.url;
      } else {
        console.error("Error creating checkout session:", response.data.error);
        set({ error: response.data.error });
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      set({ error: "Unexpected error occurred" });
    } finally {
      set({ isLoading: false });
    }
  },
}));
