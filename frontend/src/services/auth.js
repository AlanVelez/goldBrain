// src/services/auth.js
import axios from 'axios';

const API_URL = 'http://localhost:8000';

// Registro de usuario
export const register = (userData) => {
  return axios.post(`${API_URL}/users/`, userData)
    .then(response => response.data)
    .catch(error => {
      console.error("Registration error:", error.response?.data || error.message);
      throw error;
    });
};

// Inicio de sesión
export const login = async (userData) => {
  try {
    const params = new URLSearchParams();
    params.append('username', userData.email);  // FastAPI still expects "username" field
    params.append('password', userData.password);

    const response = await axios.post(`${API_URL}/token`, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    // Almacenar token en localStorage
    localStorage.setItem('token', response.data.access_token);
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

// Cierre de sesión
export const logout = () => {
  localStorage.removeItem('token');
};

// Obtener usuario actual
export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("No token found");

    const response = await axios.get(`${API_URL}/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Get current user error:", error.response?.data || error.message);
    throw error;
  }
};
