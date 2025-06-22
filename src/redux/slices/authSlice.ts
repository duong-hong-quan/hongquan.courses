import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/lib/axios';
import { AuthState, LoginRequest, LoginResponse, ApiError } from '../types/auth';

// Async thunk for login
export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginRequest,
  { rejectValue: ApiError }
>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      console.log('loginUser: attempting login with credentials:', credentials);
      
      const response = await api.post<LoginResponse>('/auth/login', credentials, {
        withCredentials: true
      });

      console.log('loginUser: login response received:', response.data);
      console.log('loginUser: response headers:', response.headers);
    
      return response.data;
    } catch (error: any) {
      console.error('loginUser: error occurred:', error);
      if (error.response) {
        return rejectWithValue({
          message: error.response.data?.message || 'Login failed',
          statusCode: error.response.status,
        });
      }
      return rejectWithValue({
        message: 'Network error',
        statusCode: 500,
      });
    }
  }
);

// Async thunk for logout
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async () => {
    try {
      // Call logout API to clear server-side cookies
      await api.post('/auth/logout', {}, {
        withCredentials: true
      });
    } catch (error) {
      // Continue with logout even if API call fails
      console.log('Logout API call failed, continuing with local logout');
    } finally {
      // Clear localStorage
      localStorage.removeItem('user');
    }
  }
);

// Async thunk for checking authentication status
export const checkAuthStatus = createAsyncThunk(
  'auth/checkStatus',
  async (_, { rejectWithValue }) => {
    try {
      console.log('checkAuthStatus: starting check');
      
      // Check if we have user data in localStorage
      const user = localStorage.getItem('user');
      
      console.log('checkAuthStatus: localStorage data:', { 
        hasUser: !!user,
        userData: user ? JSON.parse(user) : null
      });
      
      if (!user) {
        console.log('checkAuthStatus: no user found, throwing error');
        throw new Error('No user data found');
      }

      // Try to parse user data to validate it
      let parsedUser;
      try {
        parsedUser = JSON.parse(user);
        console.log('checkAuthStatus: successfully parsed user data:', parsedUser);
      } catch (parseError) {
        console.log('checkAuthStatus: failed to parse user data:', parseError);
        throw new Error('Invalid user data in localStorage');
      }

      // Verify authentication with backend using cookies
      try {
        const response = await api.get('/auth/verify', {
          withCredentials: true
        });
        console.log('checkAuthStatus: backend verification successful');
      } catch (verifyError) {
        console.log('checkAuthStatus: backend verification failed:', verifyError);
        throw new Error('Authentication verification failed');
      }

      const result = {
        user: parsedUser,
      };
      
      console.log('checkAuthStatus: returning result:', result);
      return result;
    } catch (error: any) {
      console.log('checkAuthStatus: error occurred:', error.message);
      console.log('checkAuthStatus: error details:', error);
      
      // Clear invalid data
      localStorage.removeItem('user');
      
      return rejectWithValue({
        message: error.message || 'Authentication expired',
        statusCode: 401,
      });
    }
  }
);

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        // Don't store tokens in state - they're in cookies
        state.token = null;
        state.refreshToken = null;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Login failed';
      });

    // Logout
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
        // Still clear the state even if logout API fails
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
      });

    // Check auth status
    builder
      .addCase(checkAuthStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        // Don't store tokens in state - they're in cookies
        state.token = null;
        state.refreshToken = null;
        state.error = null;
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.error = (action.payload as ApiError)?.message || 'Authentication check failed';
      });
  },
});

export const { clearError, setLoading } = authSlice.actions;
export default authSlice.reducer; 