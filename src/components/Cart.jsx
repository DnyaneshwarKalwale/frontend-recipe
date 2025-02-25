import React from "react";

const Cart = ({ cart, onRemoveRecipe }) => {
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
            {cart.map((recipe, index) => (
              <li key={index} className="flex items-center justify-between p-4 hover:bg-gray-50">
                <div className="flex items-center">
                  <img 
                    src={recipe.image} 
                    alt={recipe.title} 
                    className="w-16 h-16 object-cover rounded"
                  />
                  <span className="ml-4 flex-1 text-lg font-medium">{recipe.title}</span>
                </div>
                <button
                  onClick={() => onRemoveRecipe(index)}
                  className="ml-4 p-2 text-red-500 hover:text-red-700 focus:outline-none"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                    />
                  </svg>
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

