import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const topic = searchParams.get("topic");
    const lesson = searchParams.get("lesson");

    if (!topic || !lesson) {
      return NextResponse.json(
        { error: "Missing topic or lesson parameter" },
        { status: 400 }
      );
    }

    const markdownDir = path.join(process.cwd(), "src/app/api/markdown");
    const topicDir = path.join(markdownDir, topic);

    if (!fs.existsSync(topicDir)) {
      return NextResponse.json(
        { error: `Topic directory not found: ${topic}` },
        { status: 404 }
      );
    }

    const files = fs.readdirSync(topicDir);
    const matchingFile = files.find(
      (file) => file.toLowerCase() === `${lesson.toLowerCase()}.md`
    );

    if (!matchingFile) {
      return NextResponse.json(
        { error: `Lesson file not found: ${lesson}` },
        { status: 404 }
      );
    }

    const filePath = path.join(topicDir, matchingFile);
    console.log("Reading file:", filePath);
    const content = fs.readFileSync(filePath, "utf8");
    console.log("File content:", content.substring(0, 100)); // Log first 100 characters

    return new NextResponse(content, {
      headers: {
        "Content-Type": "text/markdown",
      },
    });
  } catch (error) {
    console.error("Error in markdown API route:", error);
    return NextResponse.json(
      { error: `Server error: ${error.message}` },
      { status: 500 }
    );
  }
}
