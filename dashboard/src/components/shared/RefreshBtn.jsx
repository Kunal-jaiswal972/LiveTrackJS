import React from "react";
import { RefreshCw } from "lucide-react";

import { useDashboardStore } from "@/store/dashboardStore";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const RefreshBtn = ({ className }) => {
  const { handleRefresh, getSites } = useDashboardStore();

  return (
    <Button
      className={cn("h-full flex gap-1 w-full sm:w-min", className)}
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
