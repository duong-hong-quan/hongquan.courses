// Example usage of the new API response types and mapping functions

import { CourseApiResponse, CourseEntity } from '@/redux/types/course';
import { mapCourseApiResponseToCourses, mapCourseEntityToCourse } from './courseMapper';

// Example API response matching your structure
const exampleApiResponse: CourseApiResponse = {
  data: {
    items: [
      {
        courseId: "e1f8b7bc-dca4-45cc-b363-8a31444d4b4c",
        courseName: "test",
        courseDescription: "tesst",
        courseType: 0,
        classes: null,
        courseRegisters: null,
        createDate: "2025-06-22T17:02:09.150507Z",
        updateDate: "0001-01-01T00:00:00",
        createBy: "",
        updateBy: null,
        isDeleted: false,
        deletedBy: null,
        deletedDate: null
      }
    ],
    totalItems: 1,
    totalPages: 1,
    currentPage: 0,
    pageSize: 0,
    isFirstPage: true,
    isLastPage: false
  },
  message: "",
  code: 200
};

// Example of how to use the mapping functions
export function exampleUsage() {
  // 1. Map the entire API response to frontend format
  const mappedData = mapCourseApiResponseToCourses(exampleApiResponse);
  console.log('Mapped courses:', mappedData.courses);
  console.log('Pagination info:', mappedData.pagination);

  // 2. Map a single course entity
  const singleCourseEntity: CourseEntity = exampleApiResponse.data.items[0];
  const mappedCourse = mapCourseEntityToCourse(singleCourseEntity);
  console.log('Mapped single course:', mappedCourse);

  // 3. Access pagination information
  const { totalItems, totalPages, currentPage, isFirstPage, isLastPage } = mappedData.pagination;
  console.log(`Page ${currentPage + 1} of ${totalPages} (${totalItems} total items)`);
  console.log(`Is first page: ${isFirstPage}, Is last page: ${isLastPage}`);

  // 4. Use in React components
  return {
    courses: mappedData.courses,
    pagination: mappedData.pagination,
    hasMorePages: !isLastPage,
    hasPreviousPages: !isFirstPage
  };
}

// Example of how to handle the response in a React component
export function exampleReactUsage() {
  // This would typically be in a React component or custom hook
  const handleApiResponse = (response: CourseApiResponse) => {
    if (response.code === 200) {
      const { courses, pagination } = mapCourseApiResponseToCourses(response);
      
      // Use the mapped data in your component state
      return {
        courses,
        pagination,
        totalItems: pagination.totalItems,
        currentPage: pagination.currentPage,
        totalPages: pagination.totalPages,
        canLoadMore: !pagination.isLastPage,
        canLoadPrevious: !pagination.isFirstPage
      };
    } else {
      throw new Error(response.message || 'API request failed');
    }
  };

  return handleApiResponse;
}

// Example of filtering and validation
export function exampleFiltering() {
  const { courses, pagination } = mapCourseApiResponseToCourses(exampleApiResponse);
  
  // Filter out deleted courses
  const activeCourses = courses.filter(course => !course.isDeleted);
  
  // Filter by course type
  const publicCourses = courses.filter(course => course.courseType === 0);
  
  // Search by name
  const searchTerm = 'test';
  const searchResults = courses.filter(course => 
    course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    allCourses: courses,
    activeCourses,
    publicCourses,
    searchResults
  };
} 