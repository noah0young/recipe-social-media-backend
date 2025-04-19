import mongoose from "mongoose";
const recipeSchema = new mongoose.Schema(
  {
    _id: String,
    name: { type: String, required: true, unique: true },
    description: String,
    rating: Number,
    ingredients: String,
    steps: String,
    link: String,
  },
  { collection: "recipes" }
);
export default recipeSchema;
