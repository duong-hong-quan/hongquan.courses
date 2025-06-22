'use client';

import { useInitAuth } from '@/hooks/useInitAuth';

export function AuthInitializer() {
  useInitAuth();
  return null; // This component doesn't render anything
} 