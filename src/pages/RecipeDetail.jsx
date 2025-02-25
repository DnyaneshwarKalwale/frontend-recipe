import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faUser, faFire, faStar } from "@fortawesome/free-solid-svg-icons";

const API_KEY = "a813d54d89bf418998cc50af69d35371"; // Replace with your Spoonacular API key

function RecipeDetail() {
  const { id } = useParams(); // Get the recipe ID from the URL
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&includeNutrition=true`
        );

        setRecipe(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-10">Error: {error}</div>;

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Recipe Hero Section */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
          <div className="flex space-x-4 text-gray-600 mb-4">
            <span><FontAwesomeIcon icon={faClock} /> {recipe.readyInMinutes} min</span>
            <span><FontAwesomeIcon icon={faUser} /> {recipe.servings} servings</span>
            <span><FontAwesomeIcon icon={faFire} /> {recipe.dishTypes?.[0] || "Unknown"}</span>
            <span><FontAwesomeIcon icon={faStar} /> {Math.round(recipe.spoonacularScore / 20) || "N/A"}/5</span>
          </div>
        </div>
      </div>

      {/* Ingredients Section */}
      <div className="max-w-4xl mx-auto mt-6 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
        <ul className="list-disc pl-6">
          {recipe.extendedIngredients?.map((ingredient) => (
            <li key={ingredient.id} className="mb-2">{ingredient.original}</li>
          )) || <p>No ingredients available.</p>}
        </ul>
      </div>

      {/* Instructions Section */}
      <div className="max-w-4xl mx-auto mt-6 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Instructions</h2>
        <div className="prose" dangerouslySetInnerHTML={{ __html: recipe.instructions || "No instructions provided." }}></div>
      </div>

      {/* Nutrition Section */}
      {recipe.nutrition && (
        <div className="max-w-4xl mx-auto mt-6 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Nutrition</h2>
          <ul>
            {recipe.nutrition.nutrients?.slice(0, 5).map((nutrient) => (
              <li key={nutrient.name} className="mb-2">{nutrient.name}: {nutrient.amount} {nutrient.unit}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RecipeDetail;