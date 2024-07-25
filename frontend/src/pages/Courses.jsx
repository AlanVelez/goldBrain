import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCourses, getCategories } from "../services/courseService";
import Breadcrumb from "../components/common/Breadcrumb";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesData, categoriesData] = await Promise.all([
          getCourses(),
          getCategories(),
        ]);
        setCourses(coursesData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleCourseClick = (idCurso) => {
    navigate(`/cursos/${idCurso}`);
  };

  const filteredCourses = selectedCategory
    ? courses.filter(
        (course) => course.idCategoria === parseInt(selectedCategory)
      )
    : courses;

  const groupedCourses = categories
    .map((category) => ({
      categoryName: category.nombre,
      categoryId: category.idCategoria,
      courses: filteredCourses.filter(
        (course) => course.idCategoria === category.idCategoria
      ),
    }))
    .filter((group) => group.courses.length > 0);

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="mb-10">
        <Breadcrumb />
      </div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Nuestros cursos
          </h1>
          <p className="w-2/3 text-gray-400">
            ¡Descubre nuestros cursos gratuitos y comienza a aprender hoy mismo!
            Creemos que la educación debe ser accesible y divertida para todos,
            y estamos comprometidos en ofrecerte las mejores herramientas para
            tu desarrollo personal y profesional.
          </p>
        </div>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="bg-white border border-gray-300 rounded px-4 py-2"
        >
          <option value="">Todas las categorías</option>
          {categories.map((category) => (
            <option key={category.idCategoria} value={category.idCategoria}>
              {category.nombre}
            </option>
          ))}
        </select>
      </div>
      {groupedCourses.length > 0 ? (
        groupedCourses.map((group) => (
          <div key={group.categoryId} className="mb-8">
            <div className="flex items-center justify-center my-10">
              <span className="w-full bg-gray-200 h-px"></span>
              <h2 className="text-xl font-bold text-yellow-400 border rounded-full py-2 px-6">
                {group.categoryName}
              </h2>
              <span className="w-full bg-gray-200 h-px"></span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.courses.map((course) => (
                <div
                  key={course.idCurso}
                  className="bg-white border rounded-lg shadow-md overflow-hidden cursor-pointer h-72 curso text-gray-800"
                  onClick={() => handleCourseClick(course.idCurso)}
                >
                  {course.portada && (
                    <img
                      src={`http://localhost:8000${course.portada}`}
                      alt={course.nombre}
                      className="w-full h-40 object-cover img-curso"
                    />
                  )}
                  <div className="p-4">
                    <h2 className="text-lg font-bold mb-2">{course.nombre}</h2>
                    <p className="text-gray-400 text-sm">
                      Última actualización:{" "}
                      {new Date(
                        course.ultimaActualizacion
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="text-gray-600 text-center text-xl flex flex-col items-center gap- py-10 w-1/3 m-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-20 text-yellow-400"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 0 0-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634Zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 0 1-.189-.866c0-.298.059-.605.189-.866Zm-4.34 7.964a.75.75 0 0 1-1.061-1.06 5.236 5.236 0 0 1 3.73-1.538 5.236 5.236 0 0 1 3.695 1.538.75.75 0 1 1-1.061 1.06 3.736 3.736 0 0 0-2.639-1.098 3.736 3.736 0 0 0-2.664 1.098Z"
              clipRule="evenodd"
            />
          </svg>
          <p>No hay cursos disponibles en esta categoría.</p>
        </div>
      )}
    </div>
  );
};

export default Courses;
