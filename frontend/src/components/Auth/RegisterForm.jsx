import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function RegisterForm() {
  const [formData, setFormData] = useState({
    correo: "",
    password: "",
    confirmPassword: "",
    nombre: "",
    apellido: "",
    nombreUsuario: "", // Este campo ya no es necesario
    genero: "",
    telefono: "",
    fechaNacimiento: "",
    biografia: "",
    imgPerfilPath: "",
    rolUsuario: 2,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      ...(name === "correo" ? { nombreUsuario: value } : {}), // Asignar correo a nombreUsuario automáticamente
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage("Las contraseñas no coinciden");
      return;
    }

    const userData = { ...formData };
    delete userData.confirmPassword;

    if (userData.biografia === "") userData.biografia = null;
    if (userData.imgPerfilPath === "") userData.imgPerfilPath = null;
    if (userData.rolUsuario === "") userData.rolUsuario = null;

    try {
      await register(userData);
      setMessage("Usuario registrado con éxito");
      navigate("/");
    } catch (error) {
      setMessage("Error en el registro: " + error.response.data.detail);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-4xl font-bold text-yellow-400 mb-6">GoldBrain</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded w-2/3 lg:w-1/2"
      >
        {message && <p className="text-red-500">{message}</p>}

        <div className="flex space-x-4 mb-4">
          <div className="w-1/2">
            <label htmlFor="nombre" className="block text-gray-700 mb-2">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Nombre"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400"
              value={formData.nombre}
              onChange={handleChange}
              required
              pattern="[A-Za-z\s]+"
              title="El nombre solo debe contener letras y espacios"
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="apellido" className="block text-gray-700 mb-2">
              Apellido
            </label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              placeholder="Apellido"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400"
              value={formData.apellido}
              onChange={handleChange}
              required
              pattern="[A-Za-z\s]+"
              title="El apellido solo debe contener letras y espacios"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="correo" className="block text-gray-700 mb-2">
            Correo
          </label>
          <input
            type="email"
            id="correo"
            name="correo"
            placeholder="ejemplo@ejemplo.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400"
            value={formData.correo}
            onChange={handleChange}
            required
            title="Por favor ingrese un correo válido"
          />
        </div>

        <div className="flex space-x-4 mb-4">
          <div className="w-1/2">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Contraseña"
                className="relative w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="8"
                title="La contraseña debe tener al menos 8 caracteres"
              />
              <button
                type="button"
                className="absolute inset-y-1/2 right-0 pr-3 flex items-center text-gray-700"
                onClick={toggleShowPassword}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div className="w-1/2">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 mb-2"
            >
              Confirmar Contraseña
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirmar Contraseña"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength="8"
                title="La confirmación de la contraseña debe tener al menos 8 caracteres"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700"
                onClick={toggleShowConfirmPassword}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
        </div>

        <div className="flex space-x-4 mb-4">
          <div className="w-1/2">
            <label htmlFor="genero" className="block text-gray-700 mb-2">
              Género
            </label>
            <select
              id="genero"
              name="genero"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400"
              value={formData.genero}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione su género</option>
              <option value="1">Masculino</option>
              <option value="2">Femenino</option>
              <option value="3">Otro</option>
            </select>
          </div>
          <div className="w-1/2">
            <label
              htmlFor="fechaNacimiento"
              className="block text-gray-700 mb-2"
            >
              Fecha de Nacimiento
            </label>
            <input
              type="date"
              id="fechaNacimiento"
              name="fechaNacimiento"
              placeholder="Fecha de Nacimiento"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="telefono" className="block text-gray-700 mb-2">
            Teléfono
          </label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            placeholder="Teléfono"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400"
            value={formData.telefono}
            onChange={handleChange}
            required
            pattern="[0-9]{10}"
            title="El teléfono debe tener 10 dígitos"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-400 text-white py-2 rounded-lg hover:bg-yellow-500"
        >
          Registrarme
        </button>

        <div className="mt-4 text-center text-black">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="text-yellow-500 underline">
            Iniciar sesión
          </a>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
