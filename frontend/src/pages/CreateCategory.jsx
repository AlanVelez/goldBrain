// src/pages/CreateCategory.jsx
import React, { useState } from "react";
import axios from "axios";

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/categorias/", {
        nombre: categoryName,
      });
      setSuccessMessage("Categoría creada con éxito");
      setErrorMessage("");
      setCategoryName("");
    } catch (error) {
      setErrorMessage("Error al crear la categoría");
      setSuccessMessage("");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Crear Categoría</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="categoryName"
          >
            Nombre de la Categoría
          </label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Crear
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
