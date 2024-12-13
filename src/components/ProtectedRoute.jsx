import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ element: Component, ...props }) => {
  const token = localStorage.getItem('auth_token'); // Check if token exists in localStorage
  const user = JSON.parse(localStorage.getItem('user'))

  // If token is missing, redirect to login page
  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode the JWT token
  const userRole = decodedToken?.role; // Extract role from decoded token

  if (!user || user.role !== 'admin') {
    alert('Not authorized user')
    return <Navigate to="/" replace />;
  }

  // If token exists, render the provided component with props
  return <Outlet />;
};

export default ProtectedRoute;