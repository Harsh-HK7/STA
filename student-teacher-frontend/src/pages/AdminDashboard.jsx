import React from 'react';
import { Typography, Card, CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const email = localStorage.getItem('email');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Typography variant="h4" className="font-bold">
            Admin Dashboard - Welcome, {email}!
          </Typography>
          <Button variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardContent>
              <Typography variant="h6">User Management</Typography>
              <Typography variant="body2" className="mb-4">
                Manage all users in the system
              </Typography>
              <Button 
                variant="contained" 
                fullWidth
              >
                Manage Users
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6">System Statistics</Typography>
              <Typography variant="body2" className="mb-4">
                View system analytics and reports
              </Typography>
              <Button 
                variant="outlined" 
                fullWidth
              >
                View Reports
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6">Settings</Typography>
              <Typography variant="body2" className="mb-4">
                Configure system settings
              </Typography>
              <Button 
                variant="outlined" 
                fullWidth
              >
                System Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 