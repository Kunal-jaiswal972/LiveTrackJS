import React, { createContext, useContext, useMemo } from "react";

const LiveTrackContext = createContext();

export const LiveTrackProvider = ({ apiKey, children }) => {
  const env = import.meta.env.MODE;
  const serverUrl =
    env === "production"
      ? import.meta.env.VITE_PROD_SERVER_URL
      : import.meta.env.VITE_DEV_SERVER_URL;

  const value = useMemo(() => ({ serverUrl, apiKey }), [serverUrl, apiKey]);

  return (
    <LiveTrackContext.Provider value={value}>
      {children}
    </LiveTrackContext.Provider>
  );
};

export const useLiveTrack = () => {
  const context = useContext(LiveTrackContext);
  if (!context) {
    throw new Error("useLiveTrack must be used within a LiveTrackProvider");
  }
  return context;
};
