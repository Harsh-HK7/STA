import React from "react";
import { Typography, Paper } from "@mui/material";

const AuthFormWrapper = ({ title, children, subtitle }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Paper className="w-full max-w-md p-6 rounded-2xl shadow-lg">
        <Typography variant="h5" className="mb-2 text-center font-semibold">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" className="mb-6 text-center text-gray-600">
            {subtitle}
          </Typography>
        )}
        {children}
      </Paper>
    </div>
  );
};

export default AuthFormWrapper; 