import express from "express";
import { createBillingPortalSession, createCheckoutSession } from "../controllers/subscriptions.controller.js";
import { webhookHandler } from "../controllers/webhook.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/create-checkout-session", verifyToken, createCheckoutSession);
router.post(
  "/create-billing-portal-session",
  verifyToken,
  createBillingPortalSession
);
router.post(
  "/webhooks",
  express.raw({ type: "application/json" }),
  webhookHandler
);

export default router;
