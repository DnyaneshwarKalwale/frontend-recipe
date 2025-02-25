import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";

const Home = ({ user, addToCart }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const RECIPES_PER_PAGE = 15;

  const fetchRecipes = async (page) => {
    try {
      const offset = (page - 1) * RECIPES_PER_PAGE;

      const response = await axios.get("https://recipe-14fo.onrender.com/recipes", {
        params: {
          number: RECIPES_PER_PAGE,
          offset: offset,
          apiKey: "a813d54d89bf418998cc50af69d35371",
        },
      });

      if (Array.isArray(response.data)) {
        setRecipes(response.data);
      } else {
        setError("Invalid data format received from the API");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes(page);
  }, [page]);

  return (
    <div className="bg-gradient-to-r from-gray-100 to-gray-300 min-h-screen text-gray-900 p-6">
      <h1 className="text-3xl font-bold mb-6">Recipes</h1>

      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-center text-red-500">Error: {error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} user={user} addToCart={addToCart} />
        ))}
      </div>

      <div className="flex justify-center items-center mt-8 gap-4">
        <button
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-900 disabled:bg-gray-400"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="text-lg font-semibold">Page {page}</span>
        <button
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-900 disabled:bg-gray-400"
          onClick={() => setPage(page + 1)}
          disabled={recipes.length < RECIPES_PER_PAGE}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;




