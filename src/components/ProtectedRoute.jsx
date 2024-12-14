import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem('auth_token'); // Check if token exists in localStorage
  const user = JSON.parse(localStorage.getItem('user'))

  // If token is missing, redirect to login page
  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode the JWT token
  const userRole = decodedToken?.role; // Extract role from decoded token

  if (adminOnly && (!user || user.role !== 'admin')) {
    return <Navigate to="/" replace />;;
  }

  // If token exists, render the provided component with props
  return children;
};

export default ProtectedRoute;