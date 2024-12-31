"use client";
import Image from "next/image";
import { motion } from "framer-motion"; // Import motion from framer-motion
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import data from "../../data/mentor.json";

export default function AboutPage() {
  return (
    <div className=" bg-white mx-auto px-10 py-8">
      <motion.h1
        className="text-3xl text-darkgreen font-bold mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        HongQuan.Course
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-2xl text-darkgreen font-semibold mb-4">
            Nhiệm vụ của chúng tớ
          </h2>
          <p className="mb-4">
            Tại HongQuan.Course, chúng tôi tận tâm hỗ trợ các cá nhân có kỹ năng
            CNTT tiên tiến. Sứ mệnh của chúng tôi là thu hẹp khoảng cách giữa
            giáo dục truyền thống và ngành công nghệ đang phát triển nhanh
            chóng, cung cấp các khóa học chất lượng cao, dễ tiếp cận nhằm chuẩn
            bị cho sinh viên của chúng tôi sự nghiệp thành công trong lĩnh vực
            công nghệ. Chúng tôi tin tưởng vào việc học tập thực hành, chương
            trình giảng dạy phù hợp với ngành và thúc đẩy một cộng đồng hỗ trợ
            gồm người học và mentor.
          </p>
        </motion.div>
        <motion.div
          className="relative h-64 md:h-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Image
            src="/images/se.png"
            alt="Team working together"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </motion.div>
      </div>

      <motion.h2
        className="text-2xl text-darkgreen font-semibold mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        MENTOR CỦA MỌI NHÀ
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-8">
        {data.mentor.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.3, duration: 1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{member.name}</CardTitle>
                <CardDescription>{member.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-square relative mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-full"
                  />
                </div>
                <p>{member.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
