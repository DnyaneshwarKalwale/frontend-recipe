import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import RecipeDetail from "./pages/RecipeDetail";
import Favorites from "./components/Favorites";
import Login from "./components/Login";
import Register from "./components/Register";
import Cart from "./components/Cart"; // Import Cart Component
import axios from "axios";
// import Footer from "./components/Footer";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]); // ✅ Add cart state

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Fetch user details using the token
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

  // ✅ Add to Cart function
  const addToCart = (recipe) => {
    setCart((prevCart) => [...prevCart, recipe]);
  };

  return (
    <Router>
      <Header user={user} setUser={setUser} />

      <Routes>
        <Route path="/" element={<Home user={user} addToCart={addToCart} />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/favorites" element={<Favorites user={user} addToCart={addToCart} />} /> {/* ✅ Pass addToCart */}
        <Route path="/cart" element={<Cart cart={cart} />} /> {/* ✅ Add Cart Page */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
