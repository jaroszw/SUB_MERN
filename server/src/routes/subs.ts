import express from "express";
import User from "../models/user";
import { checkAuth } from "../middleware/checkAuth";
import { stripe } from "../utils/stripe";

const router = express.Router();

router.get(
  "/prices",
  checkAuth,
  async (req: express.Request, res: express.Response) => {
    const prices = await stripe.prices.list({
      apiKey: process.env.STRIPE_SECRET_KEY,
    });
    res.json(prices);
  }
);

router.post("/session", checkAuth, async (req, res) => {
  const { stripeCustomerId } = await User.findOne({ email: req.user });

  const session = await stripe.checkout.sessions.create(
    {
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: req.body.priceId, quantity: 1 }],
      success_url: "http://localhost:3000/articles",
      cancel_url: "http://localhost:3000/articles-plans",
      customer: stripeCustomerId,
    },
    {
      apiKey: process.env.STRIPE_SECRET_KEY,
    }
  );

  // apiKey: process.env.STRIPE_SECRET_KEY,
  // );
  return res.json(session);
});

export default router;

// const result = await Articles.insertMany([
//   {
//     title: "Learn to cook like Chef Gordon Ramsey",
//     imageUrl:
//       "https://images.unsplash.com/photo-1612352090591-f73f08ffb772?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
//     content:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only.",
//     access: "Basic",
//   },
//   {
//     title: "Designe everybody want to have in their home",
//     imageUrl:
//       "https://images.unsplash.com/photo-1504297050568-910d24c426d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
//     content:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only.",
//     access: "Basic",
//   },
//   {
//     title: "You not gonna belive this",
//     imageUrl:
//       "https://images.unsplash.com/photo-1638664110331-2c38fa65355c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=979&q=80",
//     content:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only.",
//     access: "Standard",
//   },
//   {
//     title: "Software Development - the best job possible?",
//     imageUrl:
//       "https://images.unsplash.com/photo-1633113216317-d0bb16e34e3d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
//     content:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only.",
//     access: "Standard",
//   },
//   {
//     title: "Xmas are comming - get special prices for your gift",
//     imageUrl:
//       "https://images.unsplash.com/photo-1638627495972-30febe167ddc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
//     content:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only.",
//     access: "Premium",
//   },
//   {
//     title: "Drugs - world can be better place",
//     imageUrl:
//       "https://images.unsplash.com/photo-1638722238710-11aaf1794804?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
//     content:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only.",
//     access: "Premium",
//   },
//   {
//     title: "Electric cars not co clean as they try to tell us",
//     imageUrl:
//       "https://images.unsplash.com/photo-1638633067372-8902ae92070a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
//     content:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only.",
//     access: "Premium",
//   },
// ]);
