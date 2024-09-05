import Stripe from "stripe";
import { User } from "../models/user.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const { planType } = req.body;
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const priceIdMap = {
      standard: "price_1PvH9gKpPwVKykRFwFwEtoB0",
      premium: "price_1PvH9xKpPwVKykRFqowkX46h",
    };

    if (!priceIdMap[planType]) {
      return res.status(400).json({ error: "Invalid plan type" });
    }

    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceIdMap[planType],
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.DASHBOARD_CLIENT_URL}/success`,
      cancel_url: `${process.env.DASHBOARD_CLIENT_URL}/cancel`,
      metadata: { userId: userId.toString() },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createBillingPortalSession = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let stripeCustomerId = user.stripeCustomerId;
    if (!stripeCustomerId) {
      return res
        .status(400)
        .json({ error: "No Stripe customer ID found for this user" });
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: `${process.env.DASHBOARD_CLIENT_URL}/account`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating billing portal session:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
