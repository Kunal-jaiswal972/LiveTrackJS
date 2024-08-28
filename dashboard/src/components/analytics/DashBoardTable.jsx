import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AlertCircle, CircleArrowRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertTitle } from "@/components/ui/alert";

import { Loader } from "@/components/Loader";
import { useUserStore } from "@/store/userStore";
import { formatDate } from "@/lib/utils";

export function DashBoardTable() {
  const { sites, getSites, isLoading, error } = useUserStore();

  useEffect(() => {
    getSites();
  }, []);

  if (isLoading) return <Loader message="Loading Your sites..." />;
  if (error)
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{error}</AlertTitle>
      </Alert>
    );

  return (
    <motion.div
      className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Alert variant="success">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>
          These are the sites being tracked by us through your API key!!
        </AlertTitle>
      </Alert>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Sites</TableHead>
            <TableHead>Live Users</TableHead>
            <TableHead>Tracking Since</TableHead>
            <TableHead>Requests</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sites.map((site, idx) => (
            //tablerow by shadcn not working with framer motion so chatgpt told to use tr.
            <motion.tr
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.5 }}
              className="hover:bg-muted/50 align-middle"
            >
              <TableCell className="font-medium underline underline-offset-2">
                <a
                  href={`https://${site.host}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {site.host}
                </a>
              </TableCell>
              <TableCell>{site.liveUsers || "0"}</TableCell>
              <TableCell>{formatDate(site.createdAt)}</TableCell>
              <TableCell>{site.requests || "0"}</TableCell>
              <TableCell className="text-right">
                <Link
                  to={`/dashboard/analytics/${site._id}`}
                  className="text-sm text-green-400 hover:underline flex items-center"
                >
                  <CircleArrowRight className="h-5 w-5 hover:scale-110" />
                </Link>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
}
