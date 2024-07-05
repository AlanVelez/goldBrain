// src/components/Layout/Header.jsx
import React, { useState } from "react";
import { FaUser, FaChevronDown, FaChevronUp } from "react-icons/fa";

const username = "Usuario"; // Este sería dinámico en una aplicación real

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-yellow-500 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">GoldBrain</h1>
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
          <FaUser className="text-2xl mr-2" />
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white text-gray-800 rounded-lg shadow-lg z-10">
            <div className="p-4 border-b">
              <p className="font-semibold">¡Hola, {username}!</p>
            </div>
            <div className="p-2">
              <a
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
              >
                Ver mi Perfil
              </a>
              <a
                href="/learning"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
              >
                Mi aprendizaje
              </a>
              <a
                href="/advice"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
              >
                Mis asesorías
              </a>
              <a
                href="/help"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
              >
                Ayuda
              </a>
              <a
                href="/logout"
                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-200"
              >
                Cerrar sesión
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
