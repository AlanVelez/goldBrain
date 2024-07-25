import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCurrentUser } from "../services/auth";
import { FaUser } from "react-icons/fa";
import Alert from "../components/common/Alert"; // Asegúrate de importar el componente Alert
import { Link } from "react-router-dom";
import Breadcrumb from "../components/common/Breadcrumb";
const ViewProfile = () => {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
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

        // Fetch user courses
        const userId = data.idUsuario;
        const response = await axios.get(
          `http://localhost:8000/users/${userId}/enrollments`
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching current user:", error);
        setAlert({ type: "error", message: "Error fetching user data" });
      }
    };

    fetchUser();
  }, []);

  const handleCourseClick = (idCurso) => {
    navigate(`/course/${idCurso}`);
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white p-4 items-center">
      <div className="flex justify-start w-5/6">
        <Breadcrumb />
      </div>
      <div className="flex flex-col items-center justify-end flex-1 p-4 border border-gray-200 rounded-lg relative w-5/6 mt-10 max-h-60 min-h-60">
        {alert.message && <Alert type={alert.type} message={alert.message} />}
        {formData.imgPerfilPath ? (
          <img
            src={`http://localhost:8000${formData.imgPerfilPath}`}
            alt="Profile"
            className="w-32 h-32 rounded-full mb-4 absolute top-0 -mt-10 border-4 object-cover"
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
        <div className="w-2/3 p-4">
          <h2 className="text-xl font-bold">Tus cursos</h2>
          {courses.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 mt-4">
              {courses.map((course) => (
                <div
                  key={course.idCurso}
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:bg-gray-100 curso"
                  onClick={() => handleCourseClick(course.idCurso)}
                >
                  {course.portada && (
                    <div className="relative">
                      <img
                        src={`http://localhost:8000${course.portada}`}
                        alt={course.nombre}
                        className="w-full h-40 object-cover rounded-t-lg img-curso"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-12 h-12 text-white"
                        >
                          <path d="M4.5 3.5l15 8.5-15 8.5v-17z" />
                        </svg>
                      </div>
                    </div>
                  )}
                  <div className="p-4">
                    <h2 className="text-lg font-bold text-gray-800 mb-2 truncate">
                      {course.nombre}
                    </h2>
                    <p className="text-gray-600 text-xs truncate">
                      Última actualización:{" "}
                      {new Date(
                        course.ultimaActualizacion
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 font-medium my-10 text-center">
              ¡Aprende ahora! Inscríbete en tus primeros cursos.
            </p>
          )}
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
