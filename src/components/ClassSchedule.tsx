"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

type ClassSchedule = {
  id: string;
  name: string;
  sessions: {
    day: string;
    startTime: string;
    endTime: string;
    topic: string;
  }[];
};

const classSchedules: ClassSchedule[] = [
  {
    id: "morning",
    name: "Lớp Sáng",
    sessions: [
      {
        day: "Thứ Hai",
        startTime: "08:00",
        endTime: "10:00",
        topic: "Introduction",
      },
      {
        day: "Thứ Tư",
        startTime: "08:00",
        endTime: "10:00",
        topic: "Basic Concepts",
      },
      {
        day: "Thứ Sáu",
        startTime: "08:00",
        endTime: "10:00",
        topic: "Advanced Topics",
      },
    ],
  }
];

export default function ClassSchedule() {
  return (
    <div>
      {classSchedules.map((cls) => (
        <div key={cls.id} >
          <div>
            <div className="pt-6">
            
              <div className="space-y-4">
                {cls.sessions.map((session, index) => (
                  <div key={index} className="p-3 border rounded-md">
                    <div className="flex justify-between items-center mb-1">
                      <p className="font-medium text-base">{session.topic}</p>
                      <p className="text-sm text-muted-foreground">
                        {session.day}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {session.startTime} - {session.endTime}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
