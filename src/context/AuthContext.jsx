import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/authService';
import tokenManager from '../lib/tokenManager';
import { toast } from 'sonner';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // Khởi tạo isAuthenticated dựa trên refresh token có sẵn
  const [isAuthenticated, setIsAuthenticated] = useState(tokenManager.hasRefreshToken());
  // Set loading true ban đầu nếu có refresh token để tránh flash
  const [isLoading, setIsLoading] = useState(tokenManager.hasRefreshToken());
  const navigate = useNavigate();
  const initRef = useRef(false);

  // Initialize auth state on mount
  useEffect(() => {
    // Prevent double initialization in React StrictMode
    if (initRef.current) return;
    initRef.current = true;

    const initAuth = async () => {
      const refreshToken = tokenManager.getRefreshToken();
      
      if (refreshToken) {
        setIsAuthenticated(true); // Set ngay lập tức
        try {
          // Refresh token im lặng ở background
          const response = await authService.refresh();
          const { accessToken, refreshToken: newRefreshToken } = response.result;
          
          tokenManager.setTokens(accessToken, newRefreshToken);
          // Don't fetch user info here - let Dashboard do it
        } catch (error) {
          console.error('Failed to restore session:', error);
          tokenManager.clearTokens();
          setIsAuthenticated(false);
          setUser(null);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: (credentials) => authService.login(credentials),
    onSuccess: async (data) => {
      const { accessToken, refreshToken } = data.result;
      
      // Store tokens
      tokenManager.setTokens(accessToken, refreshToken);
      setIsAuthenticated(true);
      toast.success('Login successful!');
      navigate('/dashboard');
      // Dashboard will fetch user info when mounted
    },
    onError: (error) => {
      toast.error(error?.message || 'Login failed. Please check your credentials.');
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      setUser(null);
      setIsAuthenticated(false);
      toast.success('Logged out successfully');
      navigate('/login');
    },
    onError: (error) => {
      // Even if server logout fails, clear local state
      setUser(null);
      setIsAuthenticated(false);
      tokenManager.clearTokens();
      toast.error('Logout completed with errors');
      navigate('/login');
    },
  });

  const login = (credentials) => {
    loginMutation.mutate(credentials);
  };

  const logout = () => {
    logoutMutation.mutate();
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
