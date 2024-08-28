import { motion } from "framer-motion";

import { ContentLayout } from "@/components/ContentLayout";
import { DashBoardLineChart } from "@/components/charts/DashBoardLineChart";

export default function AnalyticsPage() {
  return (
    <ContentLayout title="Analytics">
      <motion.div
        className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        analytics
      </motion.div>
    </ContentLayout>
  );
}
