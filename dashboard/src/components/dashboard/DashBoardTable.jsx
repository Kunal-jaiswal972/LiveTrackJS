import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CircleArrowRight, ExternalLink, ImageOff } from "lucide-react";
import { useDashboardStore } from "@/store/dashboardStore";
import { formatDate } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LoaderWithMessage } from "@/components/loaders/LoaderWithMessage";
import { RefreshBtn } from "@/components/shared/RefreshBtn";
import { CalloutCard } from "@/components/shared/CalloutCard";

export function DashBoardTable() {
  const { sites, getSites, isLoading, error } = useDashboardStore();

  useEffect(() => {
    getSites();
  }, []);

  if (isLoading) return <LoaderWithMessage message="Loading Your sites..." />;
  if (error) return <CalloutCard variant="destructive" text={error} />;

  return (
    <motion.div
      className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
        <CalloutCard
          variant="success"
          text={
            sites.length === 0
              ? "No sites being tracked."
              : "These are the sites being tracked by us through your API key!!"
          }
        />
        <RefreshBtn />
      </div>

      {sites.length !== 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Icon</TableHead>
              <TableHead>Sites</TableHead>
              <TableHead>Live Users</TableHead>
              <TableHead>Tracking Since</TableHead>
              <TableHead className="text-green-400">Analytics</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sites.map((site, idx) => (
              <motion.tr
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2, duration: 0.5 }}
                className="hover:bg-muted/50 align-middle"
              >
                <TableCell>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={site.favicon} alt="Favicon" />
                    <AvatarFallback>
                      <ImageOff className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium underline underline-offset-2">
                  <a
                    href={`https://${site.host}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="space-x-2 flex items-center"
                  >
                    <span>{site.host}</span>
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </TableCell>
                <TableCell>{site.liveUsers || "0"}</TableCell>
                <TableCell>{formatDate(site.createdAt)}</TableCell>
                <TableCell>
                  <Link
                    to={`/dashboard/analytics/${site._id}`}
                    className="text-sm text-green-400 hover:underline flex items-center"
                    state={{ site }}
                  >
                    <CircleArrowRight className="h-5 w-5 hover:scale-110" />
                  </Link>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      )}
    </motion.div>
  );
}
