import { Link } from "react-router-dom";
import { useState } from "react";
import { TextField, Button, Typography, MenuItem } from "@mui/material";
import API from "../api/axios";
import React from "react";

export default function Signup() {
  const [form, setForm] = useState({ 
    email: "", 
    password: "", 
    name: "", 
    role: "student" 
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/signup", form);
      
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("email", res.data.user.email);
      
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Signup failed:", err.response?.data || err.message);
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <Typography variant="h5" className="mb-4 text-center">
          Create Your Account
        </Typography>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            label="Full Name"
            name="name"
            fullWidth
            value={form.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            value={form.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            value={form.password}
            onChange={handleChange}
            required
          />
          <TextField
            select
            label="Role"
            name="role"
            fullWidth
            value={form.role}
            onChange={handleChange}
            required
          >
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="teacher">Teacher</MenuItem>
          </TextField>
          <Button
            type="submit"
            variant="contained"
            fullWidth
          >
            Sign Up
          </Button>
        </form>
        <Typography variant="body2" className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </Typography>
      </div>
    </div>
  );
} 