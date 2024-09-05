import { useState } from "react";
import { Check, LoaderCircle } from "lucide-react";
import { motion } from "framer-motion";

import { useCheckoutStore } from "@/store/paymentStore";

import { Card, CardHeader, CardContent } from "@/components/ui/card";

export const BillingCard = ({ title, price, features, type, active }) => {
  const { createCheckoutSession, error, isLoading } = useCheckoutStore();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      await createCheckoutSession(type);
    } catch (e) {
      console.error("error during checkout:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-muted shadow-lg rounded-lg overflow-hidden w-[300px]">
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
          className="w-full p-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900   transition duration-200"
          type="button"
          disabled={loading || isLoading}
          onClick={handleCheckout}
        >
          {loading ? (
            <LoaderCircle className="w-6 h-6 animate-spin mx-auto" />
          ) : active === type ? (
            "Active"
          ) : (
            "Get Started"
          )}
        </motion.button>
      </CardContent>
    </Card>
  );
};
