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
      console.log("Fetched favorites:", response.data); // Debugging
      setFavorites(response.data);
    } catch (err) {
      console.error("Error fetching favorites:", err);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
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

  const filteredFavorites = favorites.filter((recipe) => {
    if (filter === "all") return true;
    return recipe.category === filter;
  });

  return (
    <div>
      <h2>Favorites</h2>
      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="breakfast">Breakfast</option>
        <option value="lunch">Lunch</option>
        <option value="dinner">Dinner</option>
      </select>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={filteredFavorites}>
          {filteredFavorites.map((recipe) => (
            <div key={recipe._id}>
              <img src={recipe.image} alt={recipe.title} />
              <h3>{recipe.title}</h3>
              <button onClick={() => removeFavorite(recipe._id)}>Remove</button>
            </div>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default Favorites;



