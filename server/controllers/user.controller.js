import crypto from "crypto";
import { User } from "../models/user.model.js";

export const generateApiKey = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    // Check if the user already has an API key
    if (user.apiKey) {
      return res
        .status(200)
        .json({ success: true, message: "API key already generated!!" });
    }

    // Generate a new API key
    const newApiKey = crypto.randomBytes(20).toString("hex");
    user.apiKey = newApiKey;
    await user.save();

    res.status(200).json({ success: true, apiKey: newApiKey });
  } catch (error) {
    console.log("Error in generateApiKey", error);
    res.status(400).json({ success: false, message: error.message });
  }
};
