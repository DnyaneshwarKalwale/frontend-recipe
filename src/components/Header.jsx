import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ShoppingCart } from "lucide-react"; // Importing cart icon

const Header = ({ user, setUser }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://recipe-14fo.onrender.com/recipes/search?query=${searchQuery}`
      );
      console.log(response.data);
    } catch (err) {
      console.error("Error searching recipes:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const handleCartClick = () => {
    if (!user) {
      navigate("/login"); // Redirect to login if user is not logged in
    } else {
      navigate("/cart"); // Redirect to cart if user is logged in
    }
  };

  return (
    <header className="bg-black text-white px-6 py-4 shadow-md flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold hover:text-gray-400 transition">
        Recipe App
      </Link>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex items-center bg-gray-800 rounded-lg overflow-hidden">
        <input
          type="text"
          className="px-4 py-2 w-64 bg-gray-800 text-white placeholder-gray-400 outline-none"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="bg-gray-600 px-4 py-2 text-white hover:bg-gray-500 transition">
          Search
        </button>
      </form>

      {/* Cart + User Section */}
      <div className="flex items-center gap-6">
        {/* Cart Icon - Always Visible */}
        <button onClick={handleCartClick} className="hover:text-gray-400 transition">
          <ShoppingCart size={28} />
        </button>

        {user ? (
          <div className="flex items-center gap-4">
            {/* User Avatar */}
            <div className="w-10 h-10 bg-gray-700 text-white flex items-center justify-center rounded-full text-lg font-bold">
              {user.username.charAt(0).toUpperCase()}
            </div>
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            {/* Login & Register Buttons */}
            <Link to="/login" className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition">
              Login
            </Link>
            <Link to="/register" className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-400 transition">
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;



