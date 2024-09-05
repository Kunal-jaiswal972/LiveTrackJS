import { useEffect } from "react";
import { motion } from "framer-motion";
import { plans } from "@/constants/constants";

import { useDashboardStore } from "@/store/dashboardStore";

import { ContentLayout } from "@/components/ContentLayout";
import { BillingCard } from "@/components/cards/BillingCards";
import { formatDate } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const BillingsPage = () => {
  const { getSubscriptions, subscription, isLoading, error } =
    useDashboardStore();

  useEffect(() => {
    getSubscriptions();
  }, []);

  if (isLoading) return "loadin...";

  return (
    <ContentLayout title="Billings">
      <motion.div
        className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 space-y-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-xl font-semibold text-green-400 mb-3">
          Billing Information
        </h3>
        {subscription !== null ? (
          <>
            <p className="text-gray-300">
              <span className="font-bold">Start Date: </span>
              {formatDate(subscription.startDate)}
            </p>
            <p className="text-gray-300">
              <span className="font-bold">End Date: </span>
              {formatDate(subscription.endDate)}
            </p>
            <p className="text-gray-300">
              <span className="font-bold">Plan: </span>
              {subscription.plan}
            </p>
          </>
        ) : (
          <>
            <p className="text-gray-300">
              <span className="font-bold">Plan: </span>
              {subscription.plan}
            </p>
            <p className="text-gray-300">No Currently Active Plan</p>
          </>
        )}
      </motion.div>

      <motion.section
        className="container mx-auto p-2 md:p-4 grid grid-cols-1 md:grid-cols-3 gap-2 items-center justify-center bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
        initial="hidden"
        animate="show"
        variants={containerVariants}
      >
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="flex justify-center items-center"
          >
            <BillingCard
              title={plan.title}
              price={plan.price}
              features={plan.features}
              type={plan.type}
              active={subscription?.plan}
            />
          </motion.div>
        ))}
      </motion.section>
    </ContentLayout>
  );
};

export default BillingsPage;
