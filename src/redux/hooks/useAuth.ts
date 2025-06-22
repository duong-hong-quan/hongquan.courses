import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { loginUser, logoutUser, checkAuthStatus, clearError } from '../slices/authSlice';
import { LoginRequest } from '../types/auth';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  // Log auth state changes
  useEffect(() => {
    console.log('useAuth: auth state changed:', {
      isAuthenticated: auth.isAuthenticated,
      isLoading: auth.isLoading,
      hasUser: !!auth.user,
      hasToken: !!auth.token,
      error: auth.error
    });
  }, [auth.isAuthenticated, auth.isLoading, auth.user, auth.token, auth.error]);

  const login = useCallback(
    async (credentials: LoginRequest) => {
      console.log('useAuth: login called with:', credentials);
      const result = await dispatch(loginUser(credentials));
      console.log('useAuth: login result:', result);
      return result;
    },
    [dispatch]
  );

  const logout = useCallback(async () => {
    console.log('useAuth: logout called');
    const result = await dispatch(logoutUser());
    console.log('useAuth: logout result:', result);
    return result;
  }, [dispatch]);

  const checkAuth = useCallback(async () => {
    console.log('useAuth: checkAuth called');
    const result = await dispatch(checkAuthStatus());
    console.log('useAuth: checkAuth result:', result);
    return result;
  }, [dispatch]);

  const clearAuthError = useCallback(() => {
    console.log('useAuth: clearAuthError called');
    dispatch(clearError());
  }, [dispatch]);

  return {
    // State
    user: auth.user,
    token: auth.token,
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,
    error: auth.error,

    // Actions
    login,
    logout,
    checkAuth,
    clearAuthError,
  };
}; 