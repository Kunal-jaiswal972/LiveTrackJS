import { Loader } from "@/components/Loader";
import { useLiveUsers } from "livetrack-react";

const LiveTrackWidget = () => {
  const { liveUsers, isLoading, error } = useLiveUsers();

  if (isLoading)
    return (
      <div className="bg-pink-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg animate-pulse">
        <Loader />
      </div>
    );

  return (
    <div className="fixed bottom-4 right-4 inline-flex items-center p-3 bg-white text-sm font-medium font-poppins border rounded-full shadow-lg h-20 max-w-xs space-x-2">
      <div className="bg-pink-100 rounded-full w-14 h-14 flex items-center justify-center">
        <div className="bg-pink-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg animate-pulse">
          {isLoading ? <Loader /> : error ? "??" : liveUsers}
        </div>
      </div>

      <div className="flex flex-col items-start justify-center">
        {!isLoading && !error && (
          <>
            <div className="text-lg font-semibold text-black">
              {`${liveUsers} people`}
            </div>
            <div className="text-gray-500 text-xs">Viewing this page</div>
          </>
        )}

        {!isLoading && error && (
          <div className="font-semibold text-red-500 text-xs">{error}</div>
        )}
      </div>
    </div>
  );
};

export default LiveTrackWidget;
