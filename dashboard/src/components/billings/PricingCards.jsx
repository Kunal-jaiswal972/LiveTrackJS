import { useState } from "react";
import { Check, LoaderCircle } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { useCheckoutStore } from "@/store/paymentStore";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

// !TODO: fix this component with better logic!

export const PricingCard = ({ title, price, features, type, active }) => {
  const { createCheckoutSession, createBillingPortalSession } =
    useCheckoutStore();
  const [loading, setLoading] = useState(false);

  const isActive = active?.toLowerCase() === type.toLowerCase();
  const isFree = type.toLowerCase() === "free";
  const isPro =
    active.toLowerCase() === "premium" || active.toLowerCase() === "standard";

  const handleCheckout = async () => {
    if (isFree) return;
    setLoading(true);
    try {
      if (isPro) {
        await createBillingPortalSession();
      } else {
        await createCheckoutSession(type);
      }
    } catch (e) {
      console.error("Error during checkout or billing portal session:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
      }}
      className="flex justify-center items-center"
    >
      <Card className="bg-muted shadow-lg rounded-lg overflow-hidden w-[300px] sm:w-full">
        <CardHeader className="bg-muted text-green-400 py-4 px-6">
          <h2 className="text-xl font-bold">{title}</h2>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-baseline space-x-2">
            <span className="text-4xl text-green-400 font-bold">${price}</span>
            <span className="text-muted-foreground">/month</span>
          </div>

          <ul className="space-y-2 text-muted-foreground text-sm">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-400" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "w-full p-2 font-bold rounded-lg shadow-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900",
              isActive
                ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 focus:ring-green-500"
                : "border-2 border-green-500 text-green-500 bg-transparent hover:bg-green-500 hover:text-white focus:ring-green-500"
            )}
            type="button"
            disabled={loading || isFree}
            onClick={handleCheckout}
          >
            {loading ? (
              <LoaderCircle className="w-6 h-6 animate-spin mx-auto" />
            ) : isFree ? (
              "Default"
            ) : isActive ? (
              "Active"
            ) : (
              "Get Started"
            )}
          </motion.button>
        </CardContent>
      </Card>
    </motion.div>
  );
};
