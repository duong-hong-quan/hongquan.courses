import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import courseReducer from './slices/courseSlice';

// Create store only once
let storeInstance: ReturnType<typeof createStore> | undefined;

function createStore() {
  return configureStore({
    reducer: {
      auth: authReducer,
      course: courseReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these action types
          ignoredActions: ['persist/PERSIST'],
        },
      }),
  });
}

export function getStore() {
  if (!storeInstance) {
    storeInstance = createStore();
    
    // Log store state changes in development
    if (typeof window !== 'undefined') {
      storeInstance.subscribe(() => {
        const state = storeInstance!.getState();
        console.log('Redux store state changed:', {
          isAuthenticated: state.auth.isAuthenticated,
          isLoading: state.auth.isLoading,
          hasUser: !!state.auth.user,
          hasToken: !!state.auth.token,
          coursesCount: state.course.courses.length,
          courseLoading: state.course.isLoading,
        });
      });
    }
  }
  
  return storeInstance;
}

export const store = getStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 