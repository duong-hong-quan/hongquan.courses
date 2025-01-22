"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, GraduationCap, DollarSign } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const overviewData = [
  {
    title: "Tổng số học viên",
    value: "18",
    icon: Users,
    color: "text-blue-500",
  },
  {
    title: "Lớp đang mở",
    value: "56",
    icon: BookOpen,
    color: "text-green-500",
  },
  {
    title: "Khoá học",
    value: "23",
    icon: GraduationCap,
    color: "text-purple-500",
  },
  {
    title: "Doanh thu",
    value: "$123,456",
    icon: DollarSign,
    color: "text-yellow-500",
  },
];

const growthData = [
  { month: "Jan", students: 1000, revenue: 50000 },
  { month: "Feb", students: 1100, revenue: 55000 },
  { month: "Mar", students: 1200, revenue: 60000 },
  { month: "Apr", students: 1300, revenue: 65000 },
  { month: "May", students: 1400, revenue: 70000 },
  { month: "Jun", students: 1500, revenue: 75000 },
];

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {overviewData.map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {item.title}
              </CardTitle>
              <item.icon className={`h-4 w-4 ${item.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Growth Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={growthData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="students"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
