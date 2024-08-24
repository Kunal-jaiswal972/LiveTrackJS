import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import { connectDB } from "./db/mongoDB.js";
import router from "./routes/router.js";
import * as userManager from "./utils/userManager.js";
import { validateApiKeyMiddleware } from "./middleware/validateApiKeyMiddleware.js";

dotenv.config();
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(morgan("dev"));
app.use(
  cors({
    origin: [process.env.DASHBOARD_CLIENT_URL, "http://localhost:5174"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", router);

io.use(validateApiKeyMiddleware);

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
  console.log(`Site: ${host}, users: ${userManager.getUserCount(host)}`);

  socket.on("disconnect", () => {
    userManager.removeUser(host);
    io.to(host).emit("liveUsers", userManager.getUserCount(host));
    console.log(`Site: ${host}, users: ${userManager.getUserCount(host)}`);
  });
});

server.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
