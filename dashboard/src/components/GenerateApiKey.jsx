import React, { useState } from "react";
import Input from "./Input";
import { Lock, Clipboard, ClipboardCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";

const GenerateApiKey = () => {
  const { user } = useAuthStore();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (user.apiKey) {
      navigator.clipboard.writeText(user.apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    }
  };

  return (
    <motion.div className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700">
      <p className="text-xl font-semibold text-green-400 mb-3">Your API Key</p>
      <motion.div className="relative">
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
    </motion.div>
  );
};

export default GenerateApiKey;
