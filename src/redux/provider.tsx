'use client';

import { Provider } from 'react-redux';
import { store } from './store';
import { useClient } from '@/hooks/use-client';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  const isClient = useClient();

  // Always render the Provider, but conditionally render children
  return (
    <Provider store={store}>
      {isClient ? children : <div style={{ visibility: 'hidden' }}>{children}</div>}
    </Provider>
  );
} 