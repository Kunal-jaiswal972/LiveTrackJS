import mongoose from "mongoose";
import Redis from "ioredis";
import { User } from "./models/user.model.js";
import { Site } from "./models/site.model.js";
import { Activity } from "./models/activity.model.js";
import dotenv from "dotenv";

dotenv.config();

const redisClient = new Redis(process.env.REDIS_URL);

(async () => {
  mongoose.set("strictQuery", true);
  await mongoose.connect(process.env.MONGODB_URL);

  try {
    // Get all keys matching the pattern
    const peakKeys = await redisClient.keys("peak_users:*");
    const totalKeys = await redisClient.keys("total_users:*");

    const keys = [...new Set([...peakKeys, ...totalKeys])];
    console.log(keys);

    // Prepare a map to keep track of activities by date and site
    const activitiesMap = new Map();

    for (const key of keys) {
      const [_, host, userId, date] = key.split(":");
      const value = await redisClient.get(key);
      const parsedValue = parseInt(value);

      if (!userId || isNaN(parsedValue)) continue;

      // Validate userId
      const user = await User.findById(userId);
      if (!user) {
        console.warn(`User not found for userId: ${userId}`);
        continue; // Skip if user is not found
      }

      // Get or create site
      let site = await Site.findOne({ host, userId }).populate("activities");
      if (!site) {
        site = new Site({ host, userId });
        await site.save();
      }

      // Prepare activity data
      const activityKey = `${host}:${userId}:${date}`;
      let activity = activitiesMap.get(activityKey);

      if (!activity) {
        activity = {
          date: date || new Date().toISOString().split("T")[0],
          peakUsers: 0,
          totalUsers: 0,
          site: site._id,
        };
        activitiesMap.set(activityKey, activity);
      }

      if (peakKeys.includes(key)) {
        activity.peakUsers = Math.max(activity.peakUsers, parsedValue);
      }

      if (totalKeys.includes(key)) {
        activity.totalUsers = Math.max(activity.totalUsers, parsedValue);
      }
    }

    // Save all activities and update sites
    for (const [_, activityData] of activitiesMap.entries()) {
      const activity = await Activity.create(activityData);

      // Update site with the new activity
      let site = await Site.findById(activityData.site);
      site.activities.push(activity._id);
      await site.save();
    }
  } catch (error) {
    console.error(error);
  } finally {
    redisClient.quit();
    mongoose.connection.close(); // Close MongoDB connection
  }
})();
