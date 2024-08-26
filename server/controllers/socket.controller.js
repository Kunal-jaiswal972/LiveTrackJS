import { userManager } from "../utils/userManager.js";

export const handleConnection = async (socket, io) => {
  const host = socket.handshake.query.host;
  const userId = socket.userId;

  if (!host || !userId) {
    console.error("No host or User ID provided", { host, userId });
    socket.disconnect(true);
    return;
  }

  await userManager.addUser(host, userId);
  socket.join(host);

  const userCount = await userManager.getUserCount(host, userId);
  io.to(host).emit("liveUsers", userCount);
  console.log(`Site: ${host}, users: ${userCount}`);
};

export const handleDisconnection = async (socket, io) => {
  const host = socket.handshake.query.host;
  const userId = socket.userId;

  await userManager.removeUser(host, userId);
  const updatedUserCount = await userManager.getUserCount(host, userId);
  io.to(host).emit("liveUsers", updatedUserCount);
  console.log(`Site: ${host}, users: ${updatedUserCount}`);
};
