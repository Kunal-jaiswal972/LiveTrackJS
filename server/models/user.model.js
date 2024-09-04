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
    stripeCustomerId: { type: String },
    subscriptionStatus: {
      type: String,
      enum: ["active", "canceled", "past_due", "inactive"],
      default: "inactive",
    },
    planType: {
      type: String,
      enum: ["Free", "Standard", "Premium"],
      default: "Free",
    },
    subscriptionId: { type: String },
    billingCycleStart: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
