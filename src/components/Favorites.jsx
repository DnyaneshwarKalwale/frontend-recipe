import React, { useEffect, useState } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import axios from "axios";

const Favorites = ({ user }) => {
  const [favorites, setFavorites] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  const fetchFavorites = async () => {
    try {
      const response = await axios.get("https://recipe-14fo.onrender.com/recipes/saved", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setFavorites(response.data);
    } catch (err) {
      console.error("Error fetching favorites:", err);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setFavorites((items) => {
        const oldIndex = items.findIndex((item) => item._id === active.id);
        const newIndex = items.findIndex((item) => item._id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const removeFavorite = async (recipeId) => {
    try {
      await axios.delete(`https://recipe-14fo.onrender.com/recipes/${recipeId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setFavorites(favorites.filter((r) => r._id !== recipeId));
    } catch (err) {
      console.error("Error removing favorite:", err);
    }
  };

  const filteredFavorites = favorites.filter((recipe) => (filter === "all" ? true : recipe.category === filter));

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Your Favorites</h2>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={filteredFavorites}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFavorites.map((recipe) => (
              <div
                key={recipe._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{recipe.title}</h3>
                  <div className="flex justify-end">
                    <button
                      onClick={() => removeFavorite(recipe._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {filteredFavorites.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No favorites found. Start adding some recipes!</p>
        </div>
      )}
    </div>
  );
};

export default Favorites;




