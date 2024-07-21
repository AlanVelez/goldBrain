import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { useParams, useNavigate } from "react-router-dom";
import { extractDurationFromLink } from "../../utils/videoUtils";

const AddCourseVideos = () => {
  const { idCurso } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    duracionSeg: 0,
    autor: "",
    link: "",
  });
  const [videos, setVideos] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/videos/${idCurso}`
        );
        setVideos(response.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, [idCurso]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLinkChange = async (e) => {
    const link = e.target.value;
    setFormData({ ...formData, link });
    const duracionSeg = await extractDurationFromLink(link);
    setFormData({ ...formData, duracionSeg });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/videos/", {
        ...formData,
        idCurso,
      });
      setMessage("Video agregado con éxito");
      setVideos([...videos, response.data]);
      setFormData({
        nombre: "",
        descripcion: "",
        duracionSeg: 0,
        autor: "",
        link: "",
      });
    } catch (error) {
      setMessage(
        "Error al agregar el video: " +
          (error.response?.data?.detail || error.message)
      );
    }
  };

  const handleFinish = () => {
    navigate("/home");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex flex-col items-center justify-center flex-1 p-4">
        <h1 className="text-4xl font-bold text-yellow-500 mb-6">
          Agregar Videos al Curso
        </h1>
        <div className="flex w-full">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded border w-1/3"
          >
            {message && <p className="text-red-500 mb-4">{message}</p>}
            <div className="mb-4">
              <label htmlFor="nombre" className="block text-gray-700 mb-2">
                Título del Video
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="descripcion" className="block text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none"
              ></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="autor" className="block text-gray-700 mb-2">
                Autor
              </label>
              <input
                type="text"
                id="autor"
                name="autor"
                value={formData.autor}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="link" className="block text-gray-700 mb-2">
                Link del Video
              </label>
              <input
                type="text"
                id="link"
                name="link"
                value={formData.link}
                onChange={handleLinkChange}
                className="w-full px-3 py-2 border rounded focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-2 rounded mb-4"
            >
              Agregar Video
            </button>
            <button
              type="button"
              onClick={handleFinish}
              className="w-full bg-gray-500 text-white py-2 rounded"
            >
              Finalizar
            </button>
          </form>

          <div className="w-2/3 ml-6">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Videos Cargados
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {videos.map((video) => (
                <div
                  key={video.idVideo}
                  className="border p-4 rounded shadow-md"
                >
                  <h3 className="text-xl font-semibold text-gray-700">
                    {video.nombre}
                  </h3>
                  <p className="text-gray-600">{video.descripcion}</p>
                  <p className="text-gray-600">Autor: {video.autor}</p>
                  <p className="text-gray-600">
                    Duración: {video.duracionSeg} segundos
                  </p>
                  <a
                    href={video.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Ver Video
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AddCourseVideos;
