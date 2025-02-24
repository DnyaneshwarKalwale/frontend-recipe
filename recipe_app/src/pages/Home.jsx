import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";

const Home = ({ user, addToCart }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const RECIPES_PER_PAGE = 10;

  const fetchRecipes = async (query = "", page = 1) => {
    try {
      const offset = (page - 1) * RECIPES_PER_PAGE;
  
      const params = {
        number: RECIPES_PER_PAGE,
        offset: offset,
        apiKey: "a813d54d89bf418998cc50af69d35371",
      };
  
      if (query.trim()) {
        params.query = query;
      }
  
      const response = await axios.get("https://recipe-14fo.onrender.com/recipes", { params });
  
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
    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    filter === "all" ? true : recipe.category === filter
  );

  const totalPages = Math.ceil(filteredRecipes.length / RECIPES_PER_PAGE);
  const displayedRecipes = filteredRecipes.slice(
    (page - 1) * RECIPES_PER_PAGE,
    page * RECIPES_PER_PAGE
  );

  return (
    <div className="bg-gradient-to-r from-gray-100 to-gray-300 min-h-screen text-gray-900 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Recipe Finder</h1>
        <select
          className="bg-white text-gray-900 px-4 py-2 rounded-lg shadow-md outline-none"
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
        >
          <option value="all">All</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </select>
      </div>

      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-center text-red-500">Error: {error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {displayedRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            user={user}
            addToCart={addToCart}
          />
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
        <span className="text-lg font-semibold">
          Page {page} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-900 disabled:bg-gray-400"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;




