import model from "./model.js";
import { v4 as uuidv4 } from "uuid";
export const createRecipe = (recipe) => {
  const newRecipe = { ...recipe, _id: uuidv4() };
  return model.create(newRecipe);
};

export const findAllRecipes = () => model.find();
export const findRecipeById = (recipeId) => model.findById(recipeId);
export const updateRecipe = (recipeId, recipe) =>
  model.updateOne({ _id: recipeId }, { $set: recipe });
export const deleteRecipe = (userId) => model.deleteOne({ _id: userId });
export const findRecipesByPartialName = (partialName) => {
  const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
  return model.find({
    $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
  });
};
