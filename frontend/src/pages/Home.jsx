import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getCourses,
  getRecommendedCourses,
  getUserCourses,
  getLastUnwatchedVideos,
} from "../services/courseService";
import { getCurrentUser } from "../services/auth";
import Sidebar from "../components/Layout/Sidebar";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [userCourses, setUserCourses] = useState([]);
  const [lastUnwatchedVideos, setLastUnwatchedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const recommendedCoursesRef = useRef(null);

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
        const recommended = await getRecommendedCourses(data.idUsuario);
        setRecommendedCourses(recommended);
        const userCoursesData = await getUserCourses(data.idUsuario);
        setUserCourses(userCoursesData);
        const lastUnwatched = await getLastUnwatchedVideos(data.idUsuario);
        setLastUnwatchedVideos(lastUnwatched);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleCourseClick = (idCurso) => {
    navigate(`/cursos/${idCurso}`);
  };

  const handleVideoClick = (idCurso, idVideo) => {
    navigate(`/course/${idCurso}/video/${idVideo}`);
  };

  const scrollRecommendedCourses = (direction) => {
    if (recommendedCoursesRef.current) {
      const scrollAmount = direction === "left" ? -600 : 600; // Adjusted for more scroll distance
      recommendedCoursesRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  console.log(lastUnwatchedVideos);

  return (
    <div className="flex flex-row min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 container mx-auto px-4 py-8 w-4/5">
        {user && (
          <h1 className="text-4xl font-bold text-yellow-500 mb-10">
            ¡Hola de nuevo, {user.nombre}!
          </h1>
        )}
        <h2 className="text-xl font-bold text-gray-800 mt-12 mb-6 flex justify-between">
          Continuar aprendiendo
          <Link
            to="/my-courses"
            className="px-4 py-1 font-mono font-normal text-yellow-500 text-base underline"
          >
            Mi aprendizaje
          </Link>
        </h2>
        <div className="flex overflow-x-auto space-x-8 mb-8 py-4 justify-start">
          {lastUnwatchedVideos.length > 0 ? (
            lastUnwatchedVideos.map((video) => (
              <div
                key={video.idVideo}
                className="flex bg-white rounded-lg overflow-hidden cursor-pointer w-1/3 m-1 p-4 transform curso hover:shadow-sm border border-yellow-200 transition-all h-44 hover:bg-yellow-50"
                onClick={() => handleVideoClick(video.idCurso, video.idVideo)}
              >
                {video.portada && (
                  <div className="relative">
                    <img
                      src={`http://localhost:8000${video.portada}`}
                      alt={video.nombre}
                      className="w-1/4 h-full object-cover rounded-lg img-curso-2"
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
                  <span className="text-white text-sm rounded-full bg-yellow-500 px-2 py-1">
                    {video.idCurso}
                  </span>
                  <h2 className="text-md font-bold text-yellow-500 my-2">
                    {video.nombre}
                  </h2>
                  <p className="text-gray-400 text-xs">
                    Duración: {video.duracionSeg} segundos
                  </p>
                </div>
              </div>
            ))
          ) : userCourses.length > 0 ? (
            userCourses.slice(0, 3).map((course) => (
              <div
                key={course.idCurso}
                className="flex bg-gray-50 rounded-lg shadow-sm overflow-hidden cursor-pointer w-3/6 m-1 p-4 transform curso hover:bg-gray-100"
                onClick={() => handleCourseClick(course.idCurso)}
              >
                {course.portada && (
                  <div className="relative">
                    <img
                      src={`http://localhost:8000${course.portada}`}
                      alt={course.nombre}
                      className="w-full h-full object-cover rounded-lg img-curso-2"
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
                  <h2 className="text-md font-bold text-gray-800 mb-2">
                    {course.nombre}
                  </h2>
                  <p className="text-gray-600 text-xs">
                    Última actualización:{" "}
                    {new Date(course.ultimaActualizacion).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
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
        </div>
        {recommendedCourses.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-bold text-gray-800 mt-12 mb-6 flex justify-between">
              Cursos recomendados para ti
            </h2>
            <div className="relative px-4">
              <button
                onClick={() => scrollRecommendedCourses("left")}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-yellow-50 py-2 px-4 rounded-lg border text-yellow-400 border-yellow-400"
              >
                &lt;
              </button>
              <div
                ref={recommendedCoursesRef}
                className="flex overflow-x-hidden space-x-8"
                style={{ scrollBehavior: "smooth" }}
              >
                {recommendedCourses.map((course) => (
                  <div
                    key={course.idCurso}
                    className="flex-none flex-col bg-white rounded-lg overflow-hidden cursor-pointer w-1/3 m-1 curso shadow-md"
                    onClick={() => handleCourseClick(course.idCurso)}
                  >
                    {course.portada && (
                      <img
                        src={`http://localhost:8000${course.portada}`}
                        alt={course.nombre}
                        className="w-full h-60 object-cover rounded-lg rounded-b-none img-curso img-cruso-2"
                      />
                    )}
                    <div className="p-6">
                      <h2 className="text-lg font-bold text-yellow-500 mb-2">
                        {course.nombre}
                      </h2>
                      <p className="text-gray-400 text-xs">
                        Última actualización:{" "}
                        {new Date(
                          course.ultimaActualizacion
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => scrollRecommendedCourses("right")}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-yellow-50 py-2 px-4 rounded-lg border text-yellow-400 border-yellow-400"
              >
                &gt;
              </button>
            </div>
          </div>
        )}
        <h2 className="text-xl font-bold text-gray-800 my-6 flex justify-between">
          Cursos disponibles
          <Link
            to="/cursos"
            className="px-4 py-1 font-mono font-normal text-yellow-500 text-base underline"
          >
            Ver todos
          </Link>
        </h2>
        {loading ? (
          <p>Cargando cursos...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <div className="flex space-x-8 overflow-x-auto">
              {courses.slice(0, 3).map((course) => (
                <div
                  key={course.idCurso}
                  className="flex bg-white rounded-lg overflow-hidden cursor-pointer p-4 border border-yellow-200 curso h-40 hover:shadow-lg hover:bg-yellow-50"
                  onClick={() => handleCourseClick(course.idCurso)}
                >
                  {course.portada && (
                    <img
                      src={`http://localhost:8000${course.portada}`}
                      alt={course.nombre}
                      className="w-40 h-full object-cover rounded-lg"
                    />
                  )}
                  <div className="p-4">
                    <h2 className="text-lg font-bold text-yellow-500 mb-2">
                      {course.nombre}
                    </h2>
                    <p className="text-gray-400 text-xs">
                      Última actualización:{" "}
                      {new Date(
                        course.ultimaActualizacion
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
