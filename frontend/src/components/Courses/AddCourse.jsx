import React, { useState, useEffect } from "react";
import axios from "axios";

const AddCourse = () => {
  const [categorias, setCategorias] = useState([]);
  const [formData, setFormData] = useState({
    idCategoria: "",
    nombre: "",
    descripcion: "",
    requisitos: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("/categorias/")
      .then((response) => setCategorias(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/cursos/", formData)
      .then((response) => {
        setMessage("Curso creado con éxito");
        setFormData({
          idCategoria: "",
          nombre: "",
          descripcion: "",
          requisitos: "",
        });
      })
      .catch((error) => {
        setMessage("Error al crear el curso: " + error.response.data.detail);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-4xl font-bold text-yellow-500 mb-6">Agregar Curso</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded w-2/3 lg:w-1/2"
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
            {categorias.map((categoria) => (
              <option key={categoria.idCategoria} value={categoria.idCategoria}>
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

        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-2 rounded"
        >
          Crear Curso
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
