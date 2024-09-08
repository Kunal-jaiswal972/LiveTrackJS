import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    apiKey: {
      type: String,
      required: true,
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
    stripeCustomerId: {
      type: String,
      unique: true,
    },
    isSubscribed: { type: Boolean, default: false },
    subscriptionStatus: {
      type: String,
      enum: ["inactive", "active", "canceled", "expired"],
      default: "inactive",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
