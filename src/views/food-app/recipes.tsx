import { type Dispatch, type SetStateAction } from "react";
import { type RecipeDetail, type Recipes, type Recipes as RecipesType } from "./types";
import { constants } from "../../constants/constants";
import axios from "axios";
import { spoonacularApi } from "../../services/spoonacular/endpoint";
import InfiniteScroll from "react-infinite-scroll-component";

interface RecipesProps {
  recipes: Recipes;
  setRecipes: React.Dispatch<React.SetStateAction<RecipesType>>;
  setSelectedRecipe: Dispatch<SetStateAction<RecipeDetail>>;
  setOffset: Dispatch<SetStateAction<number>>;
  offset: number;
  searchQuery: string;
}

function Recipes({
  recipes,
  setSelectedRecipe,
  setOffset,
  offset,
  setRecipes,
  searchQuery,
}: RecipesProps) {

  const getRecipeDetails = async (recipeId: number) => {
    try {
      const url =
        `${spoonacularApi.BASE_URL}` +
        `/${spoonacularApi.GET_RECIPES}` +
        `/${recipeId}` +
        `/information?apiKey=${constants.API_KEY}` +
        `&includeNutrition=true`;

      const response = await axios.get(url);
      const data = response.data;
      setSelectedRecipe(data);
    } catch (error) {
      console.log("getRecipeDetails: ", error);
    }
  };


  const fetchMoreRecipes = async () => {

    if (searchQuery.trim() === "") return;
    try {
      const newOffset = offset + constants.resultNumber;

      const url = `${spoonacularApi.BASE_URL}/${spoonacularApi.GET_RECIPES}/complexSearch?apiKey=${constants.API_KEY}&offset=${newOffset}&number=${constants.resultNumber}&addRecipeInformation=${constants.addRecipeInformation}`;

      const response = await axios.get(url);
      const newData = response.data as RecipesType;

      setRecipes((prev) => ({
        ...prev,
        results: [...prev.results, ...newData.results],
      }));

      setOffset(newOffset);
    } catch (error) {
      console.log("fetchMoreRecipes:", error);
    }
  };
  console.log(recipes, "recipes")
  console.log("offset + resultnumber", (offset + constants.resultNumber))
  console.log("recipes total result", recipes.totalResults)
  return (
    <InfiniteScroll
      dataLength={recipes.results.length}
      next={fetchMoreRecipes}
      hasMore={recipes.totalResults > constants.resultNumber + offset}
      loader={<p>Loading...</p>}
      endMessage={
        (recipes.totalResults < constants.resultNumber + offset) && (recipes.results.length > 0) && (
          <p style={{ textAlign: "center" }}>
            <b>No more recipes</b>
          </p>
        )
      }
    >
      <div>
        {recipes.results.length > 0 && (
          <div className="recipes-grid">
            {recipes.results.map((recipe) => (
              <div
                key={recipe.id}
                className="recipe-card"
                onClick={() => {
                  getRecipeDetails(recipe.id);
                }}
              >
                <div className="recipe-image">
                  <img src={recipe.image} alt={recipe.title} />

                  <div className="recipe-overlay">
                    <span className="recipe-time">{recipe.readyInMinutes}</span>
                    {recipe.healthScore && (
                      <span className="health-score">
                        Health: {recipe.healthScore}
                      </span>
                    )}
                  </div>
                </div>

                <div className="recipe-info">
                  <h3>{recipe.title}</h3>
                  <div className="recipe-meta">
                    <span className="servings">
                      {recipe.servings || "N/A"} servings
                    </span>
                  </div>
                  <div>
                    {recipe.diets && recipe.diets.length > 0 && (
                      <div className="diet-tags">
                        {recipe.diets.slice(0, 3).map((diet, index) => (
                          <span key={index} className="diet-tag">
                            {diet}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </InfiniteScroll >
  );
}

export default Recipes;
