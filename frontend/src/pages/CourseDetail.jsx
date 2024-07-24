import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getCourse,
  getCategoria,
  getVideosByCurso,
} from "../services/courseService";

const CourseDetail = () => {
  const { idCurso } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [categoria, setCategoria] = useState(null);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const courseData = await getCourse(parseInt(idCurso, 10));
        if (courseData && courseData.length > 0) {
          const course = courseData[0];
          setCourse(course); // Asumimos que solo hay un curso en la lista
          if (course.idCategoria) {
            const categoriaData = await getCategoria(course.idCategoria);
            setCategoria(categoriaData.nombre);
          }
          const videosData = await getVideosByCurso(course.idCurso);
          setVideos(videosData);
        } else {
          setError("No se encontraron detalles del curso.");
        }
        setLoading(false);
      } catch (err) {
        setError("Error al cargar los detalles del curso.");
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [idCurso]);

  const handleVideoClick = (videoId) => {
    navigate(`/course/${idCurso}/video/${videoId}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {loading ? (
        <p>Cargando detalles del curso...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="flex">
            <p className="text-yellow-400 text-sm font-semibold bg-yellow-100 border border-yellow-400 py-1 px-4 rounded-lg mb-4">
              {categoria || "Cargando..."}
            </p>
          </div>
          <div className="flex flex-row-reverse flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4">
              <div className="bg-white rounded-lg shadow-md h-full">
                {course.portada && (
                  <img
                    src={`http://localhost:8000${course.portada}`}
                    alt={course.nombre}
                    className="w-full h-full object-cover rounded-lg"
                  />
                )}
              </div>
            </div>
            <div className="w-full md:w-1/2 px-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {course.nombre}
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <p className="flex gap-1 text-yellow-400 items-center text-lg font-semibold">
                  {course.calificacion ? course.calificacion : 0}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </p>
                <p className="font-semibold text-gray-500">
                  {course.estudiantes == null ? 0 : course.estudiantes}{" "}
                  {course.estudiantes === 1 ? "estudiante" : "estudiantes"}
                </p>
              </div>
              <p className="text-gray-600 flex items-center gap-1 mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                    clipRule="evenodd"
                  />
                </svg>
                Última actualización:{" "}
                {new Date(course.ultimaActualizacion).toLocaleDateString()}
              </p>
              <p className="text-gray-700 my-4">{course.descripcion}</p>
              <button className="p-2 w-full rounded-lg text-white font-semibold mt-4 bg-yellow-400 hover:bg-yellow-500">
                Comenzar ahora
              </button>
            </div>
          </div>
          <section className="flex flex-col items-center py-4 mt-10">
            <h2 className="text-2xl font-bold mb-8 text-gray-700">
              Temario y recursos del curso
            </h2>
            <div className="flex w-full gap-1">
              <div className="w-1/3 border-r-2 mr-2 border-gray-100 pr-4">
                <h3 className="font-bold text-lg text-gray-500">Requisitos</h3>
                <p className="text-gray-800 mb-4">{course.requisitos}</p>
              </div>
              <div className="w-2/3">
                <h3 className="font-bold text-lg text-gray-500 mb-4 text-center">
                  Temario
                </h3>
                {videos.map((video) => (
                  <div
                    key={video.idVideo}
                    className="bg-gray-200 rounded-lg shadow-md p-4 mb-4 flex justify-between items-center text-gray-400 hover:cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => handleVideoClick(video.idVideo)}
                  >
                    <div className="flex gap-1 items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                          clip-rule="evenodd"
                        />
                      </svg>

                      <h4 className="text-lg font-semibold">{video.nombre}</h4>
                    </div>
                    <p className="mb-2">{video.descripcion}</p>
                    <p className="mb-2">
                      Duración: {video.duracionSeg} segundos
                    </p>
                    <button
                      className="text-blue-500 underline"
                      onClick={() => handleVideoClick(video.idVideo)}
                    >
                      Ver Video
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      )}
    </div>
  );
};

export default CourseDetail;
