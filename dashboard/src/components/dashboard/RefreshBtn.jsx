import React from "react";
import { RefreshCw } from "lucide-react";

import { useDashboardStore } from "@/store/dashboardStore";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const RefreshBtn = ({ className }) => {
  const { handleRefresh, getSites } = useDashboardStore();

  return (
    <Button
      className={cn("flex gap-1", className)}
      size="xs"
      variant="signature"
      onClick={() => {
        handleRefresh();
        getSites();
      }}
    >
      Refresh
      <RefreshCw className="h-4 w-4" />
    </Button>
  );
};

export default RefreshBtn;
