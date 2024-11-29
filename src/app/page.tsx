"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HeroCarousel } from "@/components/HeroCarousel";
import { motion } from "framer-motion";
import data from "../data/mentor.json";
import { Badge, CalendarIcon, ClockIcon, UserIcon } from "lucide-react";
const MotionCard = motion(Card);
const MotionImage = motion(Image);
import dataCourse from "../data/course.json";
export default function Home() {
  const courses = dataCourse.courses;
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section with Carousel */}
        <section className="  text-black ">{/* <HeroCarousel /> */}</section>

        {/* Mentor Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-4xl font-bold text-center mb-12 uppercase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Gặp gỡ các mentor của chúng tôi
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-12">
              {data.mentor.map((mentor, index) => (
                <MotionCard
                  key={index}
                  className="overflow-hidden"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <CardHeader>
                    <CardTitle>{mentor.name}</CardTitle>
                    <CardDescription>{mentor.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4 h-64 w-64 mx-auto relative overflow-hidden rounded-full">
                      <MotionImage
                        src={mentor.image}
                        alt={mentor.name}
                        width={256}
                        height={256}
                        objectFit="contain"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <p>{mentor.description}</p>
                  </CardContent>
                </MotionCard>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Courses Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-4xl font-bold text-center mb-12 uppercase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Các khóa học nổi bật
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
              {courses.map((course, index) => (
                <MotionCard
                  key={index}
                  className="flex flex-col"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <CardHeader className="p-0">
                    <div className="relative h-48 w-full">
                      <Image
                        src={course.image}
                        alt={course.title}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow p-6">
                    <CardTitle className="text-xl mb-2">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="mb-4">
                      {course.description}
                    </CardDescription>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <UserIcon className="w-4 h-4 mr-2" />
                        <span className="text-sm">{course.instructor}</span>
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="w-4 h-4 mr-2" />
                        <span className="text-sm">{course.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        <span className="text-sm">
                          {new Date(course.startDate).toLocaleDateString(
                            "vi-VN"
                          )}{" "}
                          -{" "}
                          {new Date(course.endDate).toLocaleDateString("vi-VN")}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center p-6 bg-gray-50">
                    <Badge className="text-lg font-semibold">
                      {course.price.toLocaleString("vi-VN")} ₫
                    </Badge>
                    <Button asChild>
                      <Link href={`/courses/${course.id}`}>Tìm hiểu thêm</Link>
                    </Button>
                  </CardFooter>
                </MotionCard>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-4xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Học viên nói gì về chúng tôi
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[].map((testimonial, index) => (
                <MotionCard
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <CardContent className="p-6">
                    <p className="text-lg mb-4">"{testimonial?.testimonial}"</p>
                    <p className="font-semibold">{testimonial?.name}</p>
                    <p className="text-sm text-gray-600">
                      {testimonial?.course}
                    </p>
                  </CardContent>
                </MotionCard>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r  text-black py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              className="text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Sẵn sàng bắt đầu sự nghiệp IT của bạn?
            </motion.h2>
            <motion.p
              className="text-xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Tham gia cùng hàng nghìn học viên đã thay đổi sự nghiệp của họ với
              các khóa học của chúng tôi.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button size="lg" variant="secondary" asChild>
                <Link href="/login">Bắt đầu ngay hôm nay</Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
