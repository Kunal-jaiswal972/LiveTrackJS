import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redisClient = new Redis(process.env.REDIS_URL);

redisClient.on("error", (err) => {
  console.error("Redis connection error:", err);
});

redisClient.on("ready", () => {
  console.log("Redis client connected successfully!");
});

export { redisClient };
