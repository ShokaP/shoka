import { getSupabase } from "./supabase";

export interface CustomProject {
  id: string;
  name: string;
  description: string;
  url: string;
  status: "running" | "stopped";
  created_at: string;
}

export async function getCustomProjects(): Promise<CustomProject[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("custom_projects")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Failed to fetch custom projects:", error);
    return [];
  }

  return data as CustomProject[];
}

export async function addCustomProject(
  project: Omit<CustomProject, "id" | "created_at">
): Promise<CustomProject> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("custom_projects")
    .insert(project)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to add custom project: ${error.message}`);
  }

  return data as CustomProject;
}

export async function deleteCustomProject(id: string): Promise<boolean> {
  const supabase = getSupabase();
  const { error } = await supabase
    .from("custom_projects")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Failed to delete custom project:", error);
    return false;
  }

  return true;
}
