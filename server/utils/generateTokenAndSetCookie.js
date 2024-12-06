import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "strict",
    domain: isProduction ? process.env.DASHBOARD_CLIENT_URL : undefined,
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};
