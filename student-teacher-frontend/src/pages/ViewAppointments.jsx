import React from 'react';
import { useEffect, useState } from 'react';
import { Button, Typography, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { isTokenExpired } from '../utils/checkTokenValidity';

export default function ViewAppointments() {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  const fetchAppointments = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await API.get('/appointments/teacher', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(res.data);
    } catch (err) {
      console.error('Failed to fetch appointments:', err);
      setAppointments([
        {
          _id: '1',
          studentEmail: 'student@example.com',
          date: '2024-01-15',
          time: '10:00',
          status: 'pending'
        }
      ]);
    }
  };

  const handleAction = async (id, status) => {
    const token = localStorage.getItem('token');
    try {
      await API.put(`/appointments/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAppointments();
    } catch (err) {
      console.error('Failed to update appointment:', err);
      alert('Failed to update appointment status');
    }
  };

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
    
    fetchAppointments();
  }, [navigate]);

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <Typography variant="h5" className="mb-4 text-center">Appointment Requests</Typography>
      <div className="space-y-4">
        {appointments.length === 0 && <Typography>No appointments yet.</Typography>}
        {appointments.map((appt) => (
          <Card key={appt._id}>
            <CardContent className="space-y-2">
              <Typography><strong>Student:</strong> {appt.studentEmail}</Typography>
              <Typography><strong>Date:</strong> {appt.date}</Typography>
              <Typography><strong>Time:</strong> {appt.time}</Typography>
              <Typography><strong>Status:</strong> {appt.status}</Typography>

              {appt.status === 'pending' && (
                <div className="flex gap-2">
                  <Button variant="contained" onClick={() => handleAction(appt._id, 'accepted')}>Accept</Button>
                  <Button variant="outlined" color="error" onClick={() => handleAction(appt._id, 'rejected')}>Reject</Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 