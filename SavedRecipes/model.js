import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("SavedRecipesModel", schema);
export default model;
