import express from "express";
import { syncF } from "../test.js";

const router = express.Router();

router.get("/sync", async (req, res) => {
  console.log("triggerd");
  try {
    await syncF();
    res
      .status(200)
      .json({ success: true, message: "Sync job triggered manually." });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to trigger sync job manually.",
    });
  }
});

export default router;
