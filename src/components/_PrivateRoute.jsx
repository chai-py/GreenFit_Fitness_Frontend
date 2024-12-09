import React from 'react';
import { Route, useNavigate } from 'react-router-dom';

// PrivateRoute component to protect routes in React Router v6
const PrivateRoute = ({ element: Component, ...rest }) => {
  // Check if a token exists in localStorage (you can also check for other auth mechanisms)
  const token = localStorage.getItem('auth_token');
  const navigate = useNavigate();

  // If the user is not authenticated, redirect to the signin page
  if (!token) {
    navigate('/signin');
    return null;
  }

  // If the token exists (i.e., the user is authenticated), render the component
  return <Route {...rest} element={Component} />;
};

export default PrivateRoute;