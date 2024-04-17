import React from "react";
import { Routes, Route } from 'react-router-dom'
import AdminPanelLanding from "./AdminPanelLanding";
import ViewEmployees from "./ViewEmployees";
import EditEmployee from "./EditEmployee";

function AdminRoutes() {
  return (
    <Routes>
      <Route path={"/panel"} element={<AdminPanelLanding />} />
      <Route path={"/employees"} element={<ViewEmployees />} />
      <Route path={"/employees/edit/:id"} element={<EditEmployee />} />
    </Routes>
  );
}

export default AdminRoutes;
