import { Site } from "../models/site.model.js";
import { Subscription } from "../models/subscriptions.model.js";
import { planLimits } from "../utils/planLimits.js";

export const checkSiteLimitMiddleware = async (socket, next) => {
  const userId = socket.userId;

  try {
    const plan = Subscription.findOne({ userId }).plan;
    const sitesAllowed = planLimits[plan] || planLimits.free;
    const siteCount = await Site.countDocuments({ userId });

    console.log(siteCount, sitesAllowed, userId);
    
    socket.sitesAllowed = sitesAllowed;
    socket.currentSiteCount = siteCount;

    if (siteCount > sitesAllowed) {
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
