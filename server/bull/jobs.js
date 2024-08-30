import Queue from "bull";
import dotenv from "dotenv";
import { redisClient } from "../db/redis.js";

dotenv.config();

const syncQueue = new Queue("sync-queue", process.env.REDIS_URL);

syncQueue.process(async (job) => {
  try {
    await redisClient.set("me", "mooo");
    console.log("Job processed successfully");
  } catch (error) {
    console.error("Job failed with error:", error);
  }
});


syncQueue.on("completed", (job) => {
  console.log(`Sync job completed successfully at ${new Date()}`);
});

syncQueue.on("failed", (job, err) => {
  console.error("Sync job failed with error:", err);
});

export default syncQueue;
