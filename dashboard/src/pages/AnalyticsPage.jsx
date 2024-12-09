import { ContentLayout } from "@/components/shared/ContentLayout";
import { DashBoardLineChart } from "@/components/analytics/DashBoardLineChart";

export default function AnalyticsPage() {
  return (
    <ContentLayout title="Analytics">
      <DashBoardLineChart />
    </ContentLayout>
  );
}
