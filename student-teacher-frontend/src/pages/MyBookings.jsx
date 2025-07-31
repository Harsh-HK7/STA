import React from 'react';
import { useEffect, useState } from 'react';
import { Typography, Card, CardContent, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { isTokenExpired } from '../utils/checkTokenValidity';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
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

    // Mock data for demo
    setBookings([
      {
        _id: '1',
        teacherName: 'John Doe',
        date: '2024-01-15',
        time: '10:00',
        status: 'pending'
      },
      {
        _id: '2',
        teacherName: 'Jane Smith',
        date: '2024-01-20',
        time: '14:00',
        status: 'accepted'
      }
    ]);
  }, [navigate]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted':
        return 'success';
      case 'rejected':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <Typography variant="h5" className="mb-4 text-center">My Bookings</Typography>
      <div className="space-y-4">
        {bookings.length === 0 && <Typography>No bookings yet.</Typography>}
        {bookings.map((booking) => (
          <Card key={booking._id}>
            <CardContent className="space-y-2">
              <Typography><strong>Teacher:</strong> {booking.teacherName}</Typography>
              <Typography><strong>Date:</strong> {booking.date}</Typography>
              <Typography><strong>Time:</strong> {booking.time}</Typography>
              <Chip 
                label={booking.status} 
                color={getStatusColor(booking.status)}
                size="small"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 