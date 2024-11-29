import Link from "next/link";
import { Github, Facebook, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex flex-col items-center md:items-start">
            <p className="text-lg font-semibold mb-2">HongQuan.Courses</p>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              Học để đi làm
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              <Link
                href="https://github.com/duong-hong-quan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github size={24} />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://facebook.com/lewis.1921"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook size={24} />
                <span className="sr-only">Facebook</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-muted text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} HongQuan.Courses. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
