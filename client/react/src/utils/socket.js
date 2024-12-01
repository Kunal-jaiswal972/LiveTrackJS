import { io } from "socket.io-client";

let socketInstance = null;
//https://youtu.be/ntKkVrQqBYY?si=gSXBW4BQCiPPsLbF&t=12801  use this approach for better code
const createSocket = (serverUrl, apiKey, host) => {
  if (!socketInstance) {
    socketInstance = io(serverUrl, {
      query: { host },
      transports: ["websocket"],
      auth: {
        token: apiKey,
      },
    });

    socketInstance.on("disconnect", () => {
      socketInstance = null;
    });
  }

  return socketInstance;
};

export default createSocket;
