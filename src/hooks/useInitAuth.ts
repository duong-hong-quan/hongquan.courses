import { useEffect, useRef } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { checkAuthStatus } from '@/redux/slices/authSlice';
import { useClient } from './use-client';
import { useAppSelector } from '@/redux/hooks';
import { setLoading } from '@/redux/slices/authSlice';

let isInitialized = false;

export function useInitAuth() {
  const dispatch = useAppDispatch();
  const hasRun = useRef(false);
  const dispatchRef = useRef(dispatch);
  const isClient = useClient();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  // Update dispatch ref when it changes
  useEffect(() => {
    dispatchRef.current = dispatch;
  }, [dispatch]);

  useEffect(() => {
    // Only run on client side
    if (!isClient) return;
    
    // Prevent multiple initializations
    if (hasRun.current || isInitialized) {
      console.log('useInitAuth: Already initialized, skipping');
      return;
    }

    console.log('useInitAuth: Initializing authentication');
    hasRun.current = true;
    isInitialized = true;
    
    // Check if we're on the client side
    if (typeof window !== 'undefined') {
      const isLogin = localStorage.getItem('isLogin');
      if (isLogin === 'true' && !isAuthenticated) {
        // Đánh dấu redux đã xác thực luôn
        dispatchRef.current({ type: 'auth/setLoading', payload: false });
        dispatchRef.current({ type: 'auth/setAuthenticated', payload: true });
        return;
      }
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      
      console.log('useInitAuth: localStorage check:', {
        hasToken: !!token,
        hasUser: !!user
      });

      // Only check auth if we have data in localStorage
      if (token && user) {
        console.log('useInitAuth: Found auth data, checking status');
        // Use setTimeout to ensure this runs after the component is fully mounted
        setTimeout(() => {
          dispatchRef.current(checkAuthStatus());
        }, 0);
      } else {
        console.log('useInitAuth: No auth data found in localStorage');
      }
    }
  }, [isClient, isAuthenticated]); // Add isClient, isAuthenticated to dependencies

  return { isClient };
} 