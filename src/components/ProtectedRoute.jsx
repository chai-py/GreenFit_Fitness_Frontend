import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...props }) => {
  const token = localStorage.getItem('auth_token'); // Check if token exists in localStorage

  // If token is missing, redirect to login page
  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  // If token exists, render the provided component with props
  return <Outlet />;
};

export default ProtectedRoute;