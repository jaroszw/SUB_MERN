import express from "express";
import User from "../models/user";
import { checkAuth } from "../middleware/checkAuth";
import { stripe } from "../utils/stripe";
import Articles from "../models/article";
import Stripe from "stripe";

export interface IGetUserAuthInfoRequest extends Request {
  user: string; // or any other type
}

const router = express.Router();

router.get("/articles", checkAuth, async (req, res) => {
  const user = await User.findOne({ email: req.user });

  const subscriptions = await stripe.subscriptions.list(
    {
      customer: user.stripeCustomerId,
      status: "all",
      expand: ["data.default_payment_method"],
    },
    {
      apiKey: process.env.STRIPE_SECRET_KEY,
    }
  );

  if (!subscriptions.data.length) {
    return res.json([]);
  }

  //@ts-ignore
  const plan = subscriptions.data[0].plan.nickname;

  if (plan === "Basic") {
    const articles = await Articles.find({ access: "Basic" });
    return res.json(articles);
  } else if (plan === "Standard") {
    const articles = await Articles.find({
      access: { $in: ["Basic", "Standard"] },
    });
    return res.json(articles);
  } else if (plan === "Premium") {
    const articles = await Articles.find({});
    return res.json(articles);
  }
});

export default router;
