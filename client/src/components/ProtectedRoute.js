import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const auth = useAuth(); // ✅ Get full auth object safely
  const location = useLocation();

  if (!auth) {
    return <div>Loading auth...</div>; // Prevent crash on undefined
  }

  const { isAuthenticated, isAdmin, loading } = auth;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
