import express from "express";
import { createCheckoutSession } from "../controllers/subscriptions.controller.js";
import { webhookHandler } from "../controllers/webhook.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/create-checkout-session", verifyToken, createCheckoutSession);
router.post(
  "/create-billing-portal-session",
  verifyToken,
  createCheckoutSession
);
router.post(
  "/webhooks",
  express.raw({ type: "application/json" }),
  webhookHandler
);

export default router;
