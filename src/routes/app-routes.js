import React from 'react';
import '../App.css';
import { Routes, Route, Navigate } from "react-router-dom";

import mainMenu from '../allpages/main-menu';
import { Login } from '../allpages';
import privateMenu from '../allpages/private-menu';
import { PrivateRoute } from './private-routes';

function AppRoutes() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
    
        {/* Main Menu */}
      {/* Main Menu */}
      <Route element={<PrivateRoute />} path="/">
        {mainMenu.map((route, key) => (
          <Route
            element={route.element}
            exact={route.exact || false}
            key={key}
            path={route.path}
          />
        ))}
      </Route>
        {/* Akhir Main Menu */}

        {/* Private Menu */}
        <Route element={<PrivateRoute />}>
        {privateMenu.map((route) => (
          <Route
            element={route.element}
            exact={route.exact || false}
            key={route.key}
            path={route.path}
          />
        ))}
      </Route>
      {/* Akhir Private Menu */}

      {/* Catch all route - redirect to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </>
  );
}

export default AppRoutes;
