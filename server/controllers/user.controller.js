import { Site } from "../models/site.model.js";
import { Activity } from "../models/activity.model.js";

export const getSitesForUser = async (req, res) => {
  try {
    const userId = req.userId;
    const sites = await Site.find({ userId }).select([
      "-userId",
      "-activities",
    ]);

    if (!sites.length) {
      return res.status(200).json({ success: true, sites: [] });
    }

    res.status(200).json({ success: true, sites });
  } catch (error) {
    console.error("Error fetching sites for user:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getActivitiesForSite = async (req, res) => {
  try {
    const { siteId } = req.params;
    const activities = await Activity.find({ site: siteId });

    if (!activities.length) {
      return res.status(200).json({ success: true, activities: [] });
    }

    res.status(200).json({ success: true, activities });
  } catch (error) {
    console.error("Error fetching activities for site:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
