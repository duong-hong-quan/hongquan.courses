'use client';

import { useEffect, useState } from 'react';
import { useCourse } from '@/redux/hooks/useCourse';
import { useAuth } from '@/redux/hooks/useAuth';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { CreateCourseRequest } from '@/redux/types/course';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { useRouter, useSearchParams } from 'next/navigation';
import { DynamicFilter, FilterField, FilterOption } from '@/components/DynamicFilter';
import { motion } from 'framer-motion';

// Course filter metadata
const courseFilterFields: FilterField[] = [
  { property: 'courseName', label: 'Tên khóa học', type: 'string', operators: ['equals', 'contains'] },
  { property: 'courseType', label: 'Loại', type: 'enum', operators: ['equals'], options: [
    { value: 0, label: 'Basic' }, { value: 1, label: 'Front-End' }, { value: 2, label: 'Back-End' }
  ]},
  { property: 'isDeleted', label: 'Trạng thái', type: 'boolean', operators: ['equals'], options: [
    { value: 'false', label: 'Hoạt động' }, { value: 'true', label: 'Đã xóa' }
  ]}
];

export default function CourseManagementPage() {
  const { courses, isLoading, error, getCourses, addCourse, removeCourse, clearCourseError, editCourse } = useCourse();
  const { isAuthenticated } = useAuth();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState<CreateCourseRequest>({
    courseName: '',
    courseDescription: '',
    courseType: 0,
    mainImage: ''
  });
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editCourseData, setEditCourseData] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteCourseId, setDeleteCourseId] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Dynamic filter state
  const [filters, setFilters] = useState<FilterOption[]>(courseFilterFields.map(f => ({ property: f.property, value: '', operator: f.operators[0] })));
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [isFilterReady, setIsFilterReady] = useState(false);

  // Sync filter state from URL on mount
  useEffect(() => {
    // Khi F5 hoặc vào link có filter, parse filter từ URL
    const url = new URL(window.location.href);
    const newFilters: FilterOption[] = courseFilterFields.map(f => ({ property: f.property, value: '', operator: f.operators[0] }));
    let found = false;
    for (let i = 0; ; i++) {
      const property = url.searchParams.get(`filters[${i}][property]`);
      const value = url.searchParams.get(`filters[${i}][value]`);
      const operator = url.searchParams.get(`filters[${i}][operator]`);
      if (!property) break;
      const idx = newFilters.findIndex(f => f.property === property);
      if (idx !== -1 && value && value !== 'all') {
        newFilters[idx] = { property, value, operator: operator || newFilters[idx].operator };
        found = true;
      }
    }
    if (found) setFilters(newFilters);
    setIsFilterReady(true);
  }, []);

  // Always sync filter param on URL with state
  useEffect(() => {
    const url = new URL(window.location.href);
    // Xóa toàn bộ filter param cũ
    Array.from(url.searchParams.keys()).forEach(key => {
      if (key.startsWith('filters[')) url.searchParams.delete(key);
    });
    // Thêm lại filter mới (nếu có)
    filters.forEach((filter, index) => {
      if (filter.value && filter.value !== 'all') {
        url.searchParams.set(`filters[${index}][property]`, filter.property);
        url.searchParams.set(`filters[${index}][value]`, filter.value);
        url.searchParams.set(`filters[${index}][operator]`, filter.operator);
      }
    });
    url.searchParams.set('page', String(page));
    url.searchParams.set('pageSize', String(pageSize));
    router.replace(url.pathname + url.search, { scroll: false });
  }, [filters, page, pageSize, router]);

  // Khi reset filter, xóa toàn bộ filter param khỏi URL và reset state
  const handleResetFilters = () => {
    setFilters(courseFilterFields.map(f => ({ property: f.property, value: '', operator: f.operators[0] })));
    setPage(1);
    setPageSize(10);
    const url = new URL(window.location.href);
    Array.from(url.searchParams.keys()).forEach(key => {
      if (key.startsWith('filters[')) url.searchParams.delete(key);
    });
    url.searchParams.set('page', '1');
    url.searchParams.set('pageSize', '10');
    router.replace(url.pathname + url.search, { scroll: false });
  };

  // Fetch courses when filters/page/pageSize change
  useEffect(() => {
    if (isAuthenticated && isFilterReady) {
      const params: any = {
        page: page,
        pageSize: pageSize,
      };
      const filterArr = filters.filter(f => f.value !== '' && f.value !== 'all');
      if (filterArr.length > 0) {
        params.filters = filterArr;
      }
      getCourses(params);
    }
  }, [isAuthenticated, isFilterReady, filters, page, pageSize, getCourses]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Lỗi",
        description: error,
        variant: "destructive",
      });
      clearCourseError();
    }
  }, [error, clearCourseError]);

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.courseName || !formData.courseDescription) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin",
        variant: "destructive",
      });
      return;
    }

    const result = await addCourse(formData);
    
    if (result.meta.requestStatus === 'fulfilled') {
      toast({
        title: "Thành công",
        description: "Khóa học đã được tạo thành công!",
      });
      setShowCreateForm(false);
      setFormData({
        courseName: '',
        courseDescription: '',
        courseType: 0,
        mainImage: ''
      });
      await getCourses();
    }
  };

  const handleEditClick = (course: any) => {
    setEditCourseData({ ...course });
    setEditDialogOpen(true);
  };

  const handleEditCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editCourseData.courseName || !editCourseData.courseDescription) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin",
        variant: "destructive",
      });
      return;
    }
    const result = await editCourse({
      courseId: editCourseData.id,
      courseName: editCourseData.courseName,
      courseDescription: editCourseData.courseDescription,
      courseType: editCourseData.courseType,
      mainImage: editCourseData.mainImage,
    });
    if (result.meta.requestStatus === 'fulfilled') {
      toast({
        title: "Thành công",
        description: "Khóa học đã được cập nhật!",
      });
      setEditDialogOpen(false);
      setEditCourseData(null);
      await getCourses();
    }
  };

  const handleDeleteClick = (courseId: string) => {
    setDeleteCourseId(courseId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteCourseId) {
      const result = await removeCourse(deleteCourseId);
      if (result.meta.requestStatus === 'fulfilled') {
        toast({
          title: "Thành công",
          description: "Khóa học đã được xóa thành công!",
        });
      }
      setDeleteDialogOpen(false);
      setDeleteCourseId(null);
    }
  };

  const courseTypes = [
    { value: 0, label: 'Basic' },
    { value: 1, label: 'Front-End' },
    { value: 2, label: 'Back-End' },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-between items-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
              Quản lý Khóa học
            </h1>
            <Button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="bg-darkgreen hover:bg-darkgreen text-white transition-colors duration-200"
            >
              {showCreateForm ? 'Hủy' : 'Thêm Khóa học'}
            </Button>
          </motion.div>

          {/* Dynamic Filter UI */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mb-6 shadow-lg border-none bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-700">Bộ lọc</CardTitle>
              </CardHeader>
              <CardContent>
                <DynamicFilter
                  fields={courseFilterFields}
                  value={filters}
                  onChange={setFilters}
                  onReset={handleResetFilters}
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Create Course Form */}
          {showCreateForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="mb-8 shadow-lg border-none bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-700">Thêm Khóa học Mới</CardTitle>
                  <CardDescription className="text-gray-500">Điền thông tin khóa học</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateCourse} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="courseName" className="text-sm font-medium text-gray-600">Tên khóa học</Label>
                        <Input
                          id="courseName"
                          value={formData.courseName}
                          onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                          placeholder="Nhập tên khóa học"
                          required
                          className="mt-1 border-gray-200 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <Label htmlFor="courseType" className="text-sm font-medium text-gray-600">Loại khóa học</Label>
                        <Select
                          value={formData.courseType.toString()}
                          onValueChange={(value) => setFormData({ ...formData, courseType: parseInt(value) })}
                        >
                          <SelectTrigger className="mt-1 border-gray-200 focus:ring-blue-500 focus:border-blue-500">
                            <SelectValue placeholder="Chọn loại khóa học" />
                          </SelectTrigger>
                          <SelectContent>
                            {courseTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value.toString()}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="courseDescription" className="text-sm font-medium text-gray-600">Mô tả</Label>
                      <Textarea
                        id="courseDescription"
                        value={formData.courseDescription}
                        onChange={(e) => setFormData({ ...formData, courseDescription: e.target.value })}
                        placeholder="Nhập mô tả khóa học"
                        rows={4}
                        required
                        className="mt-1 border-gray-200 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="mainImage" className="text-sm font-medium text-gray-600">Hình ảnh chính</Label>
                      <Input
                        id="mainImage"
                        value={formData.mainImage}
                        onChange={(e) => setFormData({ ...formData, mainImage: e.target.value })}
                        placeholder="URL hình ảnh"
                        className="mt-1 border-gray-200 focus:ring-blue-500 focus:border-blue-500"
                      />
                      {formData.mainImage && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="mt-3"
                        >
                          <img
                            src={formData.mainImage}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded-lg border border-gray-200 shadow-sm"
                            onError={e => (e.currentTarget.style.display = 'none')}
                          />
                        </motion.div>
                      )}
                    </div>
                    <div className="flex gap-3">
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="bg-darkgreen hover:bg-darkgreen text-white transition-colors duration-200"
                      >
                        {isLoading ? 'Đang tạo...' : 'Tạo khóa học'}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowCreateForm(false)}
                        className="border-gray-300 hover:bg-gray-100 transition-colors duration-200"
                      >
                        Hủy
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Courses List as Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="shadow-lg border-none bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-700">Danh sách Khóa học</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-600"></div>
                  </div>
                ) : courses.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">Chưa có khóa học nào</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-gray-50">
                          <TableHead className="w-[200px] text-gray-600 font-semibold">Tên khóa học</TableHead>
                          <TableHead className="text-gray-600 font-semibold">Loại</TableHead>
                          <TableHead className="w-[300px] text-gray-600 font-semibold">Mô tả</TableHead>
                          <TableHead className="text-gray-600 font-semibold">Hình ảnh</TableHead>
                          <TableHead className="w-[150px] text-right text-gray-600 font-semibold">Hành động</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {courses.map((course) => (
                          <TableRow key={course.id} className="hover:bg-gray-50 transition-colors duration-150">
                            <TableCell className="font-medium text-gray-800">{course.courseName}</TableCell>
                            <TableCell className="text-gray-600">
                              {courseTypes.find(t => t.value === course.courseType)?.label || 'Unknown'}
                            </TableCell>
                            <TableCell className="text-gray-600 line-clamp-2">{course.courseDescription}</TableCell>
                            <TableCell>
                              {course.mainImage ? (
                                <motion.img
                                  src={course.mainImage}
                                  alt={course.courseName}
                                  className="w-16 h-16 object-cover rounded-lg border border-gray-200 shadow-sm"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.3 }}
                                />
                              ) : (
                                <span className="text-gray-400">Không có hình</span>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditClick(course)}
                                  className="border-gray-300 text-darkgreen  hover:bg-blue-50 transition-colors duration-200"
                                >
                                  Sửa
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => handleDeleteClick(course.id)}
                                  className="bg-red-600 hover:bg-red-700 text-white transition-colors duration-200"
                                >
                                  Xóa
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Edit Course Dialog */}
          <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
            <DialogContent className="sm:max-w-[600px] bg-white/95 backdrop-blur-sm">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-gray-700">Sửa Khóa học</DialogTitle>
                <DialogDescription className="text-gray-500">Chỉnh sửa thông tin khóa học</DialogDescription>
              </DialogHeader>
              {editCourseData && (
                <form onSubmit={handleEditCourse} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="editCourseName" className="text-sm font-medium text-gray-600">Tên khóa học</Label>
                      <Input
                        id="editCourseName"
                        value={editCourseData.courseName}
                        onChange={(e) => setEditCourseData({ ...editCourseData, courseName: e.target.value })}
                        placeholder="Nhập tên khóa học"
                        required
                        className="mt-1 border-gray-200 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="editCourseType" className="text-sm font-medium text-gray-600">Loại khóa học</Label>
                      <Select
                        value={editCourseData.courseType?.toString()}
                        onValueChange={(value) => setEditCourseData({ ...editCourseData, courseType: parseInt(value) })}
                      >
                        <SelectTrigger className="mt-1 border-gray-200 focus:ring-blue-500 focus:border-blue-500">
                          <SelectValue placeholder="Chọn loại khóa học" />
                        </SelectTrigger>
                        <SelectContent>
                          {courseTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value.toString()}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="editCourseDescription" className="text-sm font-medium text-gray-600">Mô tả</Label>
                    <Textarea
                      id="editCourseDescription"
                      value={editCourseData.courseDescription}
                      onChange={(e) => setEditCourseData({ ...editCourseData, courseDescription: e.target.value })}
                      placeholder="Nhập mô tả khóa học"
                      rows={4}
                      required
                      className="mt-1 border-gray-200 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="editMainImage" className="text-sm font-medium text-gray-600">Hình ảnh chính</Label>
                    <Input
                      id="editMainImage"
                      value={editCourseData.mainImage || ''}
                      onChange={(e) => setEditCourseData({ ...editCourseData, mainImage: e.target.value })}
                      placeholder="URL hình ảnh"
                      className="mt-1 border-gray-200 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {editCourseData.mainImage && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="mt-3"
                      >
                        <img
                          src={editCourseData.mainImage}
                          alt="Preview"
                          className="w-32 h-32 object-cover rounded-lg border border-gray-200 shadow-sm"
                          onError={e => (e.currentTarget.style.display = 'none')}
                        />
                      </motion.div>
                    )}
                  </div>
                  <DialogFooter>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-darkgreen hover:bg-darkgreen text-white transition-colors duration-200"
                    >
                      {isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
                    </Button>
                    <DialogClose asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className="border-gray-300 hover:bg-gray-100 transition-colors duration-200"
                      >
                        Hủy
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </form>
              )}
            </DialogContent>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogContent className="sm:max-w-[425px] bg-white/95 backdrop-blur-sm">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-gray-700">Xác nhận xóa</DialogTitle>
                <DialogDescription className="text-gray-500">
                  Bạn có chắc chắn muốn xóa khóa học này? Hành động này không thể hoàn tác.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="destructive"
                  onClick={handleConfirmDelete}
                  disabled={isLoading}
                  className="bg-red-600 hover:bg-red-700 text-white transition-colors duration-200"
                >
                  {isLoading ? 'Đang xóa...' : 'Xóa'}
                </Button>
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="border-gray-300 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Hủy
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </ProtectedRoute>
  );
}