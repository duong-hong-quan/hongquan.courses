import { Card, CardContent } from "@/components/ui/card";
import { StarIcon } from "lucide-react";

type Review = {
  id: string;
  studentName: string;
  rating: number;
  comment: string;
};

const dummyReviews: Review[] = [
  {
    id: "1",
    studentName: "Nguyễn Văn A",
    rating: 5,
    comment: "Khóa học rất hay và bổ ích!",
  },
  {
    id: "2",
    studentName: "Trần Thị B",
    rating: 4,
    comment: "Mentor rất nhiệt tình và kiến thức chuyên sâu.",
  },
  {
    id: "3",
    studentName: "Lê Văn C",
    rating: 5,
    comment: "Tôi đã học được rất nhiều từ khóa học này.",
  },
];

export default function StudentReviews({ courseId }: { courseId: number }) {
  // In a real application, you would fetch the reviews based on the courseId
  const reviews = dummyReviews;

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <Card key={review.id}>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">{review.studentName}</h3>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`w-5 h-5 ${
                      i < review.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                    fill="currentColor"
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
