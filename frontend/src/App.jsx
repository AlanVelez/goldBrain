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
import AddCourseVideos from "./components/Courses/AddCourseVideos";
import ViewProfile from "./pages/ViewProfile";
import Help from "./pages/Help";
import VideoPlayer from "./pages/VideoPlayer";
import MyCourses from "./pages/MyCourses";
import Courses from "./pages/Courses";
import CreateCategory from "./pages/CreateCategory";

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
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/cursos" element={<Courses />} />
          <Route
            path="/course/:idCurso/video/:idVideo"
            element={<VideoPlayer />}
          />
          <Route path="/view-profile" element={<ViewProfile />} />
          <Route path="/help" element={<Help />} />
        </Route>
        <Route element={<RoleBasedRoute allowedRoles={[1, 3]} />}>
          <Route path="/admin/add-course" element={<AddCourse />} />
          <Route path="/admin/add-category" element={<CreateCategory />} />
          <Route
            path="/admin/add-course-videos/:idCurso"
            element={<AddCourseVideos />}
          />
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
