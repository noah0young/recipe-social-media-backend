import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    _id: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    bio: String,
    role: {
      type: String,
      enum: ["USER"],
      default: "USER",
    },
    allergies: {
      type: Array,
      default: [],
    },
    preferences: {
      type: Array,
      default: [],
    },
  },
  { collection: "users" }
);
export default userSchema;
