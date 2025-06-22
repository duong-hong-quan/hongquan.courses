import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/lib/axios';
import { 
  CourseState, 
  CreateCourseRequest, 
  UpdateCourseRequest, 
  Course, 
  ApiError,
  CourseApiResponse,
  CourseEntity
} from '../types/course';
import { mapCourseApiResponseToCourses, mapCourseEntityToCourse } from '@/lib/courseMapper';

// Async thunk for fetching all courses
export const fetchCourses = createAsyncThunk<
  { courses: Course[]; pagination: any },
  void,
  { rejectValue: ApiError }
>(
  'course/fetchCourses',
  async (_, { rejectWithValue }) => {
    try {
      console.log('fetchCourses: fetching courses');
      
      const response = await api.get<CourseApiResponse>('/course/all');
      console.log('fetchCourses: response received:', response.data);
      
      // Map API response to frontend format
      const mappedData = mapCourseApiResponseToCourses(response.data);
      return mappedData;
    } catch (error: any) {
      console.log('fetchCourses: error occurred:', error);
      if (error.response) {
        return rejectWithValue({
          message: error.response.data?.message || 'Failed to fetch courses',
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

// Async thunk for creating a course
export const createCourse = createAsyncThunk<
  Course,
  CreateCourseRequest,
  { rejectValue: ApiError }
>(
  'course/createCourse',
  async (courseData, { rejectWithValue }) => {
    try {
      console.log('createCourse: creating course with data:', courseData);
      
      const response = await api.post<CourseEntity>('/course', courseData);
      console.log('createCourse: response received:', response.data);
      
      // Map API entity to frontend course
      return mapCourseEntityToCourse(response.data);
    } catch (error: any) {
      console.log('createCourse: error occurred:', error);
      if (error.response) {
        return rejectWithValue({
          message: error.response.data?.message || 'Failed to create course',
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

// Async thunk for updating a course
export const updateCourse = createAsyncThunk<
  Course,
  UpdateCourseRequest,
  { rejectValue: ApiError }
>(
  'course/updateCourse',
  async (courseData, { rejectWithValue }) => {
    try {
      console.log('updateCourse: updating course with data:', courseData);
      const { courseId, ...updateData } = courseData;
      const response = await api.put<CourseEntity>(`/course/${courseId}`, updateData);
      console.log('updateCourse: response received:', response.data);
      
      // Map API entity to frontend course
      return mapCourseEntityToCourse(response.data);
    } catch (error: any) {
      console.log('updateCourse: error occurred:', error);
      if (error.response) {
        return rejectWithValue({
          message: error.response.data?.message || 'Failed to update course',
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

// Async thunk for deleting a course
export const deleteCourse = createAsyncThunk<
  string,
  string,
  { rejectValue: ApiError }
>(
  'course/deleteCourse',
  async (courseId, { rejectWithValue }) => {
    try {
      console.log('deleteCourse: deleting course with id:', courseId);
      await api.delete(`/course/${courseId}`);
      console.log('deleteCourse: course deleted successfully');
      return courseId;
    } catch (error: any) {
      console.log('deleteCourse: error occurred:', error);
      if (error.response) {
        return rejectWithValue({
          message: error.response.data?.message || 'Failed to delete course',
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

// Async thunk for fetching a single course
export const fetchCourseById = createAsyncThunk<
  Course,
  string,
  { rejectValue: ApiError }
>(
  'course/fetchCourseById',
  async (courseId, { rejectWithValue }) => {
    try {
      console.log('fetchCourseById: fetching course with id:', courseId);
      const response = await api.get<CourseEntity>(`/course/${courseId}`);
      console.log('fetchCourseById: response received:', response.data);
      
      // Map API entity to frontend course
      return mapCourseEntityToCourse(response.data);
    } catch (error: any) {
      console.log('fetchCourseById: error occurred:', error);
      if (error.response) {
        return rejectWithValue({
          message: error.response.data?.message || 'Failed to fetch course',
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

const initialState: CourseState = {
  courses: [],
  currentCourse: null,
  isLoading: false,
  error: null,
  pagination: null,
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setCurrentCourse: (state, action: PayloadAction<Course | null>) => {
      state.currentCourse = action.payload;
    },
    clearCurrentCourse: (state) => {
      state.currentCourse = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch courses
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courses = action.payload.courses;
        state.pagination = action.payload.pagination;
        state.error = null;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Failed to fetch courses';
      });

    // Create course
    builder
      .addCase(createCourse.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courses.push(action.payload);
        state.error = null;
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Failed to create course';
      });

    // Update course
    builder
      .addCase(updateCourse.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.courses.findIndex(course => course.id === action.payload.id);
        if (index !== -1) {
          state.courses[index] = action.payload;
        }
        if (state.currentCourse?.id === action.payload.id) {
          state.currentCourse = action.payload;
        }
        state.error = null;
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Failed to update course';
      });

    // Delete course
    builder
      .addCase(deleteCourse.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courses = state.courses.filter(course => course.id !== action.payload);
        if (state.currentCourse?.id === action.payload) {
          state.currentCourse = null;
        }
        state.error = null;
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Failed to delete course';
      });

    // Fetch course by ID
    builder
      .addCase(fetchCourseById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentCourse = action.payload;
        state.error = null;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Failed to fetch course';
      });
  },
});

export const { clearError, setLoading, setCurrentCourse, clearCurrentCourse } = courseSlice.actions;
export default courseSlice.reducer; 