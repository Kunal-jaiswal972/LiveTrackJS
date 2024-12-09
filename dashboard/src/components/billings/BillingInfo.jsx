import { motion } from "framer-motion";
import { formatDate } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

import { useDashboardStore } from "@/store/dashboardStore";
import { useCheckoutStore } from "@/store/paymentStore";

import { LoaderWithMessage } from "@/components/loaders/LoaderWithMessage";
import { CalloutCard } from "@/components/shared/CalloutCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const BillingInfo = () => {
  const { subscription, isLoading, error } = useDashboardStore();
  const { createBillingPortalSession, isLoading: billingSessionLoading } =
    useCheckoutStore();

  if (isLoading)
    return <LoaderWithMessage message="Loading billing information..." />;
  if (error) return <CalloutCard variant="destructive" text={error} />;

  return (
    <motion.div
      className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 space-y-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-green-400">
          Billing Information
        </h3>
        <Button
          size="sm"
          variant="signature"
          onClick={() => createBillingPortalSession()}
        >
          {billingSessionLoading ? (
            <LoaderCircle className="w-6 h-6 animate-spin mx-auto" />
          ) : (
            "Billing Portal"
          )}
        </Button>
      </div>
      {subscription !== null ? (
        <>
          <div className="text-gray-300">
            <span className="font-bold">Start Date: </span>
            {formatDate(subscription.startDate)}
          </div>
          <div className="text-gray-300">
            <span className="font-bold">End Date: </span>
            {formatDate(subscription.endDate)}
          </div>
          <div className="text-gray-300 space-x-2">
            <span className="font-bold">Plan: </span>
            <Badge variant="premium">{subscription.plan}</Badge>
          </div>
        </>
      ) : (
        <div className="space-y-3">
          <CalloutCard variant="success" text="No Currently Active Plan" />
          <div className="text-gray-300 space-x-2">
            <span className="font-bold">Plan: </span>
            <Badge>Free</Badge>
          </div>
        </div>
      )}
    </motion.div>
  );
};
