import { redisClient } from "../db/redis.js";

class UserManager {
  constructor(redisClient) {
    this.redis = redisClient;
  }

  getKey(keyType, host, apiKeyUserId, params = {}) {
    let key;
    switch (keyType) {
      case "live_users":
        key = `live_users:${host}:${apiKeyUserId}`;
        break;
      case "total_users":
        const date = params.date || this.getDate();
        key = `total_users:${host}:${apiKeyUserId}:${date}`;
        break;
      case "peak_users":
        const peakDate = params.date || this.getDate();
        key = `peak_users:${host}:${apiKeyUserId}:${peakDate}`;
        break;
      default:
        throw new Error(`Unknown key type: ${keyType}`);
    }
    return key;
  }

  getDate() {
    const today = new Date();
    return today.toISOString().split("T")[0];
  }

  async addUser(host, apiKeyUserId) {
    const liveUserKey = this.getKey("live_users", host, apiKeyUserId);
    const totalUserKey = this.getKey("total_users", host, apiKeyUserId, {
      date: this.getDate(),
    });
    const peakUserKey = this.getKey("peak_users", host, apiKeyUserId, {
      date: this.getDate(),
    });

    await this.redis.incr(liveUserKey);
    await this.redis.incr(totalUserKey);

    const currentLiveCount = await this.redis.get(liveUserKey);
    const currentPeakCount = await this.redis.get(peakUserKey);

    if (parseInt(currentLiveCount) > parseInt(currentPeakCount || 0)) {
      await this.redis.set(peakUserKey, currentLiveCount);
    }
  }

  async removeUser(host, apiKeyUserId) {
    const liveUserKey = this.getKey("live_users", host, apiKeyUserId);
    const currentCount = await this.redis.get(liveUserKey);

    if (parseInt(currentCount) > 0) {
      await this.redis.decr(liveUserKey);
    } else {
      await this.redis.set(liveUserKey, 0);
    }
  }

  async getUserCount(host, apiKeyUserId) {
    const liveUserKey = this.getKey("live_users", host, apiKeyUserId);
    const count = await this.redis.get(liveUserKey);
    return parseInt(count) || 0;
  }

  async getPeakUserCount(host, apiKeyUserId) {
    const peakUserKey = this.getKey("peak_users", host, apiKeyUserId, {
      date: this.getDate(),
    });
    const peakCount = await this.redis.get(peakUserKey);
    return parseInt(peakCount) || 0;
  }
}

export const userManager = new UserManager(redisClient);
