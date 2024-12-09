import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const LoadingSpinner = () => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(true);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden gap-5">
      <motion.div
        className="w-16 h-16 border-4 border-t-4 border-t-green-500 border-green-200 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      {showAlert && (
        <motion.div
          className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 absolute bottom-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Please wait a little longer</AlertTitle>
            <AlertDescription>
              Server is hosted on free render plan which may take some time for
              first time loading!!
            </AlertDescription>
          </Alert>
        </motion.div>
      )}
    </div>
  );
};

export default LoadingSpinner;
