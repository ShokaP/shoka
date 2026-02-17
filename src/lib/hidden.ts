import { promises as fs } from "fs";
import path from "path";

const HIDDEN_FILE = path.join(process.cwd(), "data", "hidden.json");

export async function getHiddenIds(): Promise<string[]> {
  try {
    const data = await fs.readFile(HIDDEN_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function setHiddenIds(ids: string[]): Promise<void> {
  await fs.writeFile(HIDDEN_FILE, JSON.stringify(ids, null, 2), "utf-8");
}

export async function toggleHidden(uuid: string): Promise<boolean> {
  const ids = await getHiddenIds();
  const index = ids.indexOf(uuid);

  if (index === -1) {
    ids.push(uuid);
    await setHiddenIds(ids);
    return true; // now hidden
  } else {
    ids.splice(index, 1);
    await setHiddenIds(ids);
    return false; // now visible
  }
}
