export interface CoolifyApplication {
  id: number;
  uuid: string;
  name: string;
  description: string | null;
  fqdn: string | null;
  git_repository: string | null;
  git_branch: string | null;
  build_pack: string | null;
  status: string | null;
  created_at: string;
  updated_at: string;
}

const COOLIFY_API_URL = process.env.COOLIFY_API_URL;
const COOLIFY_API_TOKEN = process.env.COOLIFY_API_TOKEN;

async function coolifyFetch<T>(endpoint: string): Promise<T> {
  if (!COOLIFY_API_URL || !COOLIFY_API_TOKEN) {
    throw new Error("Coolify API URL or Token not configured");
  }

  const url = `${COOLIFY_API_URL}/api/v1${endpoint}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${COOLIFY_API_TOKEN}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Coolify API error ${res.status}: ${text}`);
  }

  return res.json();
}

export async function getApplications(): Promise<CoolifyApplication[]> {
  return coolifyFetch<CoolifyApplication[]>("/applications");
}
