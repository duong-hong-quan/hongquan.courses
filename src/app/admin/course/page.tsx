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

export default function CourseManagementPage() {
  const { courses, isLoading, error, getCourses, addCourse, removeCourse, clearCourseError } = useCourse();
  const { isAuthenticated } = useAuth();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState<CreateCourseRequest>({
    courseName: '',
    courseDescription: '',
    courseType: 0,
    mainImage: ''
  });

  useEffect(() => {
    if (isAuthenticated) {
      getCourses();
    }
  }, [isAuthenticated, getCourses]);

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
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa khóa học này?')) {
      const result = await removeCourse(courseId);
      
      if (result.meta.requestStatus === 'fulfilled') {
        toast({
          title: "Thành công",
          description: "Khóa học đã được xóa thành công!",
        });
      }
    }
  };

  const courseTypes = [
    { value: 0, label: 'Programming' },
    { value: 1, label: 'Design' },
    { value: 2, label: 'Business' },
    { value: 3, label: 'Marketing' },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Quản lý Khóa học</h1>
            <Button onClick={() => setShowCreateForm(!showCreateForm)}>
              {showCreateForm ? 'Hủy' : 'Thêm Khóa học'}
            </Button>
          </div>

          {/* Create Course Form */}
          {showCreateForm && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Thêm Khóa học Mới</CardTitle>
                <CardDescription>Điền thông tin khóa học</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateCourse} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="courseName">Tên khóa học</Label>
                      <Input
                        id="courseName"
                        value={formData.courseName}
                        onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                        placeholder="Nhập tên khóa học"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="courseType">Loại khóa học</Label>
                      <Select
                        value={formData.courseType.toString()}
                        onValueChange={(value) => setFormData({ ...formData, courseType: parseInt(value) })}
                      >
                        <SelectTrigger>
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
                    <Label htmlFor="courseDescription">Mô tả</Label>
                    <Textarea
                      id="courseDescription"
                      value={formData.courseDescription}
                      onChange={(e) => setFormData({ ...formData, courseDescription: e.target.value })}
                      placeholder="Nhập mô tả khóa học"
                      rows={4}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="mainImage">Hình ảnh chính</Label>
                    <Input
                      id="mainImage"
                      value={formData.mainImage}
                      onChange={(e) => setFormData({ ...formData, mainImage: e.target.value })}
                      placeholder="URL hình ảnh"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? 'Đang tạo...' : 'Tạo khóa học'}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowCreateForm(false)}
                    >
                      Hủy
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Courses List */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              <div className="col-span-full flex justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
              </div>
            ) : courses.length === 0 ? (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">Chưa có khóa học nào</p>
              </div>
            ) : (
              courses.map((course) => (
                <Card key={course.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{course.courseName}</CardTitle>
                    <CardDescription>
                      Loại: {courseTypes.find(t => t.value === course.courseType)?.label || 'Unknown'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {course.courseDescription}
                    </p>
                    {course.mainImage && (
                      <div className="mb-4">
                        <img 
                          src={course.mainImage} 
                          alt={course.courseName}
                          className="w-full h-32 object-cover rounded"
                        />
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {/* TODO: Edit functionality */}}
                      >
                        Sửa
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteCourse(course.id)}
                      >
                        Xóa
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 