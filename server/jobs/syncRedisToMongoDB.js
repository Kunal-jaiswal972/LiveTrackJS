import Queue from "bull";
import dotenv from "dotenv";
import { redisClient } from "../db/redis.js";
dotenv.config();

const syncQueue = new Queue("sync-queue", process.env.REDIS_URL);

// Log when the queue is ready
syncQueue.on("ready", () => {
  console.log(
    "Bull queue 'sync-queue' created successfully and connected to Redis."
  );
});

// Handle queue error events
syncQueue.on("error", (error) => {
  console.error("Error in Bull queue:", error);
});

syncQueue.process(async (_) => {
  try {
    await redisClient.set("foo", "bar");
    console.log("Job processed successfully");
  } catch (error) {
    console.error("Job failed with error:", error);
  }
});

syncQueue.on("completed", (_) => {
  console.log(`Sync job completed successfully at ${new Date()}`);
});

syncQueue.on("failed", (_, err) => {
  console.error("Sync job failed with error:", err);
});

// Add a repeatable job every 10 seconds
syncQueue.add({}, { repeat: { every: 10 * 1000 } });
