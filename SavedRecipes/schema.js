import mongoose from "mongoose";
const followersSchema = new mongoose.Schema(
  {
    _id: String,
    user: { type: String, ref: "UserModel" },
    savedRecipe: { type: String, ref: "RecipeModel" },
  },
  { collection: "savedrecipes" }
);
export default followersSchema;
