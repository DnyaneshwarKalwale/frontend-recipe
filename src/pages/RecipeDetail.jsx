import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faUser, faFire, faStar } from "@fortawesome/free-solid-svg-icons";
// import "./RecipeDetail.css";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(`https://recipe-14fo.onrender.com/recipes_detail/${id}`);
        console.log("Recipe Data:", response.data);
        setRecipe(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err.response?.data || err.message);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchRecipeDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="recipe-detail">
      <div className="recipe-hero">
        <img src={recipe.image} alt={recipe.title} />
        <div className="recipe-hero-content">
          <h1>{recipe.title}</h1>
          <div className="recipe-meta">
            <span><FontAwesomeIcon icon={faClock} /> {recipe.readyInMinutes} min</span>
            <span><FontAwesomeIcon icon={faUser} /> {recipe.servings} servings</span>
            <span><FontAwesomeIcon icon={faFire} /> {recipe.dishTypes?.[0] || "Unknown"}</span>
            <span><FontAwesomeIcon icon={faStar} /> {Math.round(recipe.spoonacularScore / 20) || "N/A"}/5</span>
          </div>
        </div>
      </div>

      <div className="recipe-section">
        <h2>Ingredients</h2>
        <ul>
          {recipe.extendedIngredients?.map((ingredient) => (
            <li key={ingredient.id}>{ingredient.original}</li>
          )) || <p>No ingredients available.</p>}
        </ul>
      </div>

      <div className="recipe-section">
        <h2>Instructions</h2>
        <div className="recipe-instructions" dangerouslySetInnerHTML={{ __html: recipe.instructions || "No instructions provided." }}></div>
      </div>

      {recipe.nutrition && (
        <div className="recipe-section">
          <h2>Nutrition</h2>
          <ul>
            {recipe.nutrition.nutrients?.slice(0, 5).map((nutrient) => (
              <li key={nutrient.name}>{nutrient.name}: {nutrient.amount} {nutrient.unit}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RecipeDetail;