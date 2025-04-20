import model from "./model.js";
export async function findSavedRecipeForUser(userId) {
  const following = await model.find({ user: userId }).populate("savedRecipe");
  console.log(following);
  return following.map((f) => f.savedRecipe);
}
export async function findUsersForSavedRecipe(recipeId) {
  const followers = await model
    .find({ savedRecipe: recipeId })
    .populate("user");
  return followers.map((f) => f.user);
}
export function saveRecipe(userId, recipeId) {
  const newFollow = {
    user: userId,
    savedRecipe: recipeId,
    _id: `${userId}-${recipeId}`,
  };
  return model.create(newFollow);
}
export function unsaveRecipe(userId, recipeId) {
  return model.deleteOne({ user: userId, savedRecipe: recipeId });
}
