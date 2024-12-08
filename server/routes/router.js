import { Router } from "express";
import apiRoutes from "./api.route.js";
import authRoutes from "./auth.route.js";
import userRoutes from "./user.route.js";
import subscriptionRoutes from "./subscriptions.route.js";

const router = Router();

router.use("/general", apiRoutes);
router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/payments", subscriptionRoutes);

export default router;
