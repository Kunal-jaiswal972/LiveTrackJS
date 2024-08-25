import { redisClient } from "../db/redis.js";

class UserManager {
  constructor(redisClient) {
    this.redis = redisClient;
  }

  // Generates the key based on the type, host, and apiKey
  getKey(keyType, host, apiKey) {
    switch (keyType) {
      case "live_users":
        return `live_users:${host}:${apiKey}`;
      default:
        throw new Error(`Unknown key type: ${keyType}`);
    }
  }

  async addUser(host, apiKey) {
    const key = this.getKey("live_users", host, apiKey);
    await this.redis.incr(key);
  }

  async removeUser(host, apiKey) {
    const key = this.getKey("live_users", host, apiKey);
    const currentCount = await this.redis.get(key);

    if (parseInt(currentCount) > 0) {
      await this.redis.decr(key);
    } else {
      await this.redis.set(key, 0); // Ensure the count does not go negative
    }
  }

  async getUserCount(host, apiKey) {
    const key = this.getKey("live_users", host, apiKey);
    const count = await this.redis.get(key);
    return parseInt(count) || 0;
  }
}

export const userManager = new UserManager(redisClient);
