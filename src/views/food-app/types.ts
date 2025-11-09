

export interface Recipe {
    id: number;
    image: string;
    imageType: string;
    title: string;
    readyInMinutes: number;
    servings: number;
    sourceUrl: string;
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
    dairyFree: boolean;
    veryHealthy: boolean;
    cheap: boolean;
    veryPopular: boolean;
    sustainable: boolean;
    lowFodmap: boolean;
    weightWatcherSmartPoints: number;
    gaps: string;
    preparationMinutes: number | null;
    cookingMinutes: number | null;
    aggregateLikes: number;
    healthScore: number;
    creditsText: string;
    license: string | null;
    sourceName: string;
    pricePerServing: number;
    summary: string;
    cuisines: string[];
    dishTypes: string[];
    diets: string[];
    occasions: string[];
    spoonacularScore: number;
    spoonacularSourceUrl: string;
    nutrition?: string
}

export interface Recipes {
    number: number,
    offset: number,
    results: Recipe[] | [],
    totalResults: number,
    code?: number,
    message?: string,
    status?: "failure" | string

}



export interface RecipeByNutrients {
    // results: Recipe[] | [];
    calories: number;
    carbs: string;
    fat: string;
    id: number;
    image: string;
    imageType: string;
    protein: string;
    title: string;
    healthScore: RecipeDetail["healthScore"]
}




export interface RecipeDetail {
    id: null | number;
    title: string;
    image: string;
    imageType: string;
    servings: number;
    readyInMinutes: number;
    sourceUrl: string;
    spoonacularSourceUrl: string;
    healthScore: number;
    spoonacularScore: number;
    pricePerServing: number;
    analyzedInstructions: Instruction[];
    cheap: boolean;
    creditsText: string;
    cuisines: string[];
    dairyFree: boolean;
    diets: string[];
    dishTypes: string[];
    gaps: string;
    glutenFree: boolean;
    instructions: string;
    license: string | null;
    lowFodmap: boolean;
    occasions: string[];
    sustainable: boolean;
    vegan: boolean;
    vegetarian: boolean;
    veryHealthy: boolean;
    veryPopular: boolean;
    weightWatcherSmartPoints: number;
    summary: string;
    winePairing?: WinePairing;
    nutrition: Nutrition;
    extendedIngredients: ExtendedIngredient[];
}

interface Instruction {
    name: string;
    steps: Step[];
}

interface Step {
    number: number;
    step: string;
    ingredients: Ingredient[];
    equipment: Equipment[];
    length?: Length;
}

interface Length {
    number: number;
    unit: string;
}

interface Ingredient {
    id: number;
    name: string;
    localizedName: string;
    image: string;
}

interface Equipment {
    id: number;
    name: string;
    localizedName: string;
    image: string;
}

interface ExtendedIngredient {
    id: number;
    aisle: string;
    image: string;
    consistency: string;
    name: string;
    nameClean: string;
    original: string;
    originalName: string;
    amount: number;
    unit: string;
    meta: string[];
    measures: {
        us: Measure;
        metric: Measure;
    };
    nutrients: Nutrient[];
}

interface Measure {
    amount: number;
    unitShort: string;
    unitLong: string;
}

interface Nutrition {
    nutrients: Nutrient[];
    properties: Property[];
    flavonoids: Flavonoid[];
    ingredients: IngredientNutrition[];
    caloricBreakdown: CaloricBreakdown;
    weightPerServing: WeightPerServing;
}

interface Nutrient {
    name: string;
    amount: number;
    unit: string;
    percentOfDailyNeeds: number;
}

interface Property {
    name: string;
    amount: number;
    unit: string;
}

interface Flavonoid {
    name: string;
    amount: number;
    unit: string;
}

interface IngredientNutrition {
    id: number;
    name: string;
    amount: number;
    unit: string;
    nutrients: Nutrient[];
}

interface CaloricBreakdown {
    percentProtein: number;
    percentFat: number;
    percentCarbs: number;
}

interface WeightPerServing {
    amount: number;
    unit: string;
}

interface WinePairing {
    pairedWines: string[];
    pairingText: string;
    productMatches: ProductMatch[];
}

interface ProductMatch {
    id: number;
    title: string;
    description: string;
    price: string;
    imageUrl: string;
    averageRating: number;
    ratingCount: number;
    score: number;
    link: string;
}

export const initialRecipeDetail: RecipeDetail = {
    id: null,
    title: "",
    image: "",
    imageType: "",
    servings: 0,
    readyInMinutes: 0,
    sourceUrl: "",
    spoonacularSourceUrl: "",
    healthScore: 0,
    spoonacularScore: 0,
    pricePerServing: 0,
    analyzedInstructions: [],
    cheap: false,
    creditsText: "",
    cuisines: [],
    dairyFree: false,
    diets: [],
    dishTypes: [],
    gaps: "",
    glutenFree: false,
    instructions: "",
    license: null,
    lowFodmap: false,
    occasions: [],
    sustainable: false,
    vegan: false,
    vegetarian: false,
    veryHealthy: false,
    veryPopular: false,
    weightWatcherSmartPoints: 0,
    summary: "",
    nutrition: {
        nutrients: [],
        properties: [],
        flavonoids: [],
        ingredients: [],
        caloricBreakdown: {
            percentProtein: 0,
            percentFat: 0,
            percentCarbs: 0
        },
        weightPerServing: {
            amount: 0,
            unit: ""
        }
    },
    extendedIngredients: []
};



export interface NutrientFiltersType { // değer gelmezse undefined gitsin diye yazdım
    minCarbs: string | undefined;
    maxCarbs: string | undefined;
    minProtein: string | undefined;
    minCalories: string | undefined;
    maxCalories: string | undefined;
    maxProtein: string | undefined;
}

export interface SearchByNutriensProps {
    searchByNutrients: () => void
}
