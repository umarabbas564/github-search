import React from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ListView from "../views/ListView";

const routes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout children={<Outlet />} />}>
          <Route path="/" element={<Navigate to="/list" />} />
          <Route path="/list" element={<ListView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default routes;
