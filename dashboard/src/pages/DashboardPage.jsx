import { ContentLayout } from "@/components/shared/ContentLayout";
import { DashBoardTable } from "@/components/dashboard/DashBoardTable";

export default function DashboardPage() {
  return (
    <ContentLayout title="Dashboard">
      <DashBoardTable />
    </ContentLayout>
  );
}
