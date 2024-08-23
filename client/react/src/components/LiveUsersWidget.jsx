import React from "react";
import useLiveUsers from "../hooks/useLiveUsers";
import { CircleCheck } from "lucide-react";

const LiveUsersWidget = () => {
  const liveUsers = useLiveUsers();

  return (
    <div className="inline-flex items-center p-4 bg-white text-sm font-medium font-poppins border rounded-full shadow-lg h-20 max-w-xs mx-auto space-x-4">
      <div className="bg-pink-100 rounded-full w-14 h-14 flex items-center justify-center">
        <div className="bg-pink-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg animate-pulse">
          {liveUsers === null ? "??" : liveUsers}
        </div>
      </div>

      <div className="flex flex-col items-start justify-center">
        <div className="text-lg font-semibold text-black">
          {liveUsers === null ? "??" : `${liveUsers} people`}
        </div>
        <div className="text-gray-500 text-xs">are viewing this page</div>
        <div className="flex items-center gap-2 text-blue-500 text-xs">
          <span>Verified by me</span>
          <CircleCheck className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default LiveUsersWidget;
