import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Layout from "./Layout/Layout";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");

  return token ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
