import { useEffect } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { motion } from "framer-motion";
import { useLocation, useParams } from "react-router-dom";

import { useDashboardStore } from "@/store/dashboardStore";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { LoaderWithMessage } from "@/components/loaders/LoaderWithMessage";
import { CalloutCard } from "@/components/shared/CalloutCard";
import { RefreshBtn } from "@/components/shared/RefreshBtn";
import { SiteHeading } from "@/components/analytics/SiteHeading";

const chartConfig = {
  peakUsers: {
    label: "Peak Users",
    color: "hsl(var(--chart-1))",
  },
  totalUsers: {
    label: "Total Users",
    color: "hsl(var(--chart-2))",
  },
  liveusers: {
    label: "Live Users",
    color: "hsl(var(--chart-3))",
  },
};

export function DashBoardLineChart() {
  const { id } = useParams();
  const location = useLocation();
  const siteInfo = location.state.site || {};
  const { activity, error, isLoading, getActivity } = useDashboardStore();

  useEffect(() => {
    if (id) {
      getActivity(id);
    }
  }, [id, getActivity]);

  if (isLoading) return <LoaderWithMessage message="Loading data..." />;
  if (error) return <CalloutCard variant="destructive" text={error} />;

  return (
    <motion.div
      className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {activity.length === 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <CalloutCard variant="success" text="No data available." />
          <RefreshBtn />
        </div>
      )}

      {activity.length !== 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="font-medium underline underline-offset-2">
              <SiteHeading site={siteInfo} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80 w-full">
              <LineChart
                data={activity}
                margin={{
                  left: 8,
                  right: 8,
                  top: 8,
                  bottom: 8,
                }}
                accessibilityLayer
              >
                <ChartLegend content={<ChartLegendContent />} />
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  fontSize="10px"
                  axisLine={false}
                />
                <YAxis
                  dataKey={activity.totalUsers}
                  tickLine={true}
                  allowDataOverflow
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Line
                  dataKey="peakUsers"
                  type="monotone"
                  stroke="var(--color-peakUsers)"
                  strokeWidth={2}
                  dot={true}
                  connectNulls
                />
                <Line
                  dataKey="totalUsers"
                  type="monotone"
                  stroke="var(--color-totalUsers)"
                  strokeWidth={2}
                  dot={true}
                  connectNulls
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}
