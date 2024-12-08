import express from "express";
import {
  getSitesForUser,
  getActivitiesForSite,
  getSubscriptionsPlans,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/sites", verifyToken, getSitesForUser);
router.get("/plans", verifyToken, getSubscriptionsPlans);
router.get("/sites/:siteId/activities", verifyToken, getActivitiesForSite);

export default router;
