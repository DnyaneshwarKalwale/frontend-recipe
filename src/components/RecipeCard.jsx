import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";

const RecipeCard = ({ recipe, user, addToCart, favorites, setFavorit }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (user) {
      checkIfRecipeIsSaved();
    }
  }, [user, recipe.id]);

  const checkIfRecipeIsSaved = async () => {
    try {
      const response = await axios.get(
        // `https://recipe-14fo.onrender.com/recipes/check-saved/${recipe.id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setIsSaved(response.data.isSaved);
    } catch (err) {
      console.error("Error checking if recipe is saved:", err);
    }
  };

  const handleSaveRecipe = async () => {
    if (!user) {
      alert("You must be logged in to save recipes!");
      return;
    }

    setIsSaving(true);
    setErrorMessage("");

    try {
      const response = await axios.post(
        "https://recipe-14fo.onrender.com/recipes/save",
        {
          recipeId: recipe.id,
          title: recipe.title,
          image: recipe.image,
          category: recipe.category || "lunch",
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setIsSaved(true);

    } catch (err) {
      console.error("Error saving recipe:", err);
      setErrorMessage("Failed to save recipe. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemoveRecipe = async () => {
    try {
      await axios.delete(
        `https://recipe-14fo.onrender.com/recipes/${recipe.id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setFavorit(favorites.filter((r) => r._id !== recipe.id));
      setIsSaved(false);
    } catch (err) {
      console.error("Error removing favorite:", err);
    }
  };

  return (
    <div className="recipe-card">
      <div className="recipe-image">
        <Link to={`/recipe/${recipe.id}`}>
          <img src={recipe.image} alt={recipe.title} />
        </Link>
        {user && (
          <div className="heart-icon" onClick={isSaved ? handleRemoveRecipe : handleSaveRecipe}>
            <FontAwesomeIcon
              icon={isSaved ? solidHeart : regularHeart}
              style={{ color: isSaved ? "red" : "white", cursor: "pointer" }}
              aria-label={isSaved ? "Remove from Likes" : "Add to Likes"}
            />
          </div>
        )}
      </div>
      <div className="recipe-content">
        <div className="recipe-title">
          <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
        </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 hover:bg-blue-700"
          onClick={() => addToCart(recipe)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;

