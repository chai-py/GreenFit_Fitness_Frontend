import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...props }) => {
  const token = localStorage.getItem('token'); // Check if token exists in localStorage

  // If token is missing, redirect to login page
  if (!token) {
    return <Navigate to="/signin" />;
  }

  // If token exists, render the provided component with props
  return <Component {...props} />;
};

export default ProtectedRoute;