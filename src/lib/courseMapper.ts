import { CourseEntity, Course, CourseApiResponse, CourseListResponse } from '@/redux/types/course';

/**
 * Maps API course entity to frontend course model
 */
export function mapCourseEntityToCourse(entity: CourseEntity): Course {
  return {
    id: entity.courseId,
    courseName: entity.courseName,
    courseDescription: entity.courseDescription,
    courseType: entity.courseType,
    mainImage: entity.mainImage || undefined,
    createdAt: entity.createDate,
    updatedAt: entity.updateDate !== '0001-01-01T00:00:00' ? entity.updateDate : undefined,
    isDeleted: entity.isDeleted,
  };
}

/**
 * Maps frontend course model to API course entity
 */
export function mapCourseToCourseEntity(course: Course): Partial<CourseEntity> {
  return {
    courseId: course.id,
    courseName: course.courseName,
    courseDescription: course.courseDescription,
    courseType: course.courseType,
    createDate: course.createdAt || new Date().toISOString(),
    updateDate: course.updatedAt || new Date().toISOString(),
    isDeleted: course.isDeleted,
  };
}

/**
 * Maps API response to frontend course list with pagination
 */
export function mapCourseApiResponseToCourses(response: CourseApiResponse): {
  courses: Course[];
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    isFirstPage: boolean;
    isLastPage: boolean;
  };
} {
  const courses = response.data.items.map(mapCourseEntityToCourse);
  
  return {
    courses,
    pagination: {
      totalItems: response.data.totalItems,
      totalPages: response.data.totalPages,
      currentPage: response.data.currentPage,
      pageSize: response.data.pageSize,
      isFirstPage: response.data.isFirstPage,
      isLastPage: response.data.isLastPage,
    },
  };
}

/**
 * Maps course list response to frontend format
 */
export function mapCourseListResponseToCourses(response: CourseListResponse): {
  courses: Course[];
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    isFirstPage: boolean;
    isLastPage: boolean;
  };
} {
  const courses = response.items.map(mapCourseEntityToCourse);
  
  return {
    courses,
    pagination: {
      totalItems: response.totalItems,
      totalPages: response.totalPages,
      currentPage: response.currentPage,
      pageSize: response.pageSize,
      isFirstPage: response.isFirstPage,
      isLastPage: response.isLastPage,
    },
  };
}

/**
 * Validates if a course entity is valid (not deleted and has required fields)
 */
export function isValidCourse(entity: CourseEntity): boolean {
  return (
    !entity.isDeleted &&
    !!entity.courseId &&
    !!entity.courseName &&
    !!entity.courseDescription
  );
}

/**
 * Filters out invalid courses from a list
 */
export function filterValidCourses(entities: CourseEntity[]): CourseEntity[] {
  return entities.filter(isValidCourse);
}

/**
 * Maps and filters courses from API response
 */
export function mapAndFilterCourses(response: CourseApiResponse): {
  courses: Course[];
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    isFirstPage: boolean;
    isLastPage: boolean;
  };
} {
  const validEntities = filterValidCourses(response.data.items);
  const courses = validEntities.map(mapCourseEntityToCourse);
  
  return {
    courses,
    pagination: {
      totalItems: response.data.totalItems,
      totalPages: response.data.totalPages,
      currentPage: response.data.currentPage,
      pageSize: response.data.pageSize,
      isFirstPage: response.data.isFirstPage,
      isLastPage: response.data.isLastPage,
    },
  };
} 