// src/pages/Home.jsx
import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();

  const logoutAndRedirect = () => {
    handleLogout();
    navigate("/login"); // Redirige al login después de cerrar sesión
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">Welcome, {user?.email}</h1>
      <button
        onClick={logoutAndRedirect}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
