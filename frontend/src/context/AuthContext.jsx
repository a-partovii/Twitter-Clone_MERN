import { createContext, useContext, useState, useEffect } from 'react';
import { usersAPI } from '../utils/api.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUserId = localStorage.getItem('currentUserId');
    if (savedUserId) {
      loadUser(savedUserId);
    } else {
      setLoading(false);
    }
  }, []);

  const loadUser = async (userId) => {
    try {
      const user = await usersAPI.getById(userId);
      setCurrentUser(user);
      localStorage.setItem('currentUserId', userId);
    } catch (error) {
      console.error('Error loading user:', error);
      localStorage.removeItem('currentUserId');
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (identifier, password) => {
    try {
      setLoading(true);
      // Get all users and find by user_id, email, or name
      const users = await usersAPI.getAll();
      const user = users.find(
        u => 
          u.user_id.toLowerCase() === identifier.toLowerCase() ||
          u.email.toLowerCase() === identifier.toLowerCase() ||
          u.name.toLowerCase() === identifier.toLowerCase()
      );

      if (!user) {
        setLoading(false);
        return { success: false, error: 'User not found' };
      }

      // Check password (note: field name is "passsword" with typo in the data)
      const userPassword = user.passsword || user.password || '';
      if (userPassword !== password) {
        setLoading(false);
        return { success: false, error: 'Incorrect password' };
      }

      setCurrentUser(user);
      localStorage.setItem('currentUserId', user.user_id);
      setLoading(false);
      return { success: true, user };
    } catch (error) {
      console.error('Login error:', error);
      setLoading(false);
      return { success: false, error: 'Failed to login. Please try again.' };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUserId');
  };

  const value = {
    currentUser,
    loading,
    login,
    logout,
    isAuthenticated: !!currentUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
