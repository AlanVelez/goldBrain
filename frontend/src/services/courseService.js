import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const getCourses = async () => {
  try {
    const response = await axios.get(`${API_URL}/cursos/`);
    console.log('Courses:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

export const getCourse = async (idCurso) => {
  try {
    const response = await axios.get(`${API_URL}/cursos/${idCurso}`);
    console.log('Course:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching course with ID ${idCurso}:`, error);
    throw error;
  }
};

export const getCategoria = async (idCategoria) => {
  try {
    const response = await axios.get(`${API_URL}/categorias/${idCategoria}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching category with ID ${idCategoria}:`, error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categorias/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const getVideosByCurso = async (idCurso) => {
  try {
    const response = await axios.get(`${API_URL}/videos/${idCurso}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching videos for course with ID ${idCurso}:`, error);
    throw error;
  }
};

export const markVideoAsWatched = async (idVideo) => {
  await axios.post(`http://localhost:8000/videos/${idVideo}/watched`);
};

export const checkEnrollment = async (userId, courseId) => {
  try {
    const response = await axios.get(`http://localhost:8000/enrollments/${userId}/${courseId}`);
    return response.data ? true : false;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return false;
    }
    throw error;
  }
};

export const enrollUser = async (userId, courseId) => {
  const response = await axios.post(`http://localhost:8000/enrollments/`, {
    idUsuario: userId,
    idCurso: courseId,
  });
  return response.data;
};

export const getUserProgress = async (userId, courseId) => {
  const response = await axios.get(`http://localhost:8000/video-progress/user/${userId}/course/${courseId}`);
  return response.data;
};

export const getRecommendedCourses = async (userId) => {
  const response = await axios.get(`http://localhost:8000/users/${userId}/recommended_courses`);
  return response.data;
};

export const getUserCourses = async (userId) => {
  const response = await axios.get(`http://localhost:8000/users/${userId}/enrollments`);
  return response.data;
};

export const getLastUnwatchedVideos = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}/last-unwatched-videos`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching last unwatched videos for user with ID ${userId}:`, error);
    throw error; 
  }
};
