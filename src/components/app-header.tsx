"use client";

import { Bell, Search, User } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { useCallback } from 'react';
import api from '@/lib/axios';

export function AppHeader() {
  const router = useRouter();

  // Logout handler
  const handleLogout = useCallback(async () => {
    try {
      await api.post('/auth/logout');
      if (typeof window !== 'undefined') {
        localStorage.removeItem('isLogin');
        window.location.href = '/login';
      }
    } catch (err) {
      alert('Đăng xuất thất bại!');
    }
  }, []);

  return (
    <header className="z-10 flex h-16 items-center gap-4 border-b bg-background px-4 shadow-sm">
      <SidebarTrigger />
      <div className="flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full appearance-none bg-white pl-8 md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>
      <Button variant="ghost" size="icon">
        <Bell className="h-5 w-5" />
        <span className="sr-only">Notifications</span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
            <span className="sr-only">User menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => router.push('/admin/profile')}>Xem hồ sơ</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>Đăng xuất</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
