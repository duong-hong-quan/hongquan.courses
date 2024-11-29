import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import data from "../../../data/course.json";
import Image from "next/image";
const courses = data.courses;

export default function CourseDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const course = courses.find((c) => c.id === parseInt(params.id));

  if (!course) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{course?.title}</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Mô tả khoá học</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{course?.description}</p>
            </CardContent>
          </Card>
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Chương trình</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside">
                {course?.syllabus.map((item, index) => (
                  <li key={index} className="mb-2">
                    {item}
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Chi tiết khoá học:</CardTitle>
              <Image
                src={course?.image}
                alt={course?.title}
                layout="responsive"
                width={400}
                height={200}
                className="rounded-lg"
              />
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                <strong>Học phí:</strong> {course?.price.toLocaleString()} VNĐ
              </p>
              <p>
                <strong>Thời gian:</strong> {course?.startDate} -{" "}
                {course?.endDate}
              </p>
              <p>
                <strong>Mentor bởi:</strong> {course?.instructor}
              </p>
              <p>
                <strong>Số lượng học viên:</strong> {course?.numOfStudents}/ lớp
              </p>
              <Button className="w-full">Enroll Now</Button>
            </CardContent>
          </Card>
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Mentor</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{course?.instructor}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
