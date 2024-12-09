import { motion } from "framer-motion";
import { ContentLayout } from "@/components/shared/ContentLayout";
import { useAuthStore } from "@/store/authStore";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function AccountPage() {
  const { user } = useAuthStore();

  return (
    <ContentLayout title="Account">
      <motion.div
        className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 space-y-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-xl font-semibold text-green-400 mb-3">
          Profile Information
        </h3>
        <p className="text-gray-300 space-x-2">
          <span>Name: {user.name}</span>
          <Badge variant={user.isSubscribed ? "premium" : ""}>
            {user.isSubscribed ? "PRO" : "FREE"}
          </Badge>
        </p>
        <p className="text-gray-300">Email: {user.email}</p>
      </motion.div>

      <motion.div
        className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 space-y-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-xl font-semibold text-green-400 mb-3">
          Account Activity
        </h3>
        <p className="text-gray-300">
          <span className="font-bold">Joined: </span>
          {formatDate(user.createdAt)}
        </p>
        <p className="text-gray-300">
          <span className="font-bold">Last Login: </span>

          {formatDate(user.lastLogin)}
        </p>
      </motion.div>
    </ContentLayout>
  );
}
