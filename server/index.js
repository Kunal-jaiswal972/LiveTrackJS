// server/index.js
import express from "express";
import http from "http";
import { Server } from "socket.io";
import * as userManager from "./utils/userManager.js";
import config from "./config.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const validApiKeys = new Set([
  "abc123-def456-ghi789-jkl012",
  "mno345-pqr678-stu901-vwx234",
  "yz012-abc345-def678-ghi901",
]);

io.use((socket, next) => {
  const apiKey = socket.handshake.auth.token;

  if (validApiKeys.has(apiKey)) {
    console.log("Valid API Key:", apiKey);
    return next();
  } else {
    console.error("Invalid API Key:", apiKey);
    return next(new Error("Invalid API key"));
  }
});

io.on("connection", (socket) => {
  const host = socket.handshake.query.hostName;

  if (!host) {
    console.error("No hostName provided");
    socket.disconnect(true);
    return;
  }

  userManager.addUser(host);
  socket.join(host);

  io.to(host).emit("liveUsers", userManager.getUserCount(host));

  socket.on("disconnect", () => {
    userManager.removeUser(host);
    io.to(host).emit("liveUsers", userManager.getUserCount(host));
  });
});

server.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
