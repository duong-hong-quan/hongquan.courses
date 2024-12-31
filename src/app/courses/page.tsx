"use client";
import Link from "next/link";
import { motion } from "framer-motion"; // Import motion from framer-motion
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import data from "../../data/course.json";
import Image from "next/image";

const courses = data.courses;
const privateCourses = data.privateCourse; // Assuming private courses are in this array

export default function CoursesPage() {
  return (
    <div className=" mx-auto px-10 bg-white py-8">
      {/* Regular Courses Section */}
      <motion.h1
        className="text-3xl text-darkgreen text-center uppercase font-bold mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Các khoá học
      </motion.h1>

      {/* Regular Courses Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.3, duration: 1 }} // Staggered animation for each card
          >
            <Card>
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative w-full h-48">
                  <Image
                    src={course.image}
                    alt={course.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <p className="text-lg font-semibold">
                  {course.price.toLocaleString()} VND
                </p>
                <p>Mentor bởi: {course.instructor}</p>
                <p>{course.numOfStudents} sinh viên/ lớp</p>
              </CardContent>
              <CardFooter>
                <Button className="bg-darkgreen text-white" asChild>
                  <Link href={`/courses/${course.id}`}>Xem chi tiết</Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Private Courses Section */}
      <motion.h2
        className="text-2xl text-darkgreen text-center uppercase font-bold mt-12 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Khoá học riêng
      </motion.h2>

      {/* Private Courses Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {privateCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.3, duration: 1 }} // Staggered animation for each card
          >
            <Card>
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative w-full h-48">
                  <Image
                    src={course.image}
                    alt={course.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <p className="text-lg font-semibold">
                  Học phí: Liên hệ qua Facebook để biết giá
                </p>
                <p>Mentor bởi: {course.instructor}</p>
                <p>{course.numOfStudents} sinh viên/ lớp</p>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href={`/courses/${course.id}`}>Xem chi tiết</Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
