import { ContentLayout } from "@/components/ContentLayout";
import { DashBoardTable } from "@/components/analytics/DashBoardTable";

export default function DashboardPage() {
  return (
    <ContentLayout title="Dashboard">
      <DashBoardTable />
    </ContentLayout>
  );
}
