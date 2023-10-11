// Importing necessary libraries and components
import React from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom';

// Defining the ProtectedRoute component
const ProtectedRoute = ({ path, element: ProtectedComponent }) => {
  // Using useLocation hook to get the current location
  const location = useLocation();
  // Getting the token from local storage
  const token = localStorage.getItem('token');

  // Rendering the ProtectedRoute component
  // If the user is logged in (i.e., there is a token in local storage), render the ProtectedComponent
  // Otherwise, redirect the user to the login page
  return (
    <Route 
      path={path} 
      element={token ? ProtectedComponent : <Navigate to="/login" state={{ from: location }} replace />} 
    />
  );
};

// Exporting the ProtectedRoute component to be used in other parts of the app
export default ProtectedRoute;
