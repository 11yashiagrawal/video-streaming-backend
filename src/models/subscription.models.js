import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    // who is subscribing
    subscriber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // which channels is being subscribed to
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Subscription = Subscription.model(
  "Subscription",
  subscriptionSchema
);
