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
import AddCourse from "./components/Courses/AddCourse"; // Ajustar la ruta de importación
import PrivateRoute from "./components/PrivateRoute";
import RoleBasedRoute from "./components/RoleBasedRoute";

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={token ? <Navigate to="/home" /> : <Login />}
        />
        <Route
          path="/register"
          element={token ? <Navigate to="/home" /> : <Register />}
        />
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
        </Route>
        <Route element={<RoleBasedRoute allowedRoles={[1, 3]} />}>
          <Route path="/admin/add-course" element={<AddCourse />} />
        </Route>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
};

export default App;
