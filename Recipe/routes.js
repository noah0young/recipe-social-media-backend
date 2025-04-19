import * as dao from "./dao.js";
export default function RecipeRoutes(app) {
  const createRecipe = async (req, res) => {
    const recipe = await dao.createRecipe(req.body);
    res.json(user);
  };

  const deleteRecipe = async (req, res) => {
    const status = await dao.deleteRecipe(req.params.userId);
    res.json(status);
  };

  const findAllRecipes = async (req, res) => {
    const { role, name } = req.query;
    if (role) {
      const users = await dao.findUsersByRole(role);
      res.json(users);
      return;
    }
    if (name) {
      const users = await dao.findRecipesByPartialName(name);
      res.json(users);
      return;
    }
    const users = await dao.findAllRecipes();
    res.json(users);
  };
  const findRecipeById = async (req, res) => {
    const user = await dao.findRecipeById(req.params.userId);
    res.json(user);
  };

  const updateRecipe = async (req, res) => {
    const userId = req.params.userId;
    const userUpdates = req.body;
    await dao.updateRecipe(userId, userUpdates);
    const currentUser = req.session["currentUser"];
    if (currentUser && currentUser._id === userId) {
      req.session["currentUser"] = { ...currentUser, ...userUpdates };
    }
    res.json(req.session["currentUser"]);
  };
  app.post("/api/recipes", createRecipe);
  app.get("/api/recipes", findAllRecipes);
  app.get("/api/recipes/:recipeId", findRecipeById);
  app.put("/api/recipes/:recipeId", updateRecipe);
  app.delete("/api/recipes/:recipeId", deleteRecipe);
}
