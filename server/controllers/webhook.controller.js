import Stripe from "stripe";
import { User } from "../models/user.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const webhookHandler = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const buf = req.rawBody;
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log("⚠️ Webhook signature verification failed.", err.message);
    return res.sendStatus(400);
  }

  console.log(`Event fired = ${event.type}`);

  switch (event.type) {
    case "checkout.session.completed":
      handleCheckoutSessionCompleted(event.data.object);
      break;
    case "invoice.payment_succeeded":
      handleInvoicePaymentSucceeded(event.data.object);
      break;
    case "invoice.payment_failed":
      handleInvoicePaymentFailed(event.data.object);
      break;
    case "customer.subscription.created":
      handleSubscriptionCreated(event.data.object);
      break;
    case "customer.subscription.updated":
      handleSubscriptionUpdated(event.data.object);
      break;
    case "customer.subscription.deleted":
      handleSubscriptionDeleted(event.data.object);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.sendStatus(200);
};

const handleCheckoutSessionCompleted = async (session) => {
  try {
    const userId = session.metadata.userId;
    const subscriptionId = session.subscription;

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    if (
      !subscription ||
      !subscription.items ||
      subscription.items.data.length === 0
    ) {
      console.error("No subscription items found.");
      return;
    }

    const productId = subscription.items.data[0].price.product;
    const product = await stripe.products.retrieve(productId);
    const user = await User.findById(userId);
    if (!user) {
      console.error(`User not found: ${userId}`);
      return;
    }

    user.subscriptionStatus = "active";
    user.subscriptionId = subscriptionId;
    user.planType = product.name;
    user.billingCycleStart = new Date();
    await user.save();

    console.log(`Checkout session completed for user ${userId}`);
  } catch (error) {
    console.error("Error handling checkout session completed:", error);
  }
};

const handleInvoicePaymentSucceeded = async (invoice) => {
  try {
    const subscriptionId = invoice.subscription;
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const productId = subscription.items.data[0].price.product;
    const product = await stripe.products.retrieve(productId);

    const user = await User.findOne({ subscriptionId });
    if (user) {
      user.subscriptionStatus = "active";
      user.planType = product.name;
      await user.save();
      console.log(`Invoice payment succeeded for user ${user._id}`);
    }
  } catch (error) {
    console.error("Error handling invoice payment succeeded:", error);
  }
};

const handleInvoicePaymentFailed = async (invoice) => {
  try {
    const subscriptionId = invoice.subscription;
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const productId = subscription.items.data[0].price.product;
    const product = await stripe.products.retrieve(productId);

    const user = await User.findOne({ subscriptionId });
    if (user) {
      user.subscriptionStatus = "past_due";
      user.planType = product.name;
      await user.save();
      console.log(`Invoice payment failed for user ${user._id}`);
    }
  } catch (error) {
    console.error("Error handling invoice payment failed:", error);
  }
};

const handleSubscriptionCreated = async (subscription) => {
  try {
    const userId = subscription.metadata.userId;
    const productId = subscription.items.data[0].price.product;
    const product = await stripe.products.retrieve(productId);

    const user = await User.findById(userId);
    if (user) {
      user.subscriptionStatus = "active";
      user.subscriptionId = subscription.id;
      user.planType = product.name;
      await user.save();
      console.log(`Subscription created for user ${userId}`);
    }
  } catch (error) {
    console.error("Error handling subscription created:", error);
  }
};

const handleSubscriptionUpdated = async (subscription) => {
  try {
    const userId = subscription.metadata.userId;
    const productId = subscription.items.data[0].price.product;
    const product = await stripe.products.retrieve(productId);

    const user = await User.findById(userId);
    if (user) {
      user.subscriptionStatus = subscription.status;
      user.planType = product.name;
      await user.save();
      console.log(`Subscription updated for user ${userId}`);
    }
  } catch (error) {
    console.error("Error handling subscription updated:", error);
  }
};

const handleSubscriptionDeleted = async (subscription) => {
  try {
    const userId = subscription.metadata.userId;
    const user = await User.findById(userId);
    if (user) {
      user.subscriptionStatus = "canceled";
      user.subscriptionId = null;
      await user.save();
      console.log(`Subscription canceled for user ${userId}`);
    }
  } catch (error) {
    console.error("Error handling subscription deleted:", error);
  }
};
