import { useEffect, useMemo } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Loader } from "@/components/Loader";
import { useUserStore } from "@/store/userStore";
import { useParams } from "react-router-dom";

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
  const { activity, error, isLoading, getActivity } = useUserStore();

  useEffect(() => {
    if (id) {
      getActivity(id);
    }
  }, [id, getActivity]);

  if (isLoading) return <Loader message="Loading data..." />;
  if (error)
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{error}</AlertTitle>
      </Alert>
    );

  if (!activity || !Array.isArray(activity) || activity.length === 0) {
    return <Alert variant="destructive">No data available.</Alert>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="underline underline-offset-4 font-bold">
          <a href="/">Here Goes Site Title</a>
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
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
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
  );
}
