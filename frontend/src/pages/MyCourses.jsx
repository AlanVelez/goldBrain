import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Layout/Sidebar";
import { getCurrentUser } from "../services/auth"; // Asegúrate de que la ruta a getCurrentUser sea correcta

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserCourses = async () => {
      try {
        const currentUser = await getCurrentUser();
        const userId = currentUser.idUsuario;
        setUserId(userId);
        const response = await axios.get(
          `http://localhost:8000/users/${userId}/enrollments`
        );
        setCourses(response.data);
        setError(null);
      } catch (error) {
        setError("Error al obtener los cursos del usuario.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserCourses();
  }, []);

  const handleCourseClick = (idCurso) => {
    navigate(`/cursos/${idCurso}`);
  };

  return (
    <div className="flex flex-row min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 container mx-auto px-4 py-8 w-4/5 h-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-10">
          Mis Aprendizaje
        </h1>
        {loading ? (
          <p>Cargando cursos...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            {courses.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {courses.slice(0, 5).map((course) => (
                  <div
                    key={course.idCurso}
                    className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:bg-gray-100 curso h-96"
                    onClick={() => handleCourseClick(course.idCurso)}
                  >
                    {course.portada && (
                      <div className="relative">
                        <img
                          src={`http://localhost:8000${course.portada}`}
                          alt={course.nombre}
                          className="w-full h-48 object-cover rounded-t-lg img-curso"
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
                      <h2 className="text-lg font-bold text-yellow-500 mb-2">
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
              <div className="bg-gray-100 rounded-lg p-4 w-full h-32 flex flex-col items-center">
                <p className="text-gray-600 text-xl">
                  ¡Aprende ahora! Inscríbete en tus primeros cursos.
                </p>
                <Link
                  to="/my-courses"
                  className="bg-yellow-400 rounded-lg px-4 py-2 text-white mt-4 w-1/2 text-center font-semibold hover:bg-yellow-500"
                >
                  Explorar
                </Link>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default MyCourses;
