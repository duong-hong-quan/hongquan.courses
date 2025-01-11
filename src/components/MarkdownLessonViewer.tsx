"use client";

import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Card, CardContent } from "@/components/ui/card";
import { Sidebar } from "./Sidebar";
import { MarkdownStructure } from "@/lib/getMarkdownStructure";

interface MarkdownLessonViewerProps {
  structure: MarkdownStructure;
}

export default function MarkdownLessonViewer({
  structure,
}: MarkdownLessonViewerProps) {
  const [selectedTopic, setSelectedTopic] = useState(Object.keys(structure)[0]);
  const [lessons, setLessons] = useState<string[]>([]);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0); // Trạng thái bài học hiện tại
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLessons = async () => {
      setError(null);
      setLessons([]);
      setCurrentLessonIndex(0); // Reset trang khi thay đổi chủ đề
      try {
        const lessonContents = await Promise.all(
          structure[selectedTopic].map(async (lesson) => {
            const response = await fetch(
              `/api/markdown?topic=${encodeURIComponent(
                selectedTopic
              )}&lesson=${encodeURIComponent(lesson)}`
            );

            if (!response.ok) {
              const contentType = response.headers.get("content-type");
              if (contentType && contentType.includes("application/json")) {
                const errorData = await response.json();
                throw new Error(`API Error: ${errorData.error}`);
              }
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            return response.text();
          })
        );
        setLessons(lessonContents);
      } catch (err) {
        console.error("Error fetching lessons:", err);
      }
    };

    fetchLessons();
  }, [selectedTopic, structure]);

  // Điều hướng bài học
  const goToPreviousLesson = () => {
    if (currentLessonIndex > 0) setCurrentLessonIndex(currentLessonIndex - 1);
  };

  const goToNextLesson = () => {
    if (currentLessonIndex < lessons.length - 1)
      setCurrentLessonIndex(currentLessonIndex + 1);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#0a2422] text-white">
      <Sidebar
        structure={structure}
        selectedTopic={selectedTopic}
        onSelectTopic={setSelectedTopic}
      />
      <div className="flex-1 p-4 lg:p-8 overflow-auto">
        <h1 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-6 text-center uppercase">
          {selectedTopic}
        </h1>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : lessons.length === 0 ? (
          <p>Loading lessons...</p>
        ) : (
          <div>
            {/* Hiển thị bài học hiện tại */}
            <Card className="mb-8 bg-[#0a2422] border-white/10 max-h-screen overflow-y-auto rounded-lg">
              <CardContent className="p-4 lg:p-6">
                <div className="prose prose-invert max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {lessons[currentLessonIndex]}
                  </ReactMarkdown>
                </div>
              </CardContent>
            </Card>

            {/* Nút điều hướng */}
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={goToPreviousLesson}
                disabled={currentLessonIndex === 0}
                className={`px-4 py-2 rounded-lg text-sm ${
                  currentLessonIndex === 0
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                Previous
              </button>
              <span className="text-sm lg:text-base">
                Lesson {currentLessonIndex + 1} of {lessons.length}
              </span>
              <button
                onClick={goToNextLesson}
                disabled={currentLessonIndex === lessons.length - 1}
                className={`px-4 py-2 rounded-lg text-sm ${
                  currentLessonIndex === lessons.length - 1
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
