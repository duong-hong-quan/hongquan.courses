import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MarkdownStructure } from "@/lib/getMarkdownStructure";

interface SidebarProps {
  structure: MarkdownStructure;
  selectedTopic: string;
  onSelectTopic: (topic: string) => void;
}

export function Sidebar({
  structure,
  selectedTopic,
  onSelectTopic,
}: SidebarProps) {
  return (
    <div className="w-full lg:w-64 bg-[#0a2422] p-4 rounded-lg lg:rounded-3xl lg:flex-shrink-0 lg:overflow-auto">
      <h2 className="text-xl font-bold mb-4 text-white text-center lg:text-left">
        Topics
      </h2>
      <ScrollArea className="h-fit">
        {Object.keys(structure).map((topic) => (
          <Button
            key={topic}
            onClick={() => onSelectTopic(topic)}
            variant={selectedTopic === topic ? "secondary" : "ghost"}
            className="w-full justify-start mb-2"
          >
            {topic}
          </Button>
        ))}
      </ScrollArea>
    </div>
  );
}
