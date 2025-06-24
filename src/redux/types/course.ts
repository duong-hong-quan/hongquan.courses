// Course entity interface matching the API response
export interface CourseEntity {
  courseId: string;
  courseName: string;
  courseDescription: string;
  courseType: number;
  classes: any[] | null;
  courseRegisters: any[] | null;
  createDate: string;
  updateDate: string;
  createBy: string;
  updateBy: string | null;
  isDeleted: boolean;
  deletedBy: string | null;
  deletedDate: string | null;
  mainImage?: string;
}

// Pagination metadata
export interface PaginationMeta {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  isFirstPage: boolean;
  isLastPage: boolean;
}

// API response wrapper
export interface ApiResponse<T> {
  data: T;
  message: string;
  code: number;
}

// Course list response with pagination
export interface CourseListResponse {
  items: CourseEntity[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  isFirstPage: boolean;
  isLastPage: boolean;
}

// Full API response for courses
export interface CourseApiResponse extends ApiResponse<CourseListResponse> {}

// Frontend Course interface (mapped from API)
export interface Course {
  id: string;
  courseName: string;
  courseDescription: string;
  courseType: number;
  mainImage?: string;
  createdAt?: string;
  updatedAt?: string;
  isDeleted: boolean;
}

// Request interfaces
export interface CreateCourseRequest {
  courseName: string;
  courseDescription: string;
  courseType: number;
  mainImage?: string;
}

export interface UpdateCourseRequest {
  courseId: string;
  courseName?: string;
  courseDescription?: string;
  courseType?: number;
  mainImage?: string;
}

// State interfaces
export interface CourseState {
  courses: Course[];
  currentCourse: Course | null;
  isLoading: boolean;
  error: string | null;
  pagination: PaginationMeta | null;
}

export interface ApiError {
  message: string;
  statusCode: number;
}

// Legacy interface for backward compatibility
export interface CourseResponse {
  data: Course[];
  totalCount: number;
  pageSize: number;
  currentPage: number;
} 