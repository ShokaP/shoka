import { supabase } from "./supabase";

export async function getHiddenIds(): Promise<string[]> {
  const { data, error } = await supabase
    .from("hidden_projects")
    .select("uuid");

  if (error) {
    console.error("Failed to fetch hidden IDs:", error);
    return [];
  }

  return data.map((row) => row.uuid);
}

export async function toggleHidden(uuid: string): Promise<boolean> {
  const { data: existing } = await supabase
    .from("hidden_projects")
    .select("id")
    .eq("uuid", uuid)
    .single();

  if (existing) {
    await supabase.from("hidden_projects").delete().eq("uuid", uuid);
    return false; // now visible
  } else {
    await supabase.from("hidden_projects").insert({ uuid });
    return true; // now hidden
  }
}
