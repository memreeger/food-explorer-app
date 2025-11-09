import { type Dispatch, type FormEvent, type SetStateAction } from "react";
import type { SearchTypeProps } from ".";
import SearchTypeRecipes from "./searchTypeRecipes";
import { SearchByNutriens } from "./search-by-nutriens";
import type { NutrientFiltersType, RecipeByNutrients, Recipe as RecipeDetail, Recipes, } from "./types";

interface SearchSectionProps {
  searchType: SearchTypeProps;
  setSearchType: Dispatch<SetStateAction<SearchTypeProps>>;
  handleSearch: (e: FormEvent) => void;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  searchByNutrients: () => void
  setNutrientFilters: Dispatch<SetStateAction<NutrientFiltersType>>;
  nutrientFilters: NutrientFiltersType
  recipesByNutrients: RecipeByNutrients[]
  setRecipesByNutrients: Dispatch<React.SetStateAction<RecipeByNutrients[]>>
  // getRecipeDetails: (id: number) => Promise<void>
  setSelectedRecipe: Dispatch<React.SetStateAction<RecipeDetail>>
  selectedRecipe: RecipeDetail
  setRecipes: React.Dispatch<React.SetStateAction<Recipes>>
}

function SearchSection({
  searchType,
  setSearchType,
  handleSearch,
  searchQuery,
  setSearchQuery,
  searchByNutrients,
  setNutrientFilters,
  nutrientFilters,
  recipesByNutrients,
  setRecipesByNutrients,
  // getRecipeDetails
  setSelectedRecipe,
  selectedRecipe,
  setRecipes,

}: SearchSectionProps) {
  return (
    <div className="search-section">
      <div className="search-tabs">
        <button
          className={`tab ${searchType === "recipes" ? "active" : ""}`}
          onClick={() => {
            setSearchType("recipes");
          }}
        >
          Search Recipes
        </button>
        <button
          onClick={() => {
            setSearchType("nutriens");
          }}
          className={`tab ${searchType === "nutriens" ? "active" : ""}`}
        >
          Search by Nutrients
        </button>
      </div>

      {/* TODO: Component olacak  */}
      {
        /**
         * handleSearch
         * setSearchQuery
         * searchType
         * searchQuery
         */
        // SearchTypeRecipes adında bir component oluşturdum
        // TODO: SearchTypeNutrients olarak bir componen daha yazacağız okuması kolay oluyor
      }

      {searchType === "recipes" ? (
        <SearchTypeRecipes
          handleSearch={handleSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      ) : (

        <SearchByNutriens
          setNutrientFilters={setNutrientFilters}
          nutrientFilters={nutrientFilters}
          searchByNutrients={searchByNutrients}
          recipesByNutrients={recipesByNutrients}
          setRecipesByNutrients={setRecipesByNutrients}
          // getRecipeDetails={getRecipeDetails}
          setSelectedRecipe={setSelectedRecipe}
          selectedRecipe={selectedRecipe}
          setRecipes={setRecipes}



        />
      )}
    </div>
  );
}

export default SearchSection;

// {/* <form onSubmit={handleSearch} className="search-form">
//   <div className="search-input-group">
//     <input
//       value={searchQuery}
//       onChange={(e) => {
//         setSearchQuery(e.target.value);
//       }}
//       type="text"
//       placeholder="Search for recipes (e.g., pasta, chicken, vegetarian)..."
//       className="search-input"
//     />

//     <button className="search-btn" type="submit">
//       Search
//     </button>
//   </div>
// </form> */}
