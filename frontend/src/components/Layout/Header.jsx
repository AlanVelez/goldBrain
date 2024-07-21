import React, { useState, useEffect } from "react";
import { FaUser, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../services/auth";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchUser();
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // Cambia '/login' a la ruta de tu página de inicio de sesión
  };

  return (
    <header className="bg-yellow-500 text-white p-4 flex justify-between items-center">
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/home")}
      >
        GoldBrain
      </h1>
      <div className="flex-1 mx-4">
        <input
          type="text"
          placeholder="¿Qué quieres aprender?"
          className="w-full px-4 py-2 rounded-full text-gray-800 focus:outline-none"
        />
      </div>
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center focus:outline-none"
        >
          {user && user.imgPerfilPath ? (
            <img
              src={`http://localhost:8000${user.imgPerfilPath}`}
              alt="Profile"
              className="w-8 h-8 rounded-full mr-2"
            />
          ) : (
            <FaUser className="text-2xl mr-2" />
          )}
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white text-gray-800 rounded-lg shadow-lg z-10">
            <div className="p-4 border-b">
              <p className="font-semibold">
                ¡Hola, {user ? `${user.nombre} ${user.apellido}` : "Usuario"}!
              </p>
            </div>
            <div className="p-2">
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
              >
                Ver mi Perfil
              </Link>
              <Link
                to="/learning"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
              >
                Mi aprendizaje
              </Link>
              <Link
                to="/advice"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
              >
                Mis asesorías
              </Link>
              <Link
                to="/help"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
              >
                Ayuda
              </Link>
              <button
                onClick={logout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-200"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
