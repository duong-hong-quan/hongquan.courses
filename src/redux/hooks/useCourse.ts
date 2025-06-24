import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { 
  fetchCourses, 
  createCourse, 
  updateCourse, 
  deleteCourse, 
  fetchCourseById,
  clearError, 
  setLoading,
  setCurrentCourse,
  clearCurrentCourse
} from '../slices/courseSlice';
import { CreateCourseRequest, UpdateCourseRequest } from '../types/course';

export const useCourse = () => {
  const dispatch = useAppDispatch();
  const course = useAppSelector((state) => state.course);

  // Log course state changes
  useEffect(() => {
    console.log('useCourse: course state changed:', {
      coursesCount: course.courses.length,
      isLoading: course.isLoading,
      hasCurrentCourse: !!course.currentCourse,
      error: course.error
    });
  }, [course.courses.length, course.isLoading, course.currentCourse, course.error]);

  const getCourses = useCallback(async (params = {}) => {
    console.log('useCourse: getCourses called', params);
    const result = await dispatch(fetchCourses(params));
    console.log('useCourse: getCourses result:', result);
    return result;
  }, [dispatch]);

  const addCourse = useCallback(async (courseData: CreateCourseRequest) => {
    console.log('useCourse: addCourse called with:', courseData);
    const result = await dispatch(createCourse(courseData));
    console.log('useCourse: addCourse result:', result);
    return result;
  }, [dispatch]);

  const editCourse = useCallback(async (courseData: UpdateCourseRequest) => {
    console.log('useCourse: editCourse called with:', courseData);
    const result = await dispatch(updateCourse(courseData));
    console.log('useCourse: editCourse result:', result);
    return result;
  }, [dispatch]);

  const removeCourse = useCallback(async (courseId: string) => {
    console.log('useCourse: removeCourse called with id:', courseId);
    const result = await dispatch(deleteCourse(courseId));
    console.log('useCourse: removeCourse result:', result);
    return result;
  }, [dispatch]);

  const getCourseById = useCallback(async (courseId: string) => {
    console.log('useCourse: getCourseById called with id:', courseId);
    const result = await dispatch(fetchCourseById(courseId));
    console.log('useCourse: getCourseById result:', result);
    return result;
  }, [dispatch]);

  const clearCourseError = useCallback(() => {
    console.log('useCourse: clearCourseError called');
    dispatch(clearError());
  }, [dispatch]);

  const setLoadingState = useCallback((loading: boolean) => {
    console.log('useCourse: setLoadingState called with:', loading);
    dispatch(setLoading(loading));
  }, [dispatch]);

  const selectCourse = useCallback((course: any) => {
    console.log('useCourse: selectCourse called with:', course);
    dispatch(setCurrentCourse(course));
  }, [dispatch]);

  const deselectCourse = useCallback(() => {
    console.log('useCourse: deselectCourse called');
    dispatch(clearCurrentCourse());
  }, [dispatch]);

  return {
    // State
    courses: course.courses,
    currentCourse: course.currentCourse,
    isLoading: course.isLoading,
    error: course.error,

    // Actions
    getCourses,
    addCourse,
    editCourse,
    removeCourse,
    getCourseById,
    clearCourseError,
    setLoadingState,
    selectCourse,
    deselectCourse,
  };
}; 