import { useState, useEffect } from "react";
import { useLiveTrack } from "../context/LiveTrackContext";
import createSocket from "../utils/socket";

export const useLiveUsers = () => {
  const { apiKey, serverUrl } = useLiveTrack();
  const host = window.location.hostname;

  const [liveUsers, setLiveUsers] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const socket = createSocket(serverUrl, apiKey, host);

    const handleError = (err) => {
      console.error("Socket error:", err);
      setError("Error connecting to the server.");
      setIsLoading(false);
    };

    const handleLiveUsers = (count) => {
      setLiveUsers(count);
      setIsLoading(false);
    };

    socket.on("connect_error", handleError);
    socket.on("error", handleError);
    socket.on("liveUsers", handleLiveUsers);

    return () => {
      socket.off("connect_error", handleError);
      socket.off("error", handleError);
      socket.off("liveUsers", handleLiveUsers);
      setIsLoading(false);
    };
  }, [serverUrl, host, apiKey]);

  return { liveUsers, isLoading, error };
};


