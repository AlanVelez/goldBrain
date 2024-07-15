import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const RoleBasedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || !user || !allowedRoles.includes(user.rolUsuario)) {
    return <Navigate to="/home" />;
  }

  return <Outlet />;
};

export default RoleBasedRoute;
