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
      handleCheckoutSessionCompleted(event.data.object);
      break;
    case "customer.subscription.deleted":
      handleSubscriptionDeleted(event.data.object);
      break;
    // case "invoice.payment_failed":
    //   handleInvoicePaymentFailed(event.data);
    //   break;
    // case "customer.subscription.updated":
    //   handleSubscriptionUpdated(event.data);
    //   break;
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
      await user.save();
    }

    const subscriptionId = data.subscription;
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    const startDate = new Date(subscription.current_period_start * 1000);
    const endDate = new Date(subscription.current_period_end * 1000);
    const productId = subscription.items.data[0].price.product;
    const product = await stripe.products.retrieve(productId);

    await Subscription.findOneAndUpdate(
      { userId },
      {
        subscriptionId,
        plan: product.name,
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
    const customerId = data.customer;
    const user = await User.findOne({ stripeCustomerId: customerId });
    if (!user) {
      console.error(`User not found: ${user._id}`);
      return;
    }

    user.isSubscribed = false;
    await user.save();

    console.log(`Subscription canceled for user ${user._id}`);
  } catch (error) {
    console.error("Error handling subscription deleted:", error);
  }
};

// const handleInvoicePaymentFailed = async (invoice) => {
//   try {
//     const subscriptionId = invoice.subscription;
//     const subscription = await stripe.subscriptions.retrieve(subscriptionId);
//     const productId = subscription.items.data[0].price.product;
//     const product = await stripe.products.retrieve(productId);

//     const user = await User.findOne({ subscriptionId });
//     if (user) {
//       user.subscriptionStatus = "past_due";
//       user.planType = product.name;
//       await user.save();
//       console.log(`Invoice payment failed for user ${user._id}`);
//     }
//   } catch (error) {
//     console.error("Error handling invoice payment failed:", error);
//   }
// };

// const handleSubscriptionUpdated = async (subscription) => {
//   try {
//     const userId = subscription.metadata.userId;
//     const productId = subscription.items.data[0].price.product;
//     const product = await stripe.products.retrieve(productId);

//     const user = await User.findById(userId);
//     if (user) {
//       user.subscriptionStatus = subscription.status;
//       user.planType = product.name;
//       await user.save();
//       console.log(`Subscription updated for user ${userId}`);
//     }
//   } catch (error) {
//     console.error("Error handling subscription updated:", error);
//   }
// };
