import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, getCurrentUser } from "../../services/auth";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      console.log("Token recibido:", response.access_token);
      localStorage.setItem("token", response.access_token);
      setMessage("Inicio de sesión exitoso");

      // Obtener datos del usuario
      const user = await getCurrentUser();
      console.log("Usuario recibido:", user);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/home"); // Redirigir a /home
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(
          `Error en el inicio de sesión: ${error.response.data.detail}`
        );
      } else {
        setMessage("Error en el inicio de sesión");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-4xl font-bold text-yellow-400 mb-6">GoldBrain</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded">
        {message && <p className="text-red-500">{message}</p>}

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="ejemplo@ejemplo.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Contraseña"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-400 text-white py-2 rounded-lg hover:bg-yellow-500"
        >
          Iniciar sesión
        </button>

        <div className="mt-4 text-center text-black">
          ¿No tienes cuenta?{" "}
          <a href="/register" className="text-yellow-500 underline">
            Regístrate
          </a>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
