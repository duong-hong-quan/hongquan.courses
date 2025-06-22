'use client';

import { Provider } from 'react-redux';
import { useEffect, useState } from 'react';
import { store } from './store';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return <Provider store={store}>{children}</Provider>;
} 