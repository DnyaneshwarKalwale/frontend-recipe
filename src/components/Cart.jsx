import React from "react";
import { Trash2 } from "lucide-react";
import axios from "axios";

const Cart = ({ cart, setCart }) => {
  const removeFromCart = async (recipeId) => {
    try {
      await axios.delete(`https://recipe-14fo.onrender.com/cart/${recipeId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCart(cart.filter((recipe) => recipe._id !== recipeId)); // Update local state
    } catch (err) {
      console.error("Error removing item from cart:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
      {cart.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-lg shadow">
          <p className="text-gray-500">Your cart is empty.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {cart.map((recipe) => (
              <li key={recipe._id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                <div className="flex items-center">
                  <img src={recipe.image} alt={recipe.title} className="w-16 h-16 object-cover rounded" />
                  <span className="ml-4 flex-1 text-lg font-medium">{recipe.title}</span>
                </div>
                <button
                  onClick={() => removeFromCart(recipe._id)}
                  className="ml-4 p-2 text-red-500 hover:text-red-700 focus:outline-none"
                >
                  <Trash2 className="h-6 w-6" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Cart;

