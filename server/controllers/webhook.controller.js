import Stripe from "stripe";
import { User } from "../models/user.model.js";
import { Subscription } from "../models/subscriptions.model.js";

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

  console.warn(`Event fired = ${event.type}`);

  switch (event.type) {
    case "checkout.session.completed":
      await handleCheckoutSessionCompleted(event.data.object);
      break;
    case "customer.subscription.deleted":
      await handleSubscriptionDeleted(event.data.object);
      break;
    case "customer.subscription.updated":
      await handleSubscriptionUpdated(event.data.object);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.sendStatus(200);
};

const handleCheckoutSessionCompleted = async (data) => {
  try {
    const userId = data.metadata.userId;
    const user = await User.findById(userId);
    if (!user) {
      console.error(`User not found: ${userId}`);
      return;
    }

    const customerId = data.customer;
    if (!user.stripeCustomerId) {
      user.stripeCustomerId = customerId;
      user.isSubscribed = true;
      user.subscriptionStatus = "active";
      await user.save();
    }

    const subscriptionId = data.subscription;
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    const startDate = new Date(subscription.current_period_start * 1000);
    const endDate = new Date(subscription.current_period_end * 1000);
    const productId = subscription.items.data[0].price.product;
    const product = await stripe.products.retrieve(productId);

    await Subscription.findOneAndUpdate(
      { subscriptionId },
      {
        subscriptionId,
        plan: product.name.toLowerCase(),
        productId,
        startDate,
        endDate,
        userId,
      },
      {
        upsert: true, // Create if not found
        new: true, // Return the new document
        setDefaultsOnInsert: true, // Set default values if create new document
      }
    );

    console.log(`Checkout session completed for user ${userId}`);
  } catch (error) {
    console.error("Error handling checkout session completed:", error);
  }
};

const handleSubscriptionDeleted = async (data) => {
  try {
    const subscriptionId = data.id;
    const customerId = data.customer;
    const user = await User.findOne({ stripeCustomerId: customerId });
    if (!user) {
      console.error(`User not found: ${customerId}`);
      return;
    }

    user.subscriptionStatus = "canceled";
    user.isSubscribed = false;
    await user.save();

    await Subscription.findOneAndUpdate(
      { subscriptionId },
      {
        endDate: new Date(),
      },
      {
        new: true,
      }
    );

    console.log(`Subscription canceled for user ${user._id}`);
  } catch (error) {
    console.error("Error handling subscription canceled:", error);
  }
};

const handleSubscriptionUpdated = async (data) => {
  try {
    const subscriptionId = data.id;
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const customerId = subscription.customer;

    const user = await User.findOne({ stripeCustomerId: customerId });
    if (!user) {
      console.error(`User not found for customerId: ${customerId}`);
      return;
    }

    const productId = subscription.items.data[0].price.product;
    const product = await stripe.products.retrieve(productId);


    await Subscription.findOneAndUpdate(
      { subscriptionId },
      {
        plan: product.name.toLowerCase(),
        startDate: new Date(subscription.current_period_start * 1000),
        endDate: new Date(subscription.current_period_end * 1000),
      },
      {
        new: true,
        upsert: true,
      }
    );

    console.log(subscription.status);

    if (subscription.status === "active") {
      user.subscriptionStatus = "active";
    } else if (subscription.status === "canceled") {
      user.subscriptionStatus = "canceled";
    } else if (subscription.status === "past_due") {
      user.subscriptionStatus = "expired";
    } else {
      user.subscriptionStatus = "inactive";
    }

    await user.save();

    console.log(`Subscription updated for user ${user._id}`);
  } catch (error) {
    console.error("Error handling subscription updated:", error);
  }
};
