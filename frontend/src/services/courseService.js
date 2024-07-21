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
