import { useState, useEffect } from "react";
import { useLiveTrack } from "../context/LiveTrackContext";
import createSocket from "../utils/socket";

const useLiveUsers = () => {
  const { apiKey, serverUrl } = useLiveTrack();
  const host = window.location.hostname;

  const [liveUsers, setLiveUsers] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const socket = createSocket(serverUrl, apiKey, host);

    const handleError = (err) => {
      console.error("Socket error:", err);
      setError("Error connecting to the server.");
      setLoading(false);
    };

    const handleLiveUsers = (count) => {
      setLiveUsers(count);
      setLoading(false);
    };

    socket.on("connect_error", handleError);
    socket.on("error", handleError);
    socket.on("liveUsers", handleLiveUsers);

    return () => {
      socket.off("connect_error", handleError);
      socket.off("error", handleError);
      socket.off("liveUsers", handleLiveUsers);
      setLoading(false);
    };
  }, [serverUrl, host, apiKey]);

  return { liveUsers, loading, error };
};

export default useLiveUsers;
