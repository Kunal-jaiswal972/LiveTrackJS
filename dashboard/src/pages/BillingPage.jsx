import { motion } from "framer-motion";
import { plans } from "@/constants/constants";

import { ContentLayout } from "@/components/ContentLayout";
import { BillingCard } from "@/components/cards/BillingCards";

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
  return (
    <ContentLayout title="Billings">
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
            />
          </motion.div>
        ))}
      </motion.section>
    </ContentLayout>
  );
};

export default BillingsPage;
