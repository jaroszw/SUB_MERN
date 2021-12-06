import mongoose, { Schema } from "mongoose";

const ArticleSchema = new Schema(
  {
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    content: { type: String, required: true },
    access: {
      type: String,
      enum: ["Basic", "Standard", "Premium"],
      required: true,
    },
  },
  { timestamps: true }
);

const Articles = mongoose.model("Articles", ArticleSchema);

export default Articles;
