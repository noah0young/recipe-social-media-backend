import * as dao from "./dao.js";
import * as userDao from "../Users/dao.js";
export default function RecipeRoutes(app) {
  const createRecipe = async (req, res) => {
    const recipe = await dao.createRecipe(req.body);
    res.json(recipe);
  };

  const deleteRecipe = async (req, res) => {
    const status = await dao.deleteRecipe(req.params.recipeId);
    res.json(status);
  };

  const findAllRecipes = async (req, res) => {
    const { name } = req.query;
    if (name) {
      const recipes = await dao.findRecipesByPartialName(recipes);
      res.json(recipes);
      return;
    }
    const recipes = await dao.findAllRecipes();
    res.json(recipes);
  };
  const getFeed = async (req, res) => {
    const recipes = await dao.findAllRecipes();
    const user = await userDao.findUserById(req.params.userId);

    // The feed is all recipes without ones that contain allergens
    const feed = recipes.filter((r) => {
      let containsAllergen = false;
      user.allergies.map((allergy) => {
        containsAllergen =
          containsAllergen ||
          r.ingredients.indexOf(allergy) !== -1 ||
          r.description.indexOf(allergy) !== -1;
      });
      return !containsAllergen;
    });

    res.json(feed);
  };
  const findRecipeById = async (req, res) => {
    const recipe = await dao.findRecipeById(req.params.recipeId);
    res.json(recipe);
  };

  const updateRecipe = async (req, res) => {
    const recipeId = req.params.recipeId;
    const recipeUpdates = req.body;
    await dao.updateRecipe(recipeId, recipeUpdates);
    return await dao.findRecipeById(recipeId);
  };
  app.post("/api/recipes", createRecipe);
  app.get("/api/recipes/", findAllRecipes);
  app.get("/api/recipes/:userId", getFeed);
  app.get("/api/recipes/:recipeId", findRecipeById);
  app.put("/api/recipes/:recipeId", updateRecipe);
  app.delete("/api/recipes/:recipeId", deleteRecipe);
}
