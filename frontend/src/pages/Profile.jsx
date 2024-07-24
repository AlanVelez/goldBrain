import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCurrentUser } from "../services/auth";
import { FaUser } from "react-icons/fa";
import Alert from "../components/common/Alert"; // Asegúrate de importar el componente Alert

const Profile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    nombreUsuario: "",
    telefono: "",
    biografia: "",
    imgPerfilPath: null,
  });
  const [alert, setAlert] = useState({ type: "", message: "" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data);
        setFormData({
          nombre: data.nombre || "",
          apellido: data.apellido || "",
          nombreUsuario: data.nombreUsuario || "",
          telefono: data.telefono || "",
          biografia: data.biografia || "",
          imgPerfilPath: data.imgPerfilPath || null,
        });
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, imgPerfilPath: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateData = new FormData();
    updateData.append("nombre", formData.nombre || user.nombre);
    updateData.append("apellido", formData.apellido || user.apellido);
    updateData.append(
      "nombreUsuario",
      formData.nombreUsuario || user.nombreUsuario
    );
    updateData.append("telefono", formData.telefono || user.telefono);
    updateData.append("biografia", formData.biografia || user.biografia);

    if (formData.imgPerfilPath instanceof File) {
      updateData.append("imgPerfilFile", formData.imgPerfilPath);
    } else {
      updateData.append(
        "imgPerfilPath",
        formData.imgPerfilPath || user.imgPerfilPath
      );
    }

    // Debugging: print the FormData contents
    for (var pair of updateData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setAlert({
          type: "error",
          message: "No se encontró el token de autenticación.",
        });
        return;
      }

      const response = await axios.put(
        "http://localhost:8000/users/me",
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setAlert({ type: "success", message: "Perfil actualizado con éxito" });
      setUser(response.data);
    } catch (error) {
      console.error("Error al actualizar el perfil:", error.response);
      setAlert({
        type: "error",
        message:
          "Error al actualizar el perfil: " +
          JSON.stringify(error.response?.data || error.message),
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex flex-col flex-1 px-4">
        <h1 className="text-xl text-left w-full font-bold text-yellow-400 my-6">
          Editar perfil
        </h1>
        {alert.message && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert({ type: "", message: "" })}
          />
        )}
        {user && (
          <form onSubmit={handleSubmit} className="bg-white p-6 w-5/6 flex">
            <div className="w-1/3 flex flex-col items-center">
              {user.imgPerfilPath ? (
                <img
                  src={`http://localhost:8000${user.imgPerfilPath}`}
                  alt="Profile"
                  className="w-24 h-24 rounded-full mb-4"
                />
              ) : (
                <div className="w-24 h-24 bg-gray-300 rounded-full mb-4 flex items-center justify-center">
                  <FaUser className="text-xl text-gray-200" />
                </div>
              )}
              <label className="cursor-point text-blue-500 font-semibold py-2 px-4 cursor-pointer bg-blue-200 rounded-lg border border-blue-500">
                Cambiar foto de perfil
                <input
                  type="file"
                  id="imgPerfilPath"
                  name="imgPerfilPath"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
            <div className="w-2/3 pl-4">
              <div className="flex justify-between gap-3">
                <div className="mb-4 w-1/2">
                  <label htmlFor="nombre" className="block text-gray-700 mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none"
                  />
                </div>
                <div className="mb-4 w-1/2">
                  <label
                    htmlFor="apellido"
                    className="block text-gray-700 mb-2"
                  >
                    Apellido
                  </label>
                  <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="nombreUsuario"
                  className="block text-gray-700 mb-2"
                >
                  Correo electrónico
                </label>
                <input
                  type="text"
                  id="nombreUsuario"
                  name="nombreUsuario"
                  value={formData.nombreUsuario}
                  onChange={handleChange}
                  disabled
                  className="w-full px-3 py-2 border rounded focus:outline-none bg-gray-200"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="telefono" className="block text-gray-700 mb-2">
                  Teléfono
                </label>
                <input
                  type="text"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="biografia" className="block text-gray-700 mb-2">
                  Biografía
                </label>
                <textarea
                  id="biografia"
                  name="biografia"
                  value={formData.biografia}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded focus:outline-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-400 text-white py-2 rounded-lg"
              >
                Guardar cambios
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
};

export default Profile;
