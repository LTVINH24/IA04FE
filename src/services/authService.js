import apiClient from '../lib/api';
import tokenManager from '../lib/tokenManager';

export const authService = {
  // Register a new user
  register: async (userData) => {
    const response = await apiClient.post('/user/register', userData);
    return response.data;
  },

  // Login user
  login: async (credentials) => {
    const response = await apiClient.post('/user/login', credentials);
    return response.data;
  },

  // Logout user
  logout: async () => {
    const refreshToken = tokenManager.getRefreshToken();
    if (refreshToken) {
      try {
        await apiClient.post('/user/logout', { token: refreshToken });
      } catch (error) {
        // Even if logout fails on server, clear local tokens
        console.error('Logout error:', error);
      }
    }
    tokenManager.clearTokens();
  },

  // Refresh access token
  refresh: async () => {
    const refreshToken = tokenManager.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    const response = await apiClient.post('/user/refresh', { token: refreshToken });
    return response.data;
  },

  // Get current user info
  getUserInfo: async () => {
    const response = await apiClient.get('/user/me');
    return response.data;
  },
};
