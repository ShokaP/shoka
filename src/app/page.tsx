import { ProjectCard } from "@/components/ProjectCard";
import { getApplications, CoolifyApplication } from "@/lib/coolify";
import { getHiddenIds } from "@/lib/hidden";

export const dynamic = "force-dynamic";

export default async function Home() {
  let projects: CoolifyApplication[] = [];
  let error: string | null = null;

  try {
    const [applications, hiddenIds] = await Promise.all([
      getApplications(),
      getHiddenIds(),
    ]);
    projects = applications.filter((app) => !hiddenIds.includes(app.uuid));
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to fetch projects";
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-12 text-center">
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          My Projects
        </h1>
        <p className="text-lg text-gray-400">
          Self-hosted applications powered by{" "}
          <span className="text-shimmer font-semibold">Shoka</span>
        </p>
      </div>

      {error ? (
        <div className="mx-auto max-w-md rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-center">
          <svg className="mx-auto mb-3 h-10 w-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          <p className="text-sm text-red-300">{error}</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="mx-auto max-w-md rounded-xl border border-gray-800 bg-gray-900/50 p-12 text-center">
          <svg className="mx-auto mb-3 h-10 w-10 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
          </svg>
          <p className="text-gray-500">No projects to show</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.uuid} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
