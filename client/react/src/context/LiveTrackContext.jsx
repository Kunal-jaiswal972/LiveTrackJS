import React, { createContext, useContext, useMemo } from "react";

const LiveTrackContext = createContext();

export const LiveTrackProvider = ({ apiKey, children }) => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
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
