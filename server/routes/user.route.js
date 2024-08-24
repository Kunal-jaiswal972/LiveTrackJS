import express from "express";
import { generateApiKey } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/generate-api-key", verifyToken, generateApiKey);

export default router;
