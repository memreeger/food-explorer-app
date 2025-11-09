import { useRef, useState } from "react";
import "./styles.css";
import axios from "axios";
import {
  initialRecipeDetail,
  type NutrientFiltersType,
  type RecipeByNutrients,
  type RecipeDetail,
  type Recipes as RecipesType,
} from "./types";
import SearchSection from "./search-section";
import Recipes from "./recipes";
import { constants } from "../../constants/constants";
import { spoonacularApi } from "../../services/spoonacular/endpoint";
import ReceipeDetail from "./receipeDetail";

export type SearchTypeProps = "recipes" | "nutriens";

function FoodApp() {
  const searchInputRef = useRef("");
  const [searchType, setSearchType] = useState<SearchTypeProps>("recipes");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [nutrientFilters, setNutrientFilters] = useState<NutrientFiltersType>({
    minCarbs: "",
    maxCarbs: "",
    minProtein: "",
    maxProtein: "",
    minCalories: "",
    maxCalories: "",
  });

  const [customError, setCustomError] = useState<{
    isError?: boolean;
    errorMessage?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<RecipesType>({
    results: [],
    number: 0,
    offset: 0,
    totalResults: 0,
  });




  const [recipesByNutrients, setRecipesByNutrients] = useState<RecipeByNutrients[]>([
  ])


  const [offset, setOffset] = useState(0);



  const [selectedRecipe, setSelectedRecipe] =
    useState<RecipeDetail>(initialRecipeDetail);

  const searchRecipes = async (query: string) => {
    if (query.trim() == "") return;

    setLoading(true);

    try {
      const url = // URL'in duruşunu okunaklı hale getirdim
        `${spoonacularApi.BASE_URL}` +
        `/${spoonacularApi.GET_RECIPES}` +
        `/complexSearch?apiKey=${constants.API_KEY}` +
        `&query=${encodeURIComponent(query)}` +
        `&offset=${offset}` +
        `&number=${constants.resultNumber}` +
        `&addRecipeInformation=${constants.addRecipeInformation}`;


      const response = await axios.get<RecipesType>(url); // Axios.get ile yaptım. ARAŞTIRIRKEN PARAMS DİYE BİR ŞEY GÖRDÜM ONU Bİ ANLAMAK LAZIM
      const data = response.data as RecipesType;


      setRecipes((prev) => {
        // defensive checks
        const prevResults = prev.results ?? [];

        if (offset === 0 || prevResults.length === 0) {
          return data;
        }
        console.log(data, data)
        const existingIds = new Set(prevResults.map((r) => r.id));
        const newUnique = data.results.filter((r) => !existingIds.has(r.id));

        return {
          ...data,
          results: [...prevResults, ...newUnique],
        };
      });

      const newOffset = offset + constants.resultNumber;
      setOffset(newOffset);
    } catch (error: any) {
      // any yazınca kızmıyor, unknown yazınca error kızıyor ???
      const errorMessage =
        error.response?.data?.message || "There is an error, please try again";

      setCustomError({
        isError: true,
        errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const searchByNutrients = async () => {
    setLoading(true);

    try {
      // TODO:Tum stateleri and and ekleyeceğiz
      const url =
        `${spoonacularApi.BASE_URL}`
        + `/${spoonacularApi.GET_RECIPES}`
        + `/findByNutrients?apiKey=${constants.API_KEY}`
        + `&minCarbs=${nutrientFilters.minCarbs}`
        + `&maxCarbs=${nutrientFilters.maxCarbs}`
        + `&minCalories=${nutrientFilters.minCalories}`
        + `&maxCalories=${nutrientFilters.maxCalories}`
        + `&minProtein=${nutrientFilters.minProtein}`
        + `&maxPro=${nutrientFilters.maxProtein}`
        + `&number=${constants.resultNumber}`
        ;

      const response = await axios.get<RecipeByNutrients[]>(url);
      const data = response.data;

      console.log(data, "DATA")

      setRecipesByNutrients((prev) => {
        // defensive checks
        const prevResults = prev ?? [];

        if (offset === 0 || prevResults.length === 0) {
          return data;
        }
        const existingIds = new Set(prevResults.map((r) => r.id));
        const newUnique = data.filter((r) => !existingIds.has(r.id));

        return ([...prevResults, ...newUnique])
      });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "There is an error, please try again";

      setCustomError({
        isError: true,
        errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchType === "recipes") {
      if (searchQuery === searchInputRef.current) {
        // --------------->  useRef içindeki değere bakıyoruz
        console.log("Aynı arama");
        // console.log(offset, "aynı offset")
        alert("Enter a new recipe"); // isteğe bağlı kullanıcı bilgilendirme
        return;
      } else {
        recipes.results = []; // sadece recipes'ın elemanı olan result' ın içini sıfırladım
        setOffset(0); // OFFSET'İ DE SIFIRLADIM
        // console.log(offset, "offset")
      }
      searchRecipes(searchQuery);

      searchInputRef.current = searchQuery; // -----------> arama yapıldıktan sonra değeri searchInputRef.current atıyoruz bu sayade önceki değer oluyor
    } else if (searchType === "nutriens") {
    }
  };

  if (customError.isError) {
    return (
      <div className="food-app">
        <div className="app-header">
          <div
            className="search-section"
            style={{
              color: "red",
            }}
          >
            <div>{customError.errorMessage}</div>

            <div
              style={{
                marginTop: "10px",
              }}
            >
              <button
                className="btn"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="food-app">
      <header className="app-header">
        <h1>Food Explorer</h1>
        <p>Discover amazing recipes and find food by nutrition</p>
      </header>

      <SearchSection
        searchType={searchType}
        setSearchType={setSearchType}
        handleSearch={handleSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchByNutrients={searchByNutrients}
        setNutrientFilters={setNutrientFilters}
        nutrientFilters={nutrientFilters}
        recipesByNutrients={recipesByNutrients}
        setRecipesByNutrients={setRecipesByNutrients}
        setSelectedRecipe={setSelectedRecipe}
        selectedRecipe={selectedRecipe}
        setRecipes={setRecipes}

      />

      {searchQuery && (
        <Recipes
          recipes={recipes}
          setSelectedRecipe={setSelectedRecipe}
          setOffset={setOffset}
          offset={offset}
          setRecipes={setRecipes}
          searchQuery={searchQuery}
        />
      )}


      <ReceipeDetail
        selectedRecipe={selectedRecipe}
        setSelectedRecipe={setSelectedRecipe}
        initialRecipeDetail={initialRecipeDetail}
      />
    </div>
  );
}

export default FoodApp;
