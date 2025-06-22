"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icon";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/redux/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login, isLoading, error, isAuthenticated, clearAuthError } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  // Show error toast when there's an error
  useEffect(() => {
    if (error) {
      toast({
        title: "Đăng nhập thất bại",
        description: error,
        variant: "destructive",
      });
      clearAuthError();
    }
  }, [error, clearAuthError]);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập đầy đủ email và mật khẩu",
        variant: "destructive",
      });
      return;
    }

    const result = await login({ email, password });
    
    if (result.meta.requestStatus === 'fulfilled') {
      toast({
        title: "Đăng nhập thành công",
        description: "Chào mừng bạn trở lại!",
      });
      router.push("/dashboard");
    }
  }

  return (
    <div className="flex h-screen text-black bg-white flex-col items-center justify-center">
      <Card className="px-8 w-full max-w-md py-4">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-xl font-semibold text-darkgreen animate-in tracking-tight">
              MonEdu - Học để đi làm
            </h1>
            <p className="text-sm text-darkgreen">
              Vui lòng nhập email và mật khẩu để đăng nhập
            </p>
          </div>
          <div className="grid gap-6">
            <form onSubmit={onSubmit}>
              <div className="grid gap-2">
                <div className="grid gap-1">
                  <Label className="text-darkgreen text-sm" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    id="email"
                    placeholder="name@fpt.edu.vn"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-1">
                  <Label className="text-darkgreen text-sm" htmlFor="password">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    autoCapitalize="none"
                    autoComplete="current-password"
                    autoCorrect="off"
                    disabled={isLoading}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button
                  className="bg-darkgreen text-white border-2 hover:bg-darkgreen my-2 hover:text-white"
                  disabled={isLoading}
                  type="submit"
                >
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Đăng nhập
                </Button>
              </div>
            </form>
          </div>
          <p className="px-8 text-center text-sm text-darkgreen">
            <Link
              href="/register"
              className="hover:text-brand underline underline-offset-4"
            >
              Bạn chưa có tài khoản? Đăng ký ngay
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
