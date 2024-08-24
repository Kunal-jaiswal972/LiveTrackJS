import express from "express";
import * as userManager from "../utils/userManager.js";

const router = express.Router();

router.get("", (req, res) => {
  res.json(userManager.usersBySite);
});

export default router;
