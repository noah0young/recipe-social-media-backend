import mongoose from "mongoose";
const recipeSchema = new mongoose.Schema(
  {
    _id: String,
    name: { type: String, required: true, unique: true },
    owner: { type: String, required: true },
    description: String,
    stars: Number,
    ingredients: String,
    steps: String,
    link: String,
  },
  { collection: "recipes" }
);
export default recipeSchema;
