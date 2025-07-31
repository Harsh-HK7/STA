import React from 'react';
import { Typography, Button, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const email = localStorage.getItem('email');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <Typography variant="h4" className="font-bold">
              Welcome, {email}!
            </Typography>
            <Typography variant="body2" className="text-gray-600">
              Role: {role} | Session: Active
            </Typography>
          </div>
          <Button variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {role === 'student' && (
            <>
              <Card>
                <CardContent>
                  <Typography variant="h6">Book Appointment</Typography>
                  <Typography variant="body2" className="mb-4">
                    Schedule a session with a teacher
                  </Typography>
                  <Button 
                    variant="contained" 
                    onClick={() => navigate('/book')}
                    fullWidth
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography variant="h6">My Bookings</Typography>
                  <Typography variant="body2" className="mb-4">
                    View your scheduled appointments
                  </Typography>
                  <Button 
                    variant="outlined" 
                    onClick={() => navigate('/my-bookings')}
                    fullWidth
                  >
                    View Bookings
                  </Button>
                </CardContent>
              </Card>
            </>
          )}

          {role === 'teacher' && (
            <Card>
              <CardContent>
                <Typography variant="h6">Appointments</Typography>
                <Typography variant="body2" className="mb-4">
                  Manage appointment requests
                </Typography>
                <Button 
                  variant="contained" 
                  onClick={() => navigate('/appointments')}
                  fullWidth
                >
                  View Requests
                </Button>
              </CardContent>
            </Card>
          )}

          {role === 'admin' && (
            <Card>
              <CardContent>
                <Typography variant="h6">Admin Panel</Typography>
                <Typography variant="body2" className="mb-4">
                  Manage users and system settings
                </Typography>
                <Button 
                  variant="contained" 
                  onClick={() => navigate('/admin')}
                  fullWidth
                >
                  Admin Dashboard
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
} 