import React, { useState, type Dispatch, type SetStateAction } from "react";
import type { NutrientFiltersType, Recipe, RecipeByNutrients, Recipes, } from "./types";
import { constants } from "../../constants/constants"
import { spoonacularApi } from "../../services/spoonacular/endpoint"
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
interface SearchByNutriensProps {
  setNutrientFilters: Dispatch<SetStateAction<NutrientFiltersType>>;
  nutrientFilters: NutrientFiltersType;
  searchByNutrients: () => void;
  recipesByNutrients: RecipeByNutrients[]
  setRecipesByNutrients: Dispatch<React.SetStateAction<RecipeByNutrients[]>>
  // getRecipeDetails: (id: number) => Promise<void>
  setSelectedRecipe: Dispatch<React.SetStateAction<Recipe>>
  selectedRecipe: Recipe
  setRecipes: Dispatch<React.SetStateAction<Recipes>>
}

function SearchByNutriens({
  setNutrientFilters,
  nutrientFilters,
  searchByNutrients,
  recipesByNutrients,
  setRecipesByNutrients,
  // getRecipeDetails
  setSelectedRecipe,
  selectedRecipe,
  setRecipes

}: SearchByNutriensProps) {
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const handleNutrientFilters = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof NutrientFiltersType; // minCalories

    setNutrientFilters(
      (prev) =>
      ({
        ...prev,
        [name]: e.target.value,
      } as NutrientFiltersType)
    );
  };

  const handleNutrientSearch = () => {
    setRecipesByNutrients([]);

    setOffset(0);
    setRecipes({
      results: [],
      number: 0,
      offset: 0,
      totalResults: 0,
    })
    searchByNutrients();
  };

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

      setRecipesByNutrients((prev) =>
        prev.map((recipe) =>
          recipe.id === recipeId
            ? { ...recipe, healthScore: data.healthScore }
            : recipe
        )
      )
      console.log(selectedRecipe, "selected recipe")
    } catch (error) {
      console.log("getRecipeDetails: ", error);
    }
  };

  const fetchMoreRecipes = async () => {
    try {
      const url = `${spoonacularApi.BASE_URL}/${spoonacularApi.GET_RECIPES}/findByNutrients?apiKey=${constants.API_KEY}` +
        `&minCarbs=${nutrientFilters.minCarbs}` +
        `&maxCarbs=${nutrientFilters.maxCarbs}` +
        `&minCalories=${nutrientFilters.minCalories}` +
        `&maxCalories=${nutrientFilters.maxCalories}` +
        `&minProtein=${nutrientFilters.minProtein}` +
        `&maxProtein=${nutrientFilters.maxProtein}`;

      const response = await axios.get<RecipeByNutrients[]>(url);
      const data = response.data;

      setRecipesByNutrients(data);

    } catch (error) {
      console.error(error);
    }
  };
  console.log(recipesByNutrients.length, "recipebynutrients length ")
  return (
    <div className="nutrient-search">
      <div className="filter-group">
        <label>Calories</label>
        <div className="filter-inputs">
          <input
            type="number"
            placeholder="Min"
            name="minCalories"
            value={nutrientFilters.minCalories}
            onChange={handleNutrientFilters}
          />
          <input
            type="number"
            placeholder="Max"
            name="maxCalories"
            value={nutrientFilters.maxCalories}
            onChange={handleNutrientFilters}
          />
        </div>
      </div>

      <div className="filter-group">
        <label>Protein (g)</label>
        <div className="filter-inputs">
          <input
            type="number"
            placeholder="Min"
            name="minProtein"
            value={nutrientFilters.minProtein}
            onChange={handleNutrientFilters}
          />
          <input
            type="number"
            placeholder="Max"
            name="maxProtein"
            value={nutrientFilters.maxProtein}
            onChange={handleNutrientFilters}
          />
        </div>
      </div>

      <div className="filter-group">
        <label>Carbs (g)</label>
        <div className="filter-inputs">
          <input
            type="number"
            placeholder="Min"
            name="minCarbs"
            value={nutrientFilters.minCarbs}
            onChange={handleNutrientFilters}
          />
          <input
            type="number"
            placeholder="Max"
            name="maxCarbs"
            value={nutrientFilters.maxCarbs}
            onChange={handleNutrientFilters}
          />
        </div>
      </div>

      <button className="search-btn" onClick={handleNutrientSearch}>
        Find Recipes by Nutrition
      </button>

      <div>


        <InfiniteScroll
          dataLength={recipesByNutrients.length}
          next={fetchMoreRecipes}
          hasMore={false}
          loader={recipesByNutrients.length > 0 ? (<h4>Loading...</h4>) : ""}
          endMessage={<p style={{ textAlign: "center" }}>No more recipes</p>}
        >
          {recipesByNutrients.length > 0 && (
            <div className="recipes-grid">
              {recipesByNutrients.map((recipe) => (
                <div
                  key={recipe.id}
                  className="recipe-card"
                  onClick={() => {
                    console.log("getrecipeDetails")

                    getRecipeDetails(recipe.id);
                  }}
                >
                  <div className="recipe-image">
                    <img src={recipe.image || "There is no image "} alt={recipe.title} />

                    <div className="recipe-overlay">
                      <span className="health-score">
                        Calories: {recipe.calories}
                      </span>
                      <span className="health-score">
                        Carbs : {recipe.carbs}
                      </span>
                      <span className="health-score">
                        Fat : {recipe.fat}
                      </span>
                      <span className="health-score">
                        Protein : {recipe.protein}
                      </span>

                    </div>
                  </div>

                  <div className="recipe-info">
                    <h3>{recipe.title}</h3>
                    <div className="recipe-meta">
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </InfiniteScroll>
      </div>




    </div>
  );
}

export { SearchByNutriens };
