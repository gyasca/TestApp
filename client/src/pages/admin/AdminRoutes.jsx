import React from "react";
import { Routes, Route } from 'react-router-dom'
import AdminPanelLanding from "./AdminPanelLanding";

function AdminRoutes() {
  return (
    <Routes>
      <Route path={"/panel"} element={<AdminPanelLanding />} />
    </Routes>
  );
}

export default AdminRoutes;
