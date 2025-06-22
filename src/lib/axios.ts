import axios from 'axios';

const API_BASE_URL = 'https://localhost:7202/api/v1';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'text/plain',
  },
  // Enable cookies to be sent with requests
  withCredentials: true,
});

// Request interceptor - no need to add Authorization header since we use cookies
api.interceptors.request.use(
  (config) => {
    // Log request details for debugging
    console.log('Axios request:', {
      url: config.url,
      method: config.method,
      headers: config.headers,
      withCredentials: config.withCredentials,
    });
    
    return config;
  },
  (error) => {
    console.error('Axios request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle authentication errors
api.interceptors.response.use(
  (response) => {
    // Log response details for debugging
    console.log('Axios response:', {
      url: response.config.url,
      status: response.status,
      headers: response.headers,
      cookies: document.cookie
    });
    
    return response;
  },
  async (error) => {
    console.error('Axios response error:', error);
    
    const originalRequest = error.config;

    // If the error is 401, redirect to login
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh authentication or redirect to login
        console.log('Authentication failed, redirecting to login');
        
        // Clear any stored user data
        localStorage.removeItem('user');
        
        // Redirect to login page
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      } catch (refreshError) {
        console.error('Authentication refresh failed:', refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api; 