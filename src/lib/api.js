import axios from 'axios';
import tokenManager from './tokenManager';

const API_BASE_URL = 'https://ia04be.onrender.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Flag to prevent multiple simultaneous refresh attempts
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request interceptor - Attach access token to all requests
apiClient.interceptors.request.use(
  (config) => {
    const token = tokenManager.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle token refresh on 401
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized - Token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = tokenManager.getRefreshToken();
      console.log('Attempting token refresh with:', refreshToken);
      if (!refreshToken) {
        // No refresh token available, logout user
        tokenManager.clearTokens();
        window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        // Attempt to refresh the access token
        const response = await axios.post(`${API_BASE_URL}/user/refresh`, {
          token: refreshToken,
        });

        const { result } = response.data;
        const newAccessToken = result.accessToken;
        const newRefreshToken = result.refreshToken;

        // Update tokens
        tokenManager.setTokens(newAccessToken, newRefreshToken);

        // Update the authorization header
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Process all queued requests
        processQueue(null, newAccessToken);

        // Retry the original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed, logout user
        processQueue(refreshError, null);
        tokenManager.clearTokens();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Handle other errors
    if (error.response) {
      // Server responded with error
      return Promise.reject({
        message: error.response.data.message || 'An error occurred',
        status: error.response.status,
        data: error.response.data,
      });
    } else if (error.request) {
      // Request was made but no response
      return Promise.reject({
        message: 'Network error. Please check your connection.',
      });
    } else {
      // Something else happened
      return Promise.reject({
        message: error.message || 'An unexpected error occurred',
      });
    }
  }
);

export default apiClient;
