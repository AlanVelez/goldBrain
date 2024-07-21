import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddCourse from "./components/Courses/AddCourse";
import Profile from "./pages/Profile"; // Importar el componente Profile
import PrivateRoute from "./components/PrivateRoute";
import RoleBasedRoute from "./components/RoleBasedRoute";
import CourseDetail from "./pages/CourseDetail";

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />{" "}
          <Route path="/cursos/:idCurso" element={<CourseDetail />} />
          {/* Agregar la ruta del perfil */}
        </Route>
        <Route element={<RoleBasedRoute allowedRoles={[1, 3]} />}>
          <Route path="/admin/add-course" element={<AddCourse />} />
        </Route>
        <Route
          path="/"
          element={token ? <Navigate to="/home" /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
