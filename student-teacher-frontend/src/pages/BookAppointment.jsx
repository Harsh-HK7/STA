import react from 'react';
import { useEffect, useState } from 'react';
import { TextField, Button, Typography, MenuItem } from '@mui/material';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { isTokenExpired } from '../utils/checkTokenValidity';

export default function BookAppointment() {
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({ teacherId: '', date: '', time: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('email');
      alert('Session expired. Please log in again.');
      navigate('/login');
      return;
    }

    setTeachers([
      { _id: '1', name: 'John Doe', email: 'john@example.com' },
      { _id: '2', name: 'Jane Smith', email: 'jane@example.com' }
    ]);
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      alert('Appointment requested! (This is a demo - no actual booking made)');
      navigate('/dashboard');
    } catch (err) {
      alert('Booking failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-lg w-full bg-white p-6 rounded-2xl shadow space-y-4">
        <Typography variant="h5" className="text-center">Book an Appointment</Typography>

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            select
            name="teacherId"
            label="Select Teacher"
            fullWidth
            value={form.teacherId}
            onChange={handleChange}
            required
          >
            {teachers.map((teacher) => (
              <MenuItem key={teacher._id} value={teacher._id}>
                {teacher.name} ({teacher.email})
              </MenuItem>
            ))}
          </TextField>

          <TextField
            name="date"
            label="Date"
            type="date"
            fullWidth
            value={form.date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
          />

          <TextField
            name="time"
            label="Time"
            type="time"
            fullWidth
            value={form.time}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
          >
            Book Appointment
          </Button>
        </form>
      </div>
    </div>
  );
} 