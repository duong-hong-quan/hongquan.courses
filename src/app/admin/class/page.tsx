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
import { UserPlus, Pencil, Trash2 } from "lucide-react";

// Define the Student type
type Student = {
  id: number;
  name: string;
  age: number;
  grade: string;
};

const ClassroomManagement: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: "Nguyễn Văn A", age: 18, grade: "12A1" },
    { id: 2, name: "Trần Thị B", age: 17, grade: "12A1" },
    { id: 3, name: "Lê Văn C", age: 18, grade: "12A1" },
  ]);

  const [newStudent, setNewStudent] = useState<Omit<Student, "id">>({
    name: "",
    age: 0,
    grade: "",
  });

  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.age && newStudent.grade) {
      setStudents([
        ...students,
        {
          id: students.length + 1,
          ...newStudent,
        },
      ]);
      setNewStudent({ name: "", age: 0, grade: "" });
      setIsAddDialogOpen(false);
    }
  };

  const handleDeleteStudent = (id: number) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý Lớp học</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <UserPlus size={16} />
              Thêm học sinh
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thêm học sinh mới</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Input
                  placeholder="Tên học sinh"
                  value={newStudent.name}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Input
                  type="number"
                  placeholder="Tuổi"
                  value={newStudent.age}
                  onChange={(e) =>
                    setNewStudent({
                      ...newStudent,
                      age: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <Input
                  placeholder="Lớp"
                  value={newStudent.grade}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, grade: e.target.value })
                  }
                />
              </div>
              <Button onClick={handleAddStudent}>Thêm</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Tên</TableHead>
              <TableHead>Tuổi</TableHead>
              <TableHead>Lớp</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.age}</TableCell>
                <TableCell>{student.grade}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Pencil size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteStudent(student.id)}
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

export default ClassroomManagement;
