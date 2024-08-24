import { User } from "../models/user.model.js";

export const validateApiKeyMiddleware = async (socket, next) => {
  const apiKey = socket.handshake.auth.token;

  if (!apiKey) {
    console.error("Missing API Key");
    return next(new Error("Missing API key"));
  }

  try {
    const user = await User.findOne({ apiKey });

    if (user) {
      console.log("Valid API Key:", apiKey);
      return next();
    } else {
      console.error("Invalid API Key:", apiKey);
      return next(new Error("Invalid API key"));
    }
  } catch (error) {
    console.error("Error validating API key:", error);
    return next(new Error("Internal server error"));
  }
};
