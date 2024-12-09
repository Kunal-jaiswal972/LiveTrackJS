import { ContentLayout } from "@/components/shared/ContentLayout";
import ApiKeyInput from "@/components/input/ApiKeyInput";

export default function ApiKeyPage() {
  return (
    <ContentLayout title="API Keys">
      <ApiKeyInput />
    </ContentLayout>
  );
}
