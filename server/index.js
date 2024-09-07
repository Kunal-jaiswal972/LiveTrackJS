import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import { connectDB } from "./db/mongoDB.js";

import router from "./routes/router.js";
import { validateApiKeyMiddleware } from "./middleware/validateApiKeyMiddleware.js";
import {
  handleConnection,
  handleDisconnection,
} from "./controllers/socket.controller.js";
import { checkSiteLimitMiddleware } from "./middleware/checkSiteLimitMiddleware.js";

// import "./jobs/syncRedisToMongoDB.js";

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
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);
app.use(cookieParser());
app.use("/api/v1", router);

io.use(validateApiKeyMiddleware);
io.use(checkSiteLimitMiddleware);

io.on("connection", async (socket) => {
  handleConnection(socket, io);

  socket.on("disconnect", async () => {
    handleDisconnection(socket, io);
  });
});

connectDB()
  .then(() => {
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  });
