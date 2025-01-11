"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/", label: "Trang chủ" },
    { href: "/courses", label: "Khoá học" },
    { href: "/about", label: "Giới thiệu" },
    { href: "/contact", label: "Liên hệ" },
    { href: "/blog", label: "Tài liệu" },
  ];

  const NavLinks = () => (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="flex items-center text-sm font-medium text-darkgreen md:text-white"
          onClick={() => setIsOpen(false)}
        >
          {link.label}
        </Link>
      ))}
    </>
  );

  return (
    <header className="bg-darkgreen text-white sticky top-0 z-40 w-full border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 ">
            <span className="inline-block font-bold text-white">Mon.Edu</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden text-darkgreen md:flex md:gap-6">
            <NavLinks />
          </nav>

          <div className="flex text-white items-center space-x-4">
            <div className="hidden md:block">
              <Link className="text-white" href={"/login"}>
                Đăng nhập
              </Link>
            </div>

            {/* Mobile Navigation */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden text-white bg-darkgreen"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <NavLinks />
                  <Link href={"/login"}>Đăng nhập</Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
