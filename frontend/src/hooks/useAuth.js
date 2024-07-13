// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import { getCurrentUser, logout } from '../services/auth';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        setError(null);
      } catch (error) {
        console.error("Error fetching current user:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return { user, loading, error, handleLogout };
};
