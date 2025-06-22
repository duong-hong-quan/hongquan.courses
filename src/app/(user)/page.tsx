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
import { AnimatePresence, motion } from "framer-motion";
import data from "@/data/mentor.json";
import {
  Badge,
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  ClockIcon,
  UserIcon,
} from "lucide-react";
const MotionCard = motion(Card);
const MotionImage = motion(Image);
import dataCourse from "../../data/course.json";
import { useEffect, useState } from "react";
export default function Home() {
  const courses = dataCourse.courses;
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.mentor.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + data.mentor.length) % data.mentor.length
    );
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000); // Auto-advance every 5 seconds
    return () => clearInterval(timer);
  }, []);
  return (
    <>
      <div className=" w-full  bg-darkgreen text-white  p-4 ">
        <div>
          <motion.div
            key={currentIndex}
            className="flex items-center justify-center"
          >
            <div className=" mx-auto px-4 flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/2 text-white pr-8">
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-4xl font-bold mb-4"
                >
                  {data.mentor[currentIndex].name}
                </motion.h2>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-xl mb-4"
                >
                  {data.mentor[currentIndex].role}
                </motion.p>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-lg"
                >
                  {data.mentor[currentIndex].description}
                </motion.p>
              </div>
              <div className="w-full md:w-1/2 mt-8 md:mt-0 h-96">
                <motion.div className="h-96">
                  <img
                    src={data.mentor[currentIndex].image}
                    alt={data.mentor[currentIndex].name}
                    height={500}
                    className="w-full h-full object-contain"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 focus:outline-none"
        >
          <ChevronLeft className="w-6 h-6 text-dark-green" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 focus:outline-none"
        >
          <ChevronRight className="w-6 h-6 text-dark-green" />
        </button>
      </div>
      <div className="min-h-screen mx-auto md:px-10 py-8">
        <main className="flex-grow">
          {/* Hero Section with Carousel */}

          <section className="py-24 ">
            <div className="container mx-auto px-4">
              <motion.h2
                className="text-5xl font-bold text-center mb-16 text-gray-800"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                Các khóa học nổi bật
              </motion.h2>
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
                        <div className=" w-full">
                          <img
                            src={course.image}
                            alt={course.title}
                            className="object-fill w-full h-[15rem] transition-transform duration-300 hover:scale-105"
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
                            <span>{course.mentor.name}</span>
                          </div>
                          <div className="flex items-center text-gray-700">
                            <ClockIcon className="w-5 h-5 mr-2 text-darkgreen" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center text-gray-700">
                            <CalendarIcon className="w-5 h-5 mr-2 text-darkgreen" />
                            <span>
                              {new Date(course.startDate).toLocaleDateString(
                                "vi-VN"
                              )}{" "}
                              -{" "}
                              {new Date(course.endDate).toLocaleDateString(
                                "vi-VN"
                              )}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center p-6 bg-gray-50">
                        <Button
                          asChild
                          className="bg-darkgreen text-white hover:bg-darkgreen/90 transition-colors duration-300"
                        >
                          <Link href={`/courses/${course.id}`}>
                            Tìm hiểu thêm
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
      

          <section className="bg-darkgreen  text-white py-20">
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
                Tham gia cùng hàng nghìn học viên đã thay đổi sự nghiệp của họ
                với các khóa học của chúng tôi.
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
    </>
  );
}
