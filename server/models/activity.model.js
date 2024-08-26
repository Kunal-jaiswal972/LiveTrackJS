import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    date: { type: String, required: true, unique: true },
    peakUsers: { type: Number, default: 0 },
    totalUsers: { type: Number, default: 0 },
    site: { type: mongoose.Schema.Types.ObjectId, ref: "Site", required: true },
  },
  { timestamps: true }
);

export const Activity = mongoose.model("Activity", activitySchema);
