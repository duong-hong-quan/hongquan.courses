import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StarIcon } from "lucide-react";
import data from "../../../data/course.json";
import ClassSchedule from "@/components/ClassSchedule";
import StudentReviews from "@/components/StudentReviews";

type CourseDetailPageProps = {
  params: {
    id: string;
  };
};

export default async function CourseDetailPage({
  params,
}: CourseDetailPageProps) {
  const courses = [...data.courses, ...data.privateCourse];
  const course = courses.find((c) => c.id === parseInt(params.id));

  if (!course) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <h1 className="text-4xl text-darkgreen font-bold mb-8">{course.title}</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-darkgreen font-bold">
                Mô tả khoá học
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{course.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-darkgreen font-bold">
                Chương trình học
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2">
                {course.syllabus.map((item, index) => (
                  <li key={index} className="text-gray-700">
                    {item}
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-darkgreen font-bold">
                Lịch học các lớp
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ClassSchedule courseId={course.id} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-darkgreen font-bold">
                Đánh giá từ học viên
              </CardTitle>
            </CardHeader>
            <CardContent>
              <StudentReviews courseId={course.id} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="sticky top-4">
            <CardHeader>
              <Image
                src={course.image}
                alt={course.title}
                width={400}
                height={200}
                layout="responsive"
                className="rounded-lg"
              />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <Badge className="text-lg bg-darkgreen text-white px-3 py-1">
                  {course.price.toLocaleString()} VNĐ
                </Badge>
                <span className="text-gray-600">{course.duration}</span>
              </div>
              <p className="text-gray-700">
                <strong>Thời gian:</strong> {course.startDate} -{" "}
                {course.endDate}
              </p>
              <p className="text-gray-700">
                <strong>Mentor:</strong> {course.instructor}
              </p>
              <p className="text-gray-700">
                <strong>Số lượng học viên:</strong> {course.numOfStudents}/ lớp
              </p>
              <Button className="w-full bg-darkgreen text-white hover:bg-darkgreen/90 transition-colors">
                Đăng ký ngay
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-darkgreen font-bold">
                Thông tin Mentor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Image
                  src={course.mentor.image}
                  alt={course.instructor}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{course.mentor.name}</h3>
                  <p className="text-sm text-gray-600">
                    Expert in {course.title}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
