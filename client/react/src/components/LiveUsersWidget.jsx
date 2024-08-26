import useLiveUsers from "../hooks/useLiveUsers";
import { BadgeCheck } from "lucide-react";
import { Loader } from "./Loader";

const LiveUsersWidget = () => {
  const { liveUsers, error, loading } = useLiveUsers();

  return (
    <div className="fixed bottom-4 left-4 inline-flex items-center p-4 px-5 bg-white text-sm font-medium font-poppins border rounded-full shadow-lg h-20 max-w-xs space-x-2">
      <div className="bg-pink-100 rounded-full w-14 h-14 flex items-center justify-center">
        <div className="bg-pink-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg animate-pulse">
          {loading ? <Loader /> : error ? "??" : liveUsers}
        </div>
      </div>

      <div className="flex flex-col items-start justify-center">
        {!loading && !error && (
          <>
            <div className="text-lg font-semibold text-black">
              {`${liveUsers} people`}
            </div>
            <div className="text-gray-500 text-xs"> Viewing this page</div>
            <div className="flex items-center justify-center gap-1 text-blue-500 text-xs">
              <span>
                Verified by <b className="font-mono">Live</b>
              </span>
              <BadgeCheck className="h-4 w-4 fill-blue-500 text-white" />
            </div>
          </>
        )}

        {!loading && error && (
          <div className="font-semibold text-red-500 text-xs">{error}</div>
        )}
      </div>
    </div>
  );
};

export default LiveUsersWidget;
