
"use client";
import { Timeline } from "@/components/ui/timeline";
import { experienceConfig } from "./experianceConfig";

const timelineData = experienceConfig.map((experience) => ({
  title: experience.title,
  content: (
    <div>
      <h3 className="text-lg font-semibold text-foreground mb-1">
        {experience.company}
      </h3>
      <p className="text-sm text-muted-foreground mb-4">{experience.duration}</p>
      <ul className="space-y-2 list-disc list-inside text-muted-foreground">
        {experience.responsibilities.map((task, idx) => (
          <li key={idx}>{task}</li>
        ))}
      </ul>
    </div>
  ),
}));

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-background">
      <Timeline data={timelineData} />
    </main>
  );
}