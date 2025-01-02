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
import { CalendarIcon, ClockIcon, UserIcon } from "lucide-react";

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
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <CardHeader className="p-0">
                  <div className="relative h-60 w-full">
                    <Image
                      src={course.image}
                      alt={course.title}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </CardHeader>
                <CardContent className="flex-grow p-6">
                  <CardTitle className="text-2xl font-bold mb-3 text-gray-800">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="mb-4 text-gray-600">
                    {course.description}
                  </CardDescription>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-700">
                      <UserIcon className="w-5 h-5 mr-2 text-darkgreen" />
                      <span>{course.instructor}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <ClockIcon className="w-5 h-5 mr-2 text-darkgreen" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <CalendarIcon className="w-5 h-5 mr-2 text-darkgreen" />
                      <span>
                        {new Date(course.startDate).toLocaleDateString("vi-VN")}{" "}
                        - {new Date(course.endDate).toLocaleDateString("vi-VN")}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center p-6 bg-gray-50">
                  <Button
                    asChild
                    className="bg-darkgreen text-white hover:bg-darkgreen/90 transition-colors duration-300"
                  >
                    <Link href={`/courses/${course.id}`}>Tìm hiểu thêm</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4">
        <motion.h2
          className="text-5xl font-bold text-center mb-16 text-gray-800"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Khoá học kèm
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {privateCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <CardHeader className="p-0">
                  <div className="relative h-60 w-full">
                    <Image
                      src={course.image}
                      alt={course.title}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </CardHeader>
                <CardContent className="flex-grow p-6">
                  <CardTitle className="text-2xl font-bold mb-3 text-gray-800">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="mb-4 text-gray-600">
                    {course.description}
                  </CardDescription>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-700">
                      <UserIcon className="w-5 h-5 mr-2 text-darkgreen" />
                      <span>{course.instructor}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <ClockIcon className="w-5 h-5 mr-2 text-darkgreen" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <CalendarIcon className="w-5 h-5 mr-2 text-darkgreen" />
                      <span>
                        {new Date(course.startDate).toLocaleDateString("vi-VN")}{" "}
                        - {new Date(course.endDate).toLocaleDateString("vi-VN")}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center p-6 bg-gray-50">
                  <Button
                    asChild
                    className="bg-darkgreen text-white hover:bg-darkgreen/90 transition-colors duration-300"
                  >
                    <Link href={`/courses/${course.id}`}>Tìm hiểu thêm</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
