import { motion } from "framer-motion";
import { LoaderCircle } from "lucide-react";

export const LoaderWithMessage = ({ message }) => {
  return (
    <motion.div
      className="p-1 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="text-gray-500 font-medium flex gap-2 items-center justify-center p-4">
        <p>{message}</p>
        <LoaderCircle className="w-6 h-6 animate-spin" />
      </div>
    </motion.div>
  );
};
