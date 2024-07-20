import React from 'react';
import '../App.css';
import { Routes, Route, Navigate } from "react-router-dom";

import { getLogged } from '../utils/storage'
import mainMenu from '../pages/main-menu';
import { Login } from '../pages';
import privateMenu from '../pages/private-menu';
import MainLayout from '../layout/main-layout';

export const PrivateRoute = () => {
  return getLogged() ? <MainLayout/> : <Navigate to="/login" />
};

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route absolutePath='/login' path="/login" element={<Login />} />
    
        {/* Main Menu */}
        <Route element={<PrivateRoute />} path="/">
        {mainMenu.map((route, key) => {
          return (
              <Route
                element={route.element}
                exact={route.exact || false}
                key={key}
                path={route.path}
              />
          )
        })}
       </Route>
        {/* Akhir Main Menu */}

        {/* <Route element={<PrivateRoute />}>
          <Route path="/beranda" element={<MainPage />} />
        </Route> */}

        {/* Private Menu */}
        <Route element={<PrivateRoute />}>
        {privateMenu.map((route) => {
          return (
              <Route
                element={route.element}
                exact={route.exact || false}
                key={route.key}
                path={route.path}
              />
          )
        })}
        </Route>
      {/* Akhir Private Menu */}

      </Routes>
    </>
  );
}

export default AppRoutes;
