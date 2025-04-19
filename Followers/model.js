import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("FollowersModel", schema);
export default model;
