import React from "react";
import { 
  Card, 
  CardContent, 
  CardActions, 
  Typography, 
  Avatar, 
  Button, 
  Chip,
  Box 
} from "@mui/material";
import { Email, Person, Schedule } from "@mui/icons-material";

const TeacherCard = ({ 
  teacher, 
  onBookAppointment, 
  showBookButton = true,
  showStatus = false,
  status = null 
}) => {
  const { _id, name, email, specialization, availability } = teacher;

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'success';
      case 'busy':
        return 'warning';
      case 'unavailable':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-200">
      <CardContent className="flex-1">
        <Box className="flex items-center space-x-3 mb-3">
          <Avatar 
            className="bg-blue-500 text-white"
            sx={{ width: 56, height: 56 }}
          >
            {getInitials(name)}
          </Avatar>
          <Box className="flex-1">
            <Typography variant="h6" className="font-semibold">
              {name}
            </Typography>
            <Box className="flex items-center space-x-1 text-gray-600">
              <Email sx={{ fontSize: 16 }} />
              <Typography variant="body2">
                {email}
              </Typography>
            </Box>
          </Box>
        </Box>

        {specialization && (
          <Box className="mb-3">
            <Typography variant="body2" className="text-gray-600 mb-1">
              Specialization:
            </Typography>
            <Chip 
              label={specialization} 
              size="small" 
              color="primary" 
              variant="outlined"
            />
          </Box>
        )}

        {availability && (
          <Box className="mb-3">
            <Typography variant="body2" className="text-gray-600 mb-1">
              Availability:
            </Typography>
            <Box className="flex items-center space-x-1">
              <Schedule sx={{ fontSize: 16, color: 'gray' }} />
              <Typography variant="body2">
                {availability}
              </Typography>
            </Box>
          </Box>
        )}

        {showStatus && status && (
          <Box className="mt-2">
            <Chip 
              label={status} 
              color={getStatusColor(status)}
              size="small"
            />
          </Box>
        )}
      </CardContent>

      {showBookButton && onBookAppointment && (
        <CardActions className="p-4 pt-0">
          <Button
            variant="contained"
            fullWidth
            onClick={() => onBookAppointment(teacher)}
            startIcon={<Person />}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Book Appointment
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default TeacherCard; 