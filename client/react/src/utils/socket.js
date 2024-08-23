import { io } from "socket.io-client";

let socketInstance = null;

const createSocket = (serverUrl, apiKey, hostName) => {
  if (!socketInstance) {
    socketInstance = io(serverUrl, {
      query: { hostName },
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
