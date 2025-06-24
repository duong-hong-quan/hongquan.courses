'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/redux/hooks/useAuth';
import { useClient } from '@/hooks/use-client';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export function ProtectedRoute({ 
  children, 
  redirectTo = '/login' 
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const isClient = useClient();
  const [isLoginFlag, setIsLoginFlag] = useState<boolean | null>(null);

  console.log('ProtectedRoute render:', { isAuthenticated, isLoading, isClient });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLoginFlag(localStorage.getItem('isLogin') === 'true');
    }
  }, []);

  useEffect(() => {
    if (!isClient) return; // Don't redirect during SSR
    
    console.log('ProtectedRoute: auth state changed:', { isAuthenticated, isLoading });
    // Redirect if not authenticated and not loading
    if (!isLoading && !isAuthenticated) {
      console.log('ProtectedRoute: redirecting to', redirectTo);
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, router, redirectTo, isClient]);

  // Show loading state while checking authentication or during SSR
  if (isLoading || (isLoginFlag && !isAuthenticated) || !isClient) {
    console.log('ProtectedRoute: showing loading state');
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Don't render children if not authenticated
  if (!isAuthenticated) {
    console.log('ProtectedRoute: not authenticated, not rendering children');
    return null;
  }

  console.log('ProtectedRoute: rendering children');
  return <>{children}</>;
} 