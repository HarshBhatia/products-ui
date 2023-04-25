import React, { useState } from "react";
import axios from "axios";
import './Register.css';
import { useNavigate, NavLink } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/auth/register`, { name, email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", response.data.email);
      return navigate("/tasks");
    } catch (err) {
      alert("Email already exists");
      console.error(err);
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className="register-form">
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <p>Already Registered? <NavLink to={`/login`}>Login</NavLink></p>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
