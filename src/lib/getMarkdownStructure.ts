import fs from "fs";
import path from "path";

export interface MarkdownStructure {
  [topic: string]: string[];
}

export function getMarkdownStructure(): MarkdownStructure {
  const markdownDir = path.join(process.cwd(), "src/data/markdown");

  if (!fs.existsSync(markdownDir)) {
    console.error(`Markdown directory not found: ${markdownDir}`);
    return {};
  }

  const topics = fs
    .readdirSync(markdownDir)
    .filter((file) => fs.statSync(path.join(markdownDir, file)).isDirectory());

  const structure: MarkdownStructure = {};

  topics.forEach((topic) => {
    const topicPath = path.join(markdownDir, topic);
    try {
      const lessons = fs
        .readdirSync(topicPath)
        .filter((file) => file.endsWith(".md"));
      structure[topic] = lessons.map((lesson) => lesson.replace(".md", ""));
    } catch (error) {
      console.error(`Error reading topic directory ${topic}:`, error);
      structure[topic] = [];
    }
  });

  return structure;
}
