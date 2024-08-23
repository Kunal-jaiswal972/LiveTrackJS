import { useState, useEffect } from "react";
import { useLiveTrack } from "../context/LiveTrackContext";
import createSocket from "../utils/socket";

const useLiveUsers = () => {
  const { apiKey, serverUrl } = useLiveTrack();
  const hostName = window.location.hostname;

  const [liveUsers, setLiveUsers] = useState(0);

  useEffect(() => {
    const socket = createSocket(serverUrl, apiKey, hostName);

    socket.on("liveUsers", (count) => {
      setLiveUsers(count);
    });

    return () => {
      socket.off("liveUsers");
    };
  }, [serverUrl, hostName, apiKey]);

  return liveUsers;
};

export default useLiveUsers;
