import { ContentLayout } from "@/components/shared/ContentLayout";
import { BillingInfo } from "@/components/billings/BillingInfo";
import { PricingCardContainer } from "@/components/billings/PricingCardContainer";

const BillingsPage = () => {
  return (
    <ContentLayout title="Billings">
      <BillingInfo />
      <PricingCardContainer />
    </ContentLayout>
  );
};

export default BillingsPage;
