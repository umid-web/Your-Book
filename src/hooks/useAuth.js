import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { storage } from '../utils/helpers';
import { API_ENDPOINTS, ERROR_MESSAGES } from '../utils/constants';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = storage.get('auth_token');
        const userData = storage.get('user_data');
        
        if (token && userData) {
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        // Clear invalid data
        storage.remove('auth_token');
        storage.remove('user_data');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = useCallback(async (credentials) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      const mockResponse = {
        success: true,
        data: {
          token: 'mock_jwt_token_' + Date.now(),
          user: {
            id: 1,
            name: `${credentials.firstName || 'John'} ${credentials.lastName || 'Doe'}`,
            email: credentials.email,
            role: 'user',
            joinDate: new Date().toISOString().split('T')[0],
          }
        }
      };

      if (mockResponse.success) {
        const { token, user: userData } = mockResponse.data;
        
        // Store auth data
        storage.set('auth_token', token);
        storage.set('user_data', userData);
        
        setUser(userData);
        setIsAuthenticated(true);
        
        // Redirect to intended page or dashboard
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
        
        return { success: true };
      } else {
        throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
      }
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.message || ERROR_MESSAGES.GENERIC_ERROR 
      };
    } finally {
      setIsLoading(false);
    }
  }, [navigate, location.state]);

  // Register function
  const register = useCallback(async (userData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful registration
      const mockResponse = {
        success: true,
        data: {
          token: 'mock_jwt_token_' + Date.now(),
          user: {
            id: Date.now(),
            name: `${userData.firstName} ${userData.lastName}`,
            email: userData.email,
            phone: userData.phone,
            role: 'user',
            joinDate: new Date().toISOString().split('T')[0],
          }
        }
      };

      if (mockResponse.success) {
        const { token, user: newUser } = mockResponse.data;
        
        // Store auth data
        storage.set('auth_token', token);
        storage.set('user_data', newUser);
        
        setUser(newUser);
        setIsAuthenticated(true);
        
        // Redirect to dashboard
        navigate('/dashboard', { replace: true });
        
        return { success: true };
      } else {
        throw new Error(ERROR_MESSAGES.GENERIC_ERROR);
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        error: error.message || ERROR_MESSAGES.GENERIC_ERROR 
      };
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  // Logout function
  const logout = useCallback(() => {
    try {
      // Clear auth data
      storage.remove('auth_token');
      storage.remove('user_data');
      
      setUser(null);
      setIsAuthenticated(false);
      
      // Redirect to login
      navigate('/login', { replace: true });
      
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { 
        success: false, 
        error: ERROR_MESSAGES.GENERIC_ERROR 
      };
    }
  }, [navigate]);

  // Update user data
  const updateUser = useCallback((userData) => {
    try {
      storage.set('user_data', userData);
      setUser(userData);
      return { success: true };
    } catch (error) {
      console.error('Update user error:', error);
      return { 
        success: false, 
        error: ERROR_MESSAGES.GENERIC_ERROR 
      };
    }
  }, []);

  // Check if user has specific role
  const hasRole = useCallback((role) => {
    return user?.role === role;
  }, [user]);

  // Check if user has permission
  const hasPermission = useCallback((permission) => {
    // Mock permission system
    const permissions = {
      admin: ['read', 'write', 'delete'],
      user: ['read'],
      moderator: ['read', 'write'],
    };
    
    const userPermissions = permissions[user?.role] || [];
    return userPermissions.includes(permission);
  }, [user]);

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
    hasRole,
    hasPermission,
  };
};

export default useAuth;
