"use client";

import { useMemo } from "react";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

const chartData = [
  { date: "2024-08-25", peakusers: 186, totalusers: 190, liveusers: 100 },
  { date: "2024-08-26", peakusers: 305, totalusers: 390, liveusers: 115 },
  { date: "2024-08-27", peakusers: 237, totalusers: 250, liveusers: 108 },
  { date: "2024-08-28", peakusers: 73, totalusers: null, liveusers: null },
  { date: "2024-08-29", peakusers: 209, totalusers: 230, liveusers: 59 },
  { date: "2024-08-30", peakusers: 214, totalusers: null, liveusers: 18 },
];

const chartConfig = {
  peakusers: {
    label: "Peak Users",
    color: "hsl(var(--chart-1))",
  },
  totalusers: {
    label: "Total Users",
    color: "hsl(var(--chart-2))",
  },
  liveusers: {
    label: "Live Users",
    color: "hsl(var(--chart-3))",
  },
};

export function DashBoardLineChart() {
  // Calculate the dynamic Y-axis data key
  const dynamicYAxisKey = useMemo(() => {
    const maxValues = {
      peakusers: Math.max(...chartData.map((d) => d.peakusers || 0)),
      totalusers: Math.max(...chartData.map((d) => d.totalusers || 0)),
      liveusers: Math.max(...chartData.map((d) => d.liveusers || 0)),
    };

    return Object.keys(maxValues).reduce((a, b) =>
      maxValues[a] > maxValues[b] ? a : b
    );
  }, [chartData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Line Chart - Multiple</CardTitle>
        <CardDescription>dashboard graph</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
            width={1100}
            height={300}
          >
            <ChartLegend content={<ChartLegendContent />} />
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              fontSize="10px"
              axisLine={false}
              tickMargin={8}
            />
            <YAxis dataKey={dynamicYAxisKey} tickLine={false} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="peakusers"
              type="monotone"
              stroke="var(--color-peakusers)"
              strokeWidth={2}
              dot={true}
              connectNulls
            />
            <Line
              dataKey="totalusers"
              type="monotone"
              stroke="var(--color-totalusers)"
              strokeWidth={2}
              dot={true}
              connectNulls
            />
            <Line
              dataKey="liveusers"
              type="monotone"
              stroke="var(--color-liveusers)"
              strokeWidth={2}
              dot={true}
              connectNulls
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this date <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing total visitors for the last 6 months
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
