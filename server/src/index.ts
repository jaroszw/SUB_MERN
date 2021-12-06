import express, { urlencoded } from "express";
import authRoutes from "./routes/auth";
import subsRoutes from "./routes/subs";
import articlesRoutes from "./routes/articles";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/auth", authRoutes);
app.use("/subs", subsRoutes);
app.use("/art", articlesRoutes);

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGODB_URI;

mongoose
  .connect(
    MONGO_URL as string
    //   , {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // }
  )
  .then(() =>
    app.listen(PORT, () => console.log(`Server is listienning on port ${PORT}`))
  )
  .catch((err) => console.log(err.message));
