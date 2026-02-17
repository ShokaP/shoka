"use client";

import { CoolifyApplication } from "@/lib/coolify";
import { ProjectCard } from "./ProjectCard";
import { RevealCard } from "./RevealCard";

interface ProjectGridProps {
  projects: CoolifyApplication[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const baseDelay = 2200;
  const stagger = 250;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, i) => (
        <RevealCard key={project.uuid} delay={baseDelay + i * stagger}>
          <ProjectCard project={project} />
        </RevealCard>
      ))}
    </div>
  );
}
