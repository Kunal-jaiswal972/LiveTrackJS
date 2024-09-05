import React from "react";
import { RefreshCw } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { useDashboardStore } from "@/store/dashboardStore";

const RefreshBtn = () => {
  const { handleRefresh, getSites } = useDashboardStore();

  return (
    <TooltipProvider disableHoverableContent>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <RefreshCw
            className="h-4 w-4 absolute right-4 top-[35%] text-green-400 cursor-pointer hover:scale-110"
            onClick={() => {
              handleRefresh();
              getSites();
            }}
          />
        </TooltipTrigger>
        <TooltipContent side="bottom">Sync data</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default RefreshBtn;
