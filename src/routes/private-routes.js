import React from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { getLogged } from '../utils/storage';
import MainLayout from '../mainlayout/main-layout';

export const PrivateRoute = ({ allowedRoles }) => {
  const isLogged = getLogged();
  const location = useLocation();
  
  if (!isLogged || !isLogged.token) {
    // Redirect ke login dengan menyimpan intended location
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(isLogged?.role)) {
    return <Navigate to="/not-authorized" replace />; 
  }

  return <MainLayout />;
};