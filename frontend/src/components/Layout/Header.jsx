import React, { useState, useEffect, useRef } from "react";
import { FaUser, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../services/auth";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // Cambia '/login' a la ruta de tu página de inicio de sesión
  };

  return (
    <header className="text-yellow-400 p-4 flex justify-between items-center w-full">
      <h1
        className="text-2xl font-bold cursor-pointer w-1/3"
        onClick={() => navigate("/home")}
      >
        GoldBrain
      </h1>
      <div
        className={`flex-1 mx-4 w-1/3 border rounded-lg ${
          isFocused ? "border-yellow-400" : "border-gray-300"
        } bg-gray-50`}
      >
        <input
          type="text"
          placeholder="¿Qué quieres aprender?"
          className="w-full bg-transparent px-4 py-2 rounded-full text-gray-800 focus:outline-none"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
      <div className="relative w-1/3 flex flex-row-reverse" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="flex items-center focus:outline-none text-gray-900"
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
          <div className="absolute right-0 mt-10 w-64 bg-white text-gray-800 rounded-lg shadow-lg z-10 border">
            <div className="p-4 border-b">
              <p className="font-semibold text-gray-700">
                ¡Hola, {user ? `${user.nombre} ${user.apellido}` : "Usuario"}!
              </p>
            </div>
            <div className="p-2">
              <Link
                to="/view-profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:rounded-lg"
              >
                Ver mi Perfil
              </Link>
              {user && (user.rolUsuario === 1 || user.rolUsuario === 3) && (
                <Link
                  to="/admin/add-course"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:rounded-lg"
                >
                  Crear curso
                </Link>
              )}
              <Link
                to="/my-courses"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:rounded-lg"
              >
                Mi aprendizaje
              </Link>
              <Link
                to="/advice"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:rounded-lg"
              >
                Mis asesorías
              </Link>
              <Link
                to="/help"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:rounded-lg"
              >
                Ayuda
              </Link>
              <button
                onClick={logout}
                className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-200 hover:rounded-lg hover:text-red-500"
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
