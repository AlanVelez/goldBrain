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