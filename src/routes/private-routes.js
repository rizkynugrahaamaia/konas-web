import React from 'react';
import { Navigate } from "react-router-dom";
import { getLogged } from '../utils/storage';
import MainLayout from '../layout/main-layout';

export const PrivateRoute = ({ allowedRoles }) => {
  const isLogged = getLogged();
  
  if (!isLogged) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(isLogged?.role)) {
    return <Navigate to="/not-authorized" />; // Atau halaman lain yang sesuai
  }

  return <MainLayout />;
};