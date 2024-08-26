import React, { useState } from "react";
import Input from "./Input";
import { Lock, Clipboard, ClipboardCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const ApiKeyInput = () => {
  const { user } = useAuthStore();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (user.apiKey) {
      navigator.clipboard.writeText(user.apiKey);
      setCopied(true);
      toast.success("Copied to clipboard!!")
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    }
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
    >
      <Input
        icon={Lock}
        type="password"
        placeholder="Your API Key"
        value={user?.apiKey}
        disabled
      />
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
        className="absolute inset-y-0 right-0 text-white flex items-center p-2 pr-2 rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none transition duration-200"
        type="button"
        onClick={handleCopy}
      >
        {copied ? (
          <ClipboardCheck className="text-emerald-500" />
        ) : (
          <Clipboard className="text-emerald-500" />
        )}
      </motion.button>
    </motion.div>
  );
};

export default ApiKeyInput;
