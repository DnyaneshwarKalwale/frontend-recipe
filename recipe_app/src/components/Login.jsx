import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const response = await axios.post(
        "https://recipe-14fo.onrender.com/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
  
      console.log("Login Response:", response.data);
  
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
      navigate("/");
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };
  

  return (
<div className="login-page">
  <h2>Login</h2>
  <form onSubmit={handleLogin}>
    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
    <button type="submit">Login</button>
  </form>
  {error && <p>{error}</p>}
  <p>Don't have an account? <a href="/register">Register</a></p>
</div>
  );
};

export default Login;