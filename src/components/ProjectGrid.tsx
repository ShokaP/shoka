"use client";

import { CoolifyApplication } from "@/lib/coolify";
import { CustomProject } from "@/lib/custom";
import { ProjectCard } from "./ProjectCard";
import { CustomCard } from "./CustomCard";
import { RevealCard } from "./RevealCard";

interface ProjectGridProps {
  projects: CoolifyApplication[];
  customProjects?: CustomProject[];
}

export function ProjectGrid({ projects, customProjects = [] }: ProjectGridProps) {
  const baseDelay = 2200;
  const stagger = 250;

  const totalCoolify = projects.length;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, i) => (
        <RevealCard key={project.uuid} delay={baseDelay + i * stagger}>
          <ProjectCard project={project} />
        </RevealCard>
      ))}
      {customProjects.map((project, i) => (
        <RevealCard
          key={project.id}
          delay={baseDelay + (totalCoolify + i) * stagger}
        >
          <CustomCard project={project} />
        </RevealCard>
      ))}
    </div>
  );
}
