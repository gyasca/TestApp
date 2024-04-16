import React from "react";
import { Routes, Route } from 'react-router-dom'

// Import blog CRUD pages
import ViewBlog from "./ViewBlog";

function BlogRoutes() {
  return (
    <Routes>
      <Route path={"/view"} element={<ViewBlog />} />
    </Routes>
  );
}

export default BlogRoutes;
