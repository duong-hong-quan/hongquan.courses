"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookPlus, Pencil, Trash2, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

// Define the Course type
type Course = {
  id: number;
  name: string;
  instructor: string;
  duration: string;
  status: "sắp khai giảng" | "đang diễn ra" | "đã kết thúc";
  students: number;
  description: string;
};

const CourseManagement: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      name: "Lập trình Web Frontend",
      instructor: "Nguyễn Văn A",
      duration: "3 tháng",
      status: "đang diễn ra",
      students: 25,
      description: "Khóa học về HTML, CSS, JavaScript và React",
    },
    {
      id: 2,
      name: "Lập trình Python cơ bản",
      instructor: "Trần Thị B",
      duration: "2 tháng",
      status: "sắp khai giảng",
      students: 20,
      description: "Khóa học lập trình Python cho người mới bắt đầu",
    },
  ]);

  const [newCourse, setNewCourse] = useState<Omit<Course, "id">>({
    name: "",
    instructor: "",
    duration: "",
    status: "sắp khai giảng",
    students: 0,
    description: "",
  });

  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);

  const handleAddCourse = () => {
    if (newCourse.name && newCourse.instructor) {
      setCourses([
        ...courses,
        {
          id: courses.length + 1,
          ...newCourse,
        },
      ]);
      setNewCourse({
        name: "",
        instructor: "",
        duration: "",
        status: "sắp khai giảng",
        students: 0,
        description: "",
      });
      setIsAddDialogOpen(false);
    }
  };

  const handleDeleteCourse = (id: number) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  const getStatusColor = (status: Course["status"]): string => {
    switch (status) {
      case "đang diễn ra":
        return "bg-green-500";
      case "sắp khai giảng":
        return "bg-blue-500";
      case "đã kết thúc":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý Khóa học</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <BookPlus size={16} />
              Thêm khóa học
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Thêm khóa học mới</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Input
                  placeholder="Tên khóa học"
                  value={newCourse.name}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Input
                  placeholder="Giảng viên"
                  value={newCourse.instructor}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, instructor: e.target.value })
                  }
                />
              </div>
              <div>
                <Input
                  placeholder="Thời lượng (VD: 3 tháng)"
                  value={newCourse.duration}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, duration: e.target.value })
                  }
                />
              </div>
              <div>
                <Select
                  value={newCourse.status}
                  onValueChange={(value) =>
                    setNewCourse({
                      ...newCourse,
                      status: value as Course["status"],
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sắp khai giảng">
                      Sắp khai giảng
                    </SelectItem>
                    <SelectItem value="đang diễn ra">Đang diễn ra</SelectItem>
                    <SelectItem value="đã kết thúc">Đã kết thúc</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Input
                  type="number"
                  placeholder="Số lượng học viên"
                  value={newCourse.students.toString()}
                  onChange={(e) =>
                    setNewCourse({
                      ...newCourse,
                      students: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <Textarea
                  placeholder="Mô tả khóa học"
                  value={newCourse.description}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, description: e.target.value })
                  }
                />
              </div>
              <Button onClick={handleAddCourse}>Thêm khóa học</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Tên khóa học</TableHead>
              <TableHead>Giảng viên</TableHead>
              <TableHead>Thời lượng</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Học viên</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.id}</TableCell>
                <TableCell className="font-medium">{course.name}</TableCell>
                <TableCell>{course.instructor}</TableCell>
                <TableCell>{course.duration}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(course.status)}>
                    {course.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Users size={16} />
                    {course.students}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Pencil size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteCourse(course.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CourseManagement;
