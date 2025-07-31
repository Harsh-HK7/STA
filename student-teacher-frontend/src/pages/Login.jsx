import { Link } from "react-router-dom";
import { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import API from "../api/axios";
import React from "react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      
      console.log('Login response:', res.data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("email", res.data.user.email);
      
      console.log('Stored in localStorage:', { 
        token: res.data.token, 
        role: res.data.user.role, 
        email: res.data.user.email 
      });

      if (res.data.user.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/dashboard";
      }
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <Typography variant="h5" className="mb-4 text-center">
          Login to Your Account
        </Typography>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            label="Email"
            name="email"
            fullWidth
            value={form.email}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            value={form.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            onSubmit={handleSubmit}
            variant="contained"
            fullWidth
          >
            Login
          </Button>
        </form>
        <Typography variant="body2" className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600">
            Sign up
          </Link>
        </Typography>
      </div>
    </div>
  );
} 