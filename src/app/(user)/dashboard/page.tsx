'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/redux/hooks/useAuth';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex gap-2">
              <Link href="/admin/course">
                <Button variant="outline">
                  Quản lý Khóa học
                </Button>
              </Link>
              <Button onClick={handleLogout} variant="outline">
                Đăng xuất
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin người dùng</CardTitle>
                <CardDescription>Chi tiết tài khoản của bạn</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p><strong>Email:</strong> {user?.email}</p>
                  <p><strong>Tên:</strong> {user?.name}</p>
                  <p><strong>Vai trò:</strong> {user?.role}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Khóa học của tôi</CardTitle>
                <CardDescription>Danh sách khóa học đã đăng ký</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Chưa có khóa học nào</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tiến độ học tập</CardTitle>
                <CardDescription>Tổng quan về tiến độ</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p>Khóa học đã hoàn thành: 0</p>
                  <p>Khóa học đang học: 0</p>
                  <p>Điểm trung bình: N/A</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 