import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import YouTube from "react-youtube";
import axios from "axios";
import { getVideosByCurso, getCourse } from "../services/courseService";

const VideoPlayer = () => {
  const { idCurso, idVideo } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [courseDetails, setCourseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await axios.get("http://localhost:8000/users/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUserId(user.data.idUsuario);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      if (userId) {
        try {
          const videosData = await getVideosByCurso(parseInt(idCurso, 10));
          const progressData = await axios.get(
            `http://localhost:8000/video-progress/user/${userId}/course/${idCurso}`
          );
          const progressMap = progressData.data.reduce((acc, progress) => {
            acc[progress.video_id] = progress.watched;
            return acc;
          }, {});

          const updatedVideos = videosData.map((video) => ({
            ...video,
            watched: progressMap[video.idVideo] || false,
          }));

          setVideos(updatedVideos);

          const currentVideo = updatedVideos.find(
            (v) => v.idVideo === parseInt(idVideo, 10)
          );
          setVideo(currentVideo);

          setLoading(false);
        } catch (err) {
          setError("Error al cargar los detalles del video.");
          setLoading(false);
        }
      }
    };

    fetchVideos();
  }, [idCurso, idVideo, userId]);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const course = await getCourse(parseInt(idCurso, 10));
        setCourseDetails(course[0]); // Accede al primer elemento del array
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    fetchCourseDetails();
  }, [idCurso]);

  const handleVideoEnd = async () => {
    try {
      await axios.put(
        `http://localhost:8000/video-progress/${userId}/${idVideo}`,
        {
          user_id: userId,
          video_id: idVideo,
          watched: true,
          progress: 100,
        }
      );
      const updatedVideos = videos.map((v) =>
        v.idVideo === video.idVideo ? { ...v, watched: true } : v
      );
      setVideos(updatedVideos);
    } catch (err) {
      console.error("Error al marcar el video como visto", err);
    }
  };

  const getYouTubeId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {loading ? (
        <p>Cargando video...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="flex">
            <div className="w-1/4 p-4 border-2 border-gray-100 rounded-lg bg-gray-50">
              <ul>
                {videos.map((video) => (
                  <li
                    key={video.idVideo}
                    className={`mb-2 p-2 rounded-lg border flex gap-2 items-center h-20 ${
                      video.watched ? "bg-gray-200" : "bg-gray-100"
                    } hover:bg-gray-100 cursor-pointer`}
                    onClick={() =>
                      navigate(`/course/${idCurso}/video/${video.idVideo}`)
                    }
                  >
                    <div className="w-8 h-6 flex items-center justify-center text-green-500">
                      {video.watched && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <h3 className="font-semibold">{video.nombre}</h3>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-3/4 pl-4">
              {video && (
                <>
                  <YouTube
                    videoId={getYouTubeId(video.link)}
                    opts={{
                      width: "100%",
                      height: "400",
                    }}
                    onEnd={handleVideoEnd}
                  />
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800 my-6">
                      {video.nombre}
                    </h2>
                    <button className="px-4 py-2 bg-yellow-100 rounded-lg border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-white font-bold">
                      Solicitar asesoria
                    </button>
                  </div>
                  {courseDetails && (
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-gray-800">
                        {courseDetails.nombre}
                      </h3>
                      <div className="flex items-center space-x-4 mt-6">
                        <p className="text-gray-600 flex items-center gap-2 text-xl">
                          {courseDetails.calificacion === null
                            ? "Sin calificación"
                            : courseDetails.calificacion}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            class="text-yellow-400 size-6"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </p>
                        <p className="text-gray-600 flex items-center gap-2 text-xl">
                          {courseDetails.numEstudiantes === 1
                            ? "1 estudiante"
                            : `${courseDetails.numEstudiantes} estudiantes`}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            class="text-yellow-400 size-6"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"
                              clip-rule="evenodd"
                            />
                            <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                          </svg>
                        </p>
                      </div>
                    </div>
                  )}
                  <div>
                    <h3 className="text-gray-700 font-bold text-xl">
                      Descripción del video
                    </h3>
                    <p className="text-gray-600 mt-4">{video.descripcion}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default VideoPlayer;
