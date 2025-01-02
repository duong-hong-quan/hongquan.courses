"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Class = {
  id: string;
  name: string;
  schedule: {
    date: Date;
    startTime: string;
    endTime: string;
    topic: string;
  }[];
};

const dummyClasses: Class[] = [
  {
    id: "class1",
    name: "Lớp Sáng",
    schedule: [
      {
        date: new Date(2025, 1, 15),
        startTime: "08:00",
        endTime: "10:00",
        topic: "Introduction",
      },
      {
        date: new Date(2025, 1, 17),
        startTime: "08:00",
        endTime: "10:00",
        topic: "Basic Concepts",
      },
      {
        date: new Date(2025, 1, 19),
        startTime: "08:00",
        endTime: "10:00",
        topic: "Advanced Topics",
      },
    ],
  },
  {
    id: "class2",
    name: "Lớp Chiều",
    schedule: [
      {
        date: new Date(2023, 5, 16),
        startTime: "14:00",
        endTime: "16:00",
        topic: "Introduction",
      },
      {
        date: new Date(2023, 5, 18),
        startTime: "14:00",
        endTime: "16:00",
        topic: "Basic Concepts",
      },
      {
        date: new Date(2023, 5, 20),
        startTime: "14:00",
        endTime: "16:00",
        topic: "Advanced Topics",
      },
    ],
  },
];

export default function ClassSchedule({ courseId }: { courseId: number }) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  // In a real application, you would fetch the classes based on the courseId
  const classes = dummyClasses;

  return (
    <Tabs defaultValue={classes[0].id} className="w-full">
      <TabsList>
        {classes.map((cls) => (
          <TabsTrigger key={cls.id} value={cls.id}>
            {cls.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {classes.map((cls) => (
        <TabsContent key={cls.id} value={cls.id}>
          <div className="grid md:grid-cols-2 gap-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Lịch học:</h3>
                {cls.schedule
                  .filter(
                    (session) =>
                      session.date.toDateString() ===
                      selectedDate?.toDateString()
                  )
                  .map((session, index) => (
                    <div key={index} className="mb-2">
                      <p className="font-medium">{session.topic}</p>
                      <p className="text-sm text-gray-600">
                        {session.startTime} - {session.endTime}
                      </p>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
