import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout.jsx";

const AddCourse = () => {
  const [categorias, setCategorias] = useState([]);
  const [formData, setFormData] = useState({
    idCategoria: "",
    nombre: "",
    descripcion: "",
    requisitos: "",
    portada: null,
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get("http://localhost:8000/categorias/");
        setCategorias(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategorias([]);
      }
    };

    fetchCategorias();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, portada: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const courseData = {
        idCategoria: formData.idCategoria,
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        requisitos: formData.requisitos,
      };

      const response = await axios.post(
        "http://localhost:8000/cursos/",
        courseData
      );
      const courseId = response.data.idCurso;

      if (formData.portada) {
        const uploadData = new FormData();
        uploadData.append("file", formData.portada);
        uploadData.append("course_id", courseId); // Añadir el ID del curso

        await axios.post("http://localhost:8000/upload/", uploadData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      setMessage("Curso creado con éxito");
      navigate(`/admin/add-course-videos/${courseId}`);
    } catch (error) {
      setMessage(
        "Error al crear el curso: " +
          (error.response?.data?.detail || error.message)
      );
    }
  };

  return (
    <Layout>
      <div className="flex flex-col min-h-screen bg-white">
        <main className="flex flex-col items-center justify-center flex-1 p-4">
          <h1 className="text-4xl font-bold text-yellow-500 mb-6">
            Agregar Curso
          </h1>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded border w-1/3"
          >
            {message && <p className="text-red-500">{message}</p>}
            <div className="mb-4">
              <label htmlFor="idCategoria" className="block text-gray-700 mb-2">
                Categoría
              </label>
              <select
                id="idCategoria"
                name="idCategoria"
                value={formData.idCategoria}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none"
                required
              >
                <option value="">Seleccione una categoría</option>
                {Array.isArray(categorias) &&
                  categorias.map((categoria) => (
                    <option
                      key={categoria.idCategoria}
                      value={categoria.idCategoria}
                    >
                      {categoria.nombre}
                    </option>
                  ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="nombre" className="block text-gray-700 mb-2">
                Nombre del Curso
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
              <label htmlFor="requisitos" className="block text-gray-700 mb-2">
                Requisitos
              </label>
              <textarea
                id="requisitos"
                name="requisitos"
                value={formData.requisitos}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none"
              ></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="portada" className="block text-gray-700 mb-2">
                Portada del Curso
              </label>
              <input
                type="file"
                id="portada"
                name="portada"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border rounded focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-2 rounded"
            >
              Crear Curso
            </button>
          </form>
        </main>
      </div>
    </Layout>
  );
};

export default AddCourse;
