import { useEffect, useState } from 'react';

/**
 * Hook to detect if the component is running on the client side
 * This helps prevent hydration mismatches between server and client
 */
export function useClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}

/**
 * Hook to safely access browser APIs without causing hydration issues
 */
export function useBrowserAPI<T>(
  getValue: () => T,
  defaultValue: T
): T {
  const [value, setValue] = useState<T>(defaultValue);
  const isClient = useClient();

  useEffect(() => {
    if (isClient) {
      setValue(getValue());
    }
  }, [isClient, getValue]);

  return value;
}

/**
 * Hook to safely access localStorage without causing hydration issues
 */
export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(defaultValue);
  const isClient = useClient();

  useEffect(() => {
    if (isClient) {
      try {
        const item = window.localStorage.getItem(key);
        if (item) {
          setStoredValue(JSON.parse(item));
        }
      } catch (error) {
        console.error(`Error reading localStorage key "${key}":`, error);
      }
    }
  }, [key, isClient]);

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      if (isClient) {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
} 