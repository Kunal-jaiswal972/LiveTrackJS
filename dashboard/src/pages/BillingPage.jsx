import { motion } from "framer-motion";
import { ContentLayout } from "@/components/ContentLayout";

export default function BillingsPage() {
  return (
    <ContentLayout title="Billings">
      <motion.div
        className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        billings
      </motion.div>
    </ContentLayout>
  );
}
