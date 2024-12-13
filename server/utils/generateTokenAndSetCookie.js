import jwt from "jsonwebtoken";

const isProduction = process.env.NODE_ENV === "production";

export const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "none",
  // domain: isProduction ? process.env.DASHBOARD_CLIENT_URL : undefined,
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, cookieOptions);

  return token;
};
