import * as dao from "./dao.js";
import * as userDao from "../Users/dao.js";
import * as savedRecipesDao from "../SavedRecipes/dao.js";
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
    const { search } = req.query;
    console.log("Earlier search = " + search);
    if (search) {
      console.log("search = " + search);
      const recipes = await dao.findRecipesByPartialName(search);
      res.json(recipes);
      return;
    }
    const recipes = await dao.findAllRecipes();
    res.json(recipes);
  };
  const getFeed = async (req, res) => {
    const { search } = req.query;
    const recipes = search
      ? await dao.findRecipesByPartialName(search)
      : await dao.findAllRecipes();
    const user = await userDao.findUserById(req.params.userId);

    const feed = recipes.filter((r) => {
      let containsAllergen = false;
      user.allergies.map((allergy) => {
        containsAllergen =
          containsAllergen ||
          r.ingredients.toLowerCase().indexOf(allergy.toLowerCase()) !== -1 ||
          r.description.toLowerCase().indexOf(allergy.toLowerCase()) !== -1;
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
  app.get("/api/recipes", findAllRecipes);
  app.get("/api/recipes/:userId", getFeed);
  app.get("/api/recipes/:recipeId", findRecipeById);
  app.put("/api/recipes/:recipeId", updateRecipe);
  app.delete("/api/recipes/:recipeId", deleteRecipe);
  app.get("/api/recipes/usersSaved/:recipeId", async (req, res) => {
    const { recipeId } = req.params;
    const { search } = req.query;
    const status = await savedRecipesDao.findUsersForSavedRecipe(
      recipeId,
      search
    );
    res.send(status);
  });
}
