"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const carouselItems = [
  {
    title: "Nắm vững kỹ năng CNTT với các khóa học do các anh mentor hướng dẫn",
    description:
      "Khai phá tiềm năng của bạn trong phát triển web với ReactJS, NextJS, và NestJS.",
    image: "/images/hero-1.jpg",
  },
  {
    title: "Học từ những chuyên gia trong ngành",
    description:
      "Các mentor của chúng tôi có nhiều năm kinh nghiệm trong phát triển web thực tế.",
    image: "/images/hero-2.jpg",
  },
  {
    title: "Xây dựng dự án thực tế",
    description:
      "Áp dụng kiến thức của bạn vào các dự án thực tế và xây dựng portfolio ấn tượng.",
    image: "/images/hero-3.jpg",
  },
];

export function HeroCarousel() {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {carouselItems.map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-video items-center justify-center p-6 relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white p-8">
                    <h2 className="text-3xl font-bold mb-4 text-center">
                      {item.title}
                    </h2>
                    <p className="text-xl mb-6 text-center">
                      {item.description}
                    </p>
                    <Button size="lg" asChild>
                      <Link href="/courses">Khám phá các khóa học</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
