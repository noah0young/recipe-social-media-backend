import mongoose from "mongoose";
const followersSchema = new mongoose.Schema(
  {
    _id: String,
    from: { type: String, ref: "UserModel" },
    to: { type: String, ref: "UserModel" },
  },
  { collection: "followers" }
);
export default followersSchema;
