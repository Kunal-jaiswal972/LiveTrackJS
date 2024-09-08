import { User } from "../models/user.model.js";
import { Site } from "../models/site.model.js";
import { Activity } from "../models/activity.model.js";
import { redisClient } from "../db/redis.js";

const UPDATE_INTERVAL = 1;

export const syncRedisWithMongo = async (req, res) => {
  try {
    const lastUpdatedTime = await redisClient.get("lastUpdatedAt");
    if (lastUpdatedTime) {
      const lastUpdatedDate = new Date(lastUpdatedTime);
      const now = new Date();

      const hoursSinceLastUpdate = (now - lastUpdatedDate) / (1000 * 60 * 60);

      if (hoursSinceLastUpdate < UPDATE_INTERVAL) {
        const remainingTime = UPDATE_INTERVAL - hoursSinceLastUpdate;
        const remainingHours = Math.floor(remainingTime);
        const remainingMinutes = Math.round(
          (remainingTime - remainingHours) * 60
        );

        return res.status(200).json({
          success: true,
          message: `Data is already up-to-date. Try again in ${remainingHours} hrs and ${remainingMinutes} mins!`,
        });
      }
    }

    const peakUserKeys = await redisClient.keys("peak_users:*");
    const totalUsersKeys = await redisClient.keys("total_users:*");

    const keys = [...new Set([...peakUserKeys, ...totalUsersKeys])];
    if (keys.length === 0) {
      return res
        .status(200)
        .json({ success: true, message: "Data is already up-to-date!!" });
    }

    // Prepare a cache to hold activities by date and site
    const cache = new Map();

    for (const key of keys) {
      const [_, host, userId, date] = key.split(":");

      if (!userId) {
        await redisClient.del(key);
        continue;
      }

      const value = await redisClient.get(key);
      const parsedValue = parseInt(value, 10);
      if (isNaN(parsedValue)) {
        await redisClient.del(key);
        continue;
      }

      const user = await User.findById(userId);
      if (!user) {
        console.warn(`User not found for userId: ${userId}`);
        await redisClient.del(key);
        continue;
      }

      let site = await Site.findOne({ host, userId });
      if (!site) {
        site = new Site({ host, userId });
        await site.save();
      }

      const activityKey = `${host}:${userId}:${date}`;
      let activity = cache.get(activityKey);

      if (!activity) {
        activity = {
          date,
          peakUsers: 0,
          totalUsers: 0,
          site: site._id,
        };
        cache.set(activityKey, activity);
      }

      if (peakUserKeys.includes(key)) {
        activity.peakUsers = Math.max(activity.peakUsers, parsedValue);
      }

      if (totalUsersKeys.includes(key)) {
        activity.totalUsers += parsedValue;
      }

      await redisClient.del(key);
    }

    for (const [activityKey, activityData] of cache.entries()) {
      const [host, userId, date] = activityKey.split(":");

      let site = await Site.findOne({ host, userId });
      if (!site) continue;

      let activity = await Activity.findOne({ date, site: site._id });

      if (activity) {
        activity.peakUsers = Math.max(
          activity.peakUsers,
          activityData.peakUsers
        );
        activity.totalUsers += activityData.totalUsers;
        await activity.save();
      } else {
        await Activity.create(activityData);
      }
    }

    await redisClient.set("lastUpdatedAt", new Date().toISOString());

    res
      .status(200)
      .json({ success: true, message: "Data synced successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to trigger sync data.",
    });
  }
};
