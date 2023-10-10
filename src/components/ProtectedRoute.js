import React from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ path, element: ProtectedComponent }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');

  return (
    <Route 
      path={path} 
      element={token ? ProtectedComponent : <Navigate to="/login" state={{ from: location }} replace />} 
    />
  );
};

export default ProtectedRoute;
