import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import YouTube from "react-youtube";
import axios from "axios";
import { getVideosByCurso } from "../services/courseService";

const VideoPlayer = () => {
  const { idCurso, idVideo } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [videos, setVideos] = useState([]);
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
            <div className="w-1/3 pr-4 border-r-2 border-gray-100">
              <h2 className="text-xl font-bold text-gray-700 mb-4">
                Videos del curso
              </h2>
              <ul>
                {videos.map((video) => (
                  <li
                    key={video.idVideo}
                    className={`mb-2 p-2 rounded-lg ${
                      video.watched ? "bg-gray-200" : "bg-white"
                    } hover:bg-gray-100 cursor-pointer`}
                    onClick={() =>
                      navigate(`/course/${idCurso}/video/${video.idVideo}`)
                    }
                  >
                    <h3 className="font-semibold">{video.nombre}</h3>
                    <p className="text-gray-600">{video.descripcion}</p>
                    {video.watched && (
                      <span className="text-green-500">Visto</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-2/3 pl-4">
              {video && (
                <>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    {video.nombre}
                  </h2>
                  <YouTube
                    videoId={getYouTubeId(video.link)}
                    opts={{
                      width: "100%",
                      height: "400",
                    }}
                    onEnd={handleVideoEnd}
                  />
                  <p className="text-gray-600 mt-4">{video.descripcion}</p>
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
