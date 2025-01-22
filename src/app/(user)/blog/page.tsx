import MarkdownLessonViewer from "@/components/MarkdownLessonViewer";
import { getMarkdownStructure } from "@/lib/getMarkdownStructure";

export default function Home() {
  const structure = getMarkdownStructure();

  return (
    <main>
      <MarkdownLessonViewer structure={structure} />
    </main>
  );
}
