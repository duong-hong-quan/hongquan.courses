import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h2 className="text-3xl font-bold mb-4">Course Not Found</h2>
      <p className="mb-4">Could not find the requested course.</p>
      <Link href="/courses" className="text-blue-500 hover:underline">
        Return to Courses
      </Link>
    </div>
  );
}
