"use client";

import * as React from "react";
import {
  Home,
  Settings,
  Users,
  BarChart,
  FileText,
  HelpCircle,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";

const menuItems = [
  { icon: Home, label: "Tổng quan", href: "/admin" },
  { icon: Users, label: "Người dùng", href: "/admin/member" },
  { icon: BarChart, label: "Quản lí lớp", href: "/admin/class" },
  { icon: FileText, label: "Quản lí khoá", href: "/admin/course" },
  { icon: Settings, label: "Cài đặt hệ thống", href: "/admin/settings" },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="text-2xl font-bold px-4 py-2 text-darkgreen ">
          Mon Edu
        </h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild>
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/help">
                <HelpCircle className="mr-2 h-4 w-4" />
                Help & Support
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
