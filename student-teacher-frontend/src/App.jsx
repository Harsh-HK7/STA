import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import BookAppointment from "./pages/BookAppointment.jsx";
import ViewAppointments from "./pages/ViewAppointments.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import MyBookings from "./pages/MyBookings.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={["student", "teacher"]} />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
        <Route path="/book" element={<BookAppointment />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["teacher"]} />}>
        <Route path="/appointments" element={<ViewAppointments />} />
      </Route>

      {/* Admin Route */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>

      <Route path="/unauthorized" element={<h1>Unauthorized Access</h1>} />
    </Routes>
  );
} 