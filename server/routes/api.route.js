import express from "express";
import { syncRedisWithMongo } from "../controllers/sync.controller.js";

const router = express.Router();

router.get("/sync", syncRedisWithMongo);

export default router;
