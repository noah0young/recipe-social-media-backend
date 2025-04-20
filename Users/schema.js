import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    _id: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: String,
    bio: String,
    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },
    allergies: {
      type: Array,
      default: [],
    },
    preferences: {
      type: Array,
      default: [],
    },
    savedRecipes: {
      type: Array, // an array of string ids
      default: [],
    },
    myRecipes: {
      type: Array, // an array of string ids
      default: [],
    },
  },
  { collection: "users" }
);
export default userSchema;
