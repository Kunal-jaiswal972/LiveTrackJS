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

// Define global expiration time (1 week in seconds)
const ONE_WEEK_IN_SECONDS = 7 * 24 * 60 * 60;

// Override `set` method to include optional expiration based on key pattern
const originalSet = redisClient.set.bind(redisClient);
redisClient.set = (key, value, expiration = ONE_WEEK_IN_SECONDS, ...args) => {
  if (key.startsWith("live_users:")) {
    return originalSet(key, value, ...args); // No expiration for live_users keys
  }
  return originalSet(key, value, "EX", expiration, ...args);
};

// Override `incr` method to include optional expiration after increment based on key pattern
const originalIncr = redisClient.incr.bind(redisClient);
redisClient.incr = async (key, expiration = ONE_WEEK_IN_SECONDS) => {
  const result = await originalIncr(key);
  if (!key.startsWith("live_users:")) {
    await redisClient.expire(key, expiration); // Set expiration if not a live_users key
  }
  return result;
};

// Override `decr` method to include optional expiration after decrement based on key pattern
const originalDecr = redisClient.decr.bind(redisClient);
redisClient.decr = async (key, expiration = ONE_WEEK_IN_SECONDS) => {
  const result = await originalDecr(key);
  if (!key.startsWith("live_users:")) {
    await redisClient.expire(key, expiration); // Set expiration if not a live_users key
  }
  return result;
};

export { redisClient };
