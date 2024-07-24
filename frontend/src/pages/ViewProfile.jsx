import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCurrentUser } from "../services/auth";
import { FaUser } from "react-icons/fa";
import Alert from "../components/common/Alert"; // Asegúrate de importar el componente Alert
import { Link } from "react-router-dom";

const ViewProfile = () => {
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
        setAlert({ type: "error", message: "Error fetching user data" });
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white p-4 items-center">
      <div className="flex flex-col items-center justify-center flex-1 p-4 border border-gray-200 rounded-lg relative w-5/6 mt-10">
        {alert.message && <Alert type={alert.type} message={alert.message} />}
        {formData.imgPerfilPath ? (
          <img
            src={`http://localhost:8000${formData.imgPerfilPath}`}
            alt="Profile"
            className="w-20 h-20 rounded-full mb-4 absolute top-0 -mt-10 border-4 object-cover"
          />
        ) : (
          <FaUser className="text-6xl text-gray-700 mb-4" />
        )}
        <h1 className="text-lg font-bold text-gray-700 mb-1">
          {formData.nombre} {formData.apellido}
        </h1>
        <p className="text-m text-gray-400 mb-4">{formData.telefono}</p>
        <p className="text-m text-gray-400 mb-4">{formData.biografia}</p>
        <Link
          className="bg-yellow-100 text-yellow-400 px-4 py-2 rounded-lg border-yellow-400 border hover:bg-yellow-400 hover:text-yellow-100 absolute top-2 right-8 font-bold"
          to="/profile"
        >
          Editar perfil
        </Link>
      </div>
      <div className="flex flex-row justify-between gap-2 w-5/6 py-4">
        <div className="">
          <h2 className="text-xl font-bold">Tus cursos</h2>
        </div>
        <div className="w-1/3 bg-gray-100 p-4 rounded-xl">
          <h2 className="text-xl font-bold">Tus aportes</h2>
          <p className="text-gray-400 font-medium my-10 text-center">
            Aún no has hecho aportes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
