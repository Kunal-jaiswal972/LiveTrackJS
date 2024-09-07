import { redisClient } from "../db/redis.js";
import { Subscription } from "../models/subscriptions.model.js";
import { planLimits } from "../utils/planLimits.js";

export const checkSiteLimitMiddleware = async (socket, next) => {
  try {
    const userId = socket.userId;
    const host = socket.handshake.query.host;

    if (!host) {
      return next(new Error("Host is required"));
    }

    const subscription = await Subscription.findOne({ userId });
    const plan = (subscription ? subscription.plan : "free").toLowerCase();
    const sitesAllowed = planLimits[plan] || planLimits.free;

    const userSites = await redisClient.keys(`live_users:*:${userId}`);
    const existingHosts = userSites.map((key) => key.split(":")[1]);

    if (existingHosts.includes(host)) {
      console.log(`Host ${host} is already being tracked for user ${userId}.`);
      return next();
    }

    const siteCount = existingHosts.length;
    console.log(siteCount, sitesAllowed, userId);

    socket.sitesAllowed = sitesAllowed;
    socket.currentSiteCount = siteCount;

    if (siteCount >= sitesAllowed) {
      console.error(
        `User has reached the site limit: ${siteCount}/${sitesAllowed}`
      );
      return next(new Error("Site limit reached, Upgrade to pro plan"));
    }

    return next();
  } catch (error) {
    console.error("Error checking site limit:", error);
    return next(new Error("Internal server error"));
  }
};
