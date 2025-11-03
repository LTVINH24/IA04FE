/**
 * Token Manager
 * Manages JWT access and refresh tokens securely
 * - Access token stored in memory (secure, cleared on page refresh)
 * - Refresh token stored in localStorage (persistent across sessions)
 */

const REFRESH_TOKEN_KEY = 'refreshToken';

// In-memory storage for access token (more secure)
let accessToken = null;

const tokenManager = {
  // Get the current access token from memory
  getAccessToken: () => {
    return accessToken;
  },

  // Set the access token in memory
  setAccessToken: (token) => {
    accessToken = token;
  },

  // Get the refresh token from localStorage
  getRefreshToken: () => {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  // Set the refresh token in localStorage
  setRefreshToken: (token) => {
    if (token) {
      localStorage.setItem(REFRESH_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    }
  },

  // Set both tokens at once (typically after login)
  setTokens: (accessTok, refreshTok) => {
    tokenManager.setAccessToken(accessTok);
    tokenManager.setRefreshToken(refreshTok);
  },

  // Clear all tokens (on logout)
  clearTokens: () => {
    accessToken = null;
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  // Check if we have a refresh token (indicates user was logged in)
  hasRefreshToken: () => {
    return !!localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  // Check if we have an access token in memory
  hasAccessToken: () => {
    return !!accessToken;
  },
};

export default tokenManager;
