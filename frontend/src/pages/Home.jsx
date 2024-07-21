import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCourses } from "../services/courseService";
import { getCurrentUser } from "../services/auth";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
        setError(null);
      } catch (error) {
        setError("Error al obtener los cursos.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

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

  const handleCourseClick = (idCurso) => {
    navigate(`/cursos/${idCurso}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-1 container mx-auto px-4 py-8">
        {user && (
          <h1 className="text-4xl font-bold text-yellow-800 mb-6">
            Bienvenido, {user.nombre} {user.apellido}
          </h1>
        )}
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Cursos Disponibles
        </h2>
        {loading ? (
          <p>Cargando cursos...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course) => (
              <div
                key={course.idCurso}
                className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105 cursor-pointer"
                onClick={() => handleCourseClick(course.idCurso)}
              >
                {course.portada && (
                  <img
                    src={`http://localhost:8000${course.portada}`}
                    alt={course.nombre}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {course.nombre}
                  </h2>
                  <p className="text-gray-600">
                    Última actualización:{" "}
                    {new Date(course.ultimaActualizacion).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
