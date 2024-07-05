// src/components/Auth/LoginForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { login } from "../../services/auth";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await login(username, password);
      setMessage(`Welcome ${username}`);
      navigate("/");
    } catch (error) {
      setMessage("Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-white mb-6 text-yellow-500">
        GoldBrain
      </h1>
      <form onSubmit={handleLogin} className="bg-white p-6 w-80">
        <div className="mb-4">
          <label className="block text-gray-700">Correo electronico</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Contraseña</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-2 rounded"
        >
          Iniciar sesión
        </button>
        {message && <p className="mt-4 text-red-500">{message}</p>}
        <div className="mt-4 text-center">
          <a href="/forgot-password" className="text-yellow-500 underline">
            He olvidado mi contraseña
          </a>
        </div>
        <div className="mt-2 text-center text-black">
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
