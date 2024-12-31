import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import data from "../../../data/course.json";
import Image from "next/image";

type CourseDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CourseDetailPage({
  params,
}: CourseDetailPageProps) {
  const resolvedParams = await params; // Wait for params to resolve
  console.log("Resolved Params:", resolvedParams); // Log params

  const courses = data.courses;
  console.log("Courses Data:", courses); // Log all courses data

  // Find the course synchronously
  const course =
    courses.find((c) => c.id === parseInt(resolvedParams.id)) ||
    data.privateCourse.find((c) => c.id === parseInt(resolvedParams.id));

  if (!course) {
    notFound();
  }

  // Return the course details JSX
  return (
    <div className="  px-10 py-8 bg-white ">
      <h1 className="text-3xl text-darkgreen font-bold mb-8">{course.title}</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-darkgreen font-bold">
                Mô tả khoá học
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{course.description}</p>
            </CardContent>
          </Card>
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-darkgreen font-bold">
                Chương trình
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside">
                {course.syllabus.map((item, index) => (
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
                src={course.image}
                alt={course.title}
                layout="responsive"
                width={400}
                height={200}
                className="rounded-lg"
              />
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                <strong>Học phí:</strong> {course.price.toLocaleString()} VNĐ
              </p>
              <p>
                <strong>Thời gian:</strong> {course.startDate} -{" "}
                {course.endDate}
              </p>
              <p>
                <strong>Mentor bởi:</strong> {course.instructor}
              </p>
              <p>
                <strong>Số lượng học viên:</strong> {course.numOfStudents}/ lớp
              </p>
              <Button className="w-full bg-darkgreen text-white">
                Tham gia ngay
              </Button>
            </CardContent>
          </Card>
          <Card className="mt-8 text-darkgreen">
            <CardHeader>
              <CardTitle>Mentor</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{course.instructor}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
