import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

const CUSTOM_FILE = path.join(process.cwd(), "data", "custom.json");

export interface CustomProject {
  id: string;
  name: string;
  description: string;
  url: string;
  status: "running" | "stopped";
  created_at: string;
}

export async function getCustomProjects(): Promise<CustomProject[]> {
  try {
    const data = await fs.readFile(CUSTOM_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function addCustomProject(
  project: Omit<CustomProject, "id" | "created_at">
): Promise<CustomProject> {
  const projects = await getCustomProjects();
  const newProject: CustomProject = {
    ...project,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
  };
  projects.push(newProject);
  await fs.writeFile(CUSTOM_FILE, JSON.stringify(projects, null, 2), "utf-8");
  return newProject;
}

export async function deleteCustomProject(id: string): Promise<boolean> {
  const projects = await getCustomProjects();
  const filtered = projects.filter((p) => p.id !== id);
  if (filtered.length === projects.length) return false;
  await fs.writeFile(CUSTOM_FILE, JSON.stringify(filtered, null, 2), "utf-8");
  return true;
}

export async function updateCustomProject(
  id: string,
  updates: Partial<Omit<CustomProject, "id" | "created_at">>
): Promise<CustomProject | null> {
  const projects = await getCustomProjects();
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) return null;
  projects[index] = { ...projects[index], ...updates };
  await fs.writeFile(CUSTOM_FILE, JSON.stringify(projects, null, 2), "utf-8");
  return projects[index];
}
