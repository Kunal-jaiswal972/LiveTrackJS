import { useEffect } from "react";
import { motion } from "framer-motion";

import { plans } from "@/constants/constants";
import { useDashboardStore } from "@/store/dashboardStore";
import { useCheckoutStore } from "@/store/paymentStore";

import { PricingCard } from "@/components/billings/PricingCards";
import { LoaderWithMessage } from "@/components/loaders/LoaderWithMessage";
import { CalloutCard } from "@/components/shared/CalloutCard";

export const PricingCardContainer = () => {
  const { getSubscriptions, subscription } = useDashboardStore();
  const { error, isLoading } = useCheckoutStore();

  useEffect(() => {
    getSubscriptions();
  }, [getSubscriptions]);

  return (
    <>
      {isLoading && <LoaderWithMessage message="Processing..." />}
      {error && <CalloutCard variant="destructive" text={error} />}

      {!isLoading && (
        <motion.section
          className="container mx-auto p-2 md:p-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-center justify-center bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.3,
              },
            },
          }}
        >
          {plans.map((plan, index) => (
            <PricingCard
              key={index}
              title={plan.title}
              price={plan.price}
              features={plan.features}
              type={plan.type}
              active={subscription?.plan || "free"}
            />
          ))}
        </motion.section>
      )}
    </>
  );
};
