import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // User state to track the logged-in user
  const [loading, setLoading] = useState(true);  // State to track loading of user session
  const [error, setError] = useState(null);  // State for error handling

  // Check for existing user session when the app loads (e.g., by checking a cookie or localStorage)
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const res = await axios.get('http://localhost:4000/auth/check-session', { withCredentials: true });
        if (res.data.user) {
          setUser(res.data.user);  // If session is valid, set the user
        }
      } catch (error) {
        setError(error.response ? error.response.data : 'Failed to check session');
      } finally {
        setLoading(false);  // Session check is done, set loading to false
      }
    };

    checkUserSession();
  }, []);

  // Login function to update user state
  const login = (userInfo) => {
    setUser(userInfo);
  };

  // Logout function to clear user state
  const logout = () => {
    setUser(null);
  };

  // Provide user, loading, error, and the login/logout functions to children components
  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};