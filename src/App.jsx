import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import RecipeDetail from "./pages/RecipeDetail";
import Favorites from "./components/Favorites";
import Login from "./components/Login";
import Register from "./components/Register";
import Cart from "./components/Cart"; 
import axios from "axios";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserDetails();
    }
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get("/api/auth/me", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUser(response.data.user);
    } catch (err) {
      console.error("Error fetching user details:", err);
    }
  };

  const addToCart = (recipe) => {
    setCart((prevCart) => [...prevCart, recipe]);
  };

  return (
    <Router>
        <Header user={user} setUser={setUser} setSearchResults={setSearchResults} />

      <Routes>
        <Route path="/" element={<Home user={user} addToCart={addToCart} />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/favorites" element={<Favorites user={user} addToCart={addToCart} />} /> 
        <Route path="/cart" element={<Cart cart={cart} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
