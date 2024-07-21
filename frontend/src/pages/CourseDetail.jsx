import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getCurrentUser } from "../services/auth";

const CourseDetail = () => {
  const { idCurso } = useParams();
  const [course, setCourse] = useState(null);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const courseResponse = await axios.get(
          `http://localhost:8000/cursos/${idCurso}`
        );
        setCourse(courseResponse.data);

        const videosResponse = await axios.get(
          `http://localhost:8000/videos/${idCurso}`
        );
        setVideos(videosResponse.data);

        const userResponse = await getCurrentUser();
        setUser(userResponse);

        setError(null);
      } catch (error) {
        setError("Error al obtener los detalles del curso.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [idCurso]);

  const handleEnroll = async () => {
    try {
      await axios.post(`http://localhost:8000/inscripciones`, {
        idCurso,
        idUsuario: user.idUsuario,
      });
      alert("Inscripción exitosa");
    } catch (error) {
      alert("Error al inscribirse en el curso.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {loading ? (
        <p>Cargando detalles del curso...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/3 px-4">
              <div className="bg-white rounded-lg shadow-md p-4">
                {course.portada && (
                  <img
                    src={`http://localhost:8000${course.portada}`}
                    alt={course.nombre}
                    className="w-full h-48 object-cover mb-4"
                  />
                )}
                <p className="text-gray-600">
                  Última actualización:{" "}
                  {new Date(course.ultimaActualizacion).toLocaleDateString()}
                </p>
                <button
                  className="bg-yellow-500 text-white py-2 px-4 rounded mt-4"
                  onClick={handleEnroll}
                >
                  Inscribirse
                </button>
              </div>
            </div>
            <div className="w-full md:w-2/3 px-4">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                {course.nombre}
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {videos.map((video) => (
                  <div
                    key={video.idVideo}
                    className="bg-white rounded-lg shadow-md p-4"
                  >
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {video.nombre}
                    </h3>
                    <p className="text-gray-600">{video.descripcion}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default CourseDetail;
