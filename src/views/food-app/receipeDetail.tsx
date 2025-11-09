import React, { type Dispatch } from "react";
import { type RecipeDetail } from "./types";


interface ReceipeDetailProps {
    selectedRecipe: RecipeDetail;
    setSelectedRecipe: Dispatch<React.SetStateAction<RecipeDetail>>
    initialRecipeDetail: RecipeDetail
}

function ReceipeDetail({
    selectedRecipe,
    setSelectedRecipe,
    initialRecipeDetail
}: ReceipeDetailProps) {
    return (
        !!selectedRecipe.id && (
            <div
                className="modal-overlay"
                onClick={() => {
                    setSelectedRecipe(initialRecipeDetail);
                }}
            >
                <div
                    className="modal-content"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <button
                        className="close-btn"
                        onClick={() => {
                            setSelectedRecipe(initialRecipeDetail);
                        }}
                    >
                        x
                    </button>
                    <div className="recipe-detail">
                        <div className="detail-header">
                            <img src={selectedRecipe.image} alt={selectedRecipe.title} />
                            <h2>{selectedRecipe.title}</h2>
                        </div>

                        <div className="detail-info">
                            <div className="detail-meta">
                                <span>{selectedRecipe.readyInMinutes} min </span>
                                <span>{selectedRecipe.servings} servings | N/A</span>
                                <span>{selectedRecipe.spoonacularScore.toFixed(2)}/100</span>
                            </div>

                            <div className="detail-content">
                                <div
                                    className="ingredients-section"
                                    style={{
                                        marginTop: "10px",
                                        gridColumn: "span 2",
                                    }}
                                >
                                    <h3>Ingredients</h3>
                                    <ul>
                                        {selectedRecipe.extendedIngredients?.map(
                                            (ingredient, index) => (
                                                <li key={index}>
                                                    {ingredient.amount} {ingredient.unit}{" "}
                                                    {ingredient.name}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>

                                <div className="instructions-section">
                                    <h3>Instructions</h3>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                selectedRecipe.instructions ||
                                                "No instructions available.",
                                        }}
                                    />
                                </div>
                            </div>

                            {selectedRecipe.nutrition && (
                                <div className="nutrition-section">
                                    <h3>Nutrition Facts</h3>
                                    <div
                                        className="nutrition-grid"
                                        style={{
                                            gridColumn: "span 2",
                                        }}
                                    >
                                        {selectedRecipe.nutrition.nutrients
                                            .slice(0, 8)
                                            .map((nutrient, index) => (
                                                <div key={index} className="nutrition-item">
                                                    <span className="nutrient-name">
                                                        {nutrient.name}
                                                    </span>
                                                    <span className="nutrient-amount">
                                                        {Math.round(nutrient.amount)} {nutrient.unit}
                                                    </span>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        )
    )
}

export default ReceipeDetail