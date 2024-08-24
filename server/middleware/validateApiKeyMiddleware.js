import { validateApiKey } from "../utils/validateApiKey.js";

export const validateApiKeyMiddleware = (socket, next) => {
  const apiKey = socket.handshake.auth.token;

  if (validateApiKey(apiKey)) {
    console.log("Valid API Key:", apiKey);
    return next();
  } else {
    console.error("Invalid API Key:", apiKey);
    return next(new Error("Invalid API key"));
  }
};
