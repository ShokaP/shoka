import { CoolifyApplication } from "@/lib/coolify";
import { StatusBadge } from "./StatusBadge";

interface ProjectCardProps {
  project: CoolifyApplication;
}

function getPrimaryUrl(fqdn: string | null): string | null {
  if (!fqdn) return null;
  const urls = fqdn.split(",").map((u) => u.trim());
  const https = urls.find((u) => u.startsWith("https://"));
  return https || urls[0] || null;
}

function getDisplayUrl(url: string): string {
  return url.replace(/^https?:\/\//, "");
}

function getRepoUrl(repo: string | null): string | null {
  if (!repo) return null;
  if (repo.startsWith("http")) return repo;
  return `https://github.com/${repo}`;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const primaryUrl = getPrimaryUrl(project.fqdn);
  const repoUrl = getRepoUrl(project.git_repository);
  const repoName = project.git_repository?.replace(".git", "") || null;

  return (
    <div className="card-shine group rounded-xl border border-gray-800 bg-gray-900/50 p-6 transition-all duration-300 hover:border-gray-700 hover:bg-gray-900/80 hover:shadow-lg hover:shadow-brand-500/5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-white group-hover:text-brand-300 transition-colors truncate">
          {project.name}
        </h3>
        <StatusBadge status={project.status} />
      </div>

      {project.description && (
        <p className="mb-4 text-sm leading-relaxed text-gray-400 line-clamp-2">
          {project.description}
        </p>
      )}

      <div className="mb-5 flex flex-wrap gap-2">
        {project.build_pack && (
          <span className="rounded-md bg-brand-500/10 px-2.5 py-1 text-xs font-medium text-brand-300 border border-brand-500/20">
            {project.build_pack}
          </span>
        )}
        {project.git_branch && (
          <span className="rounded-md bg-gray-800 px-2.5 py-1 text-xs text-gray-400 border border-gray-700">
            {project.git_branch}
          </span>
        )}
      </div>

      {primaryUrl && (
        <p className="mb-4 text-xs text-gray-500 truncate">
          {getDisplayUrl(primaryUrl)}
        </p>
      )}

      <div className="flex items-center gap-3 pt-3 border-t border-gray-800">
        {primaryUrl && (
          <a
            href={primaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-3.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-brand-500"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            Visit
          </a>
        )}
        {repoUrl && repoName && (
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-700 bg-gray-800 px-3.5 py-1.5 text-xs font-medium text-gray-300 transition-colors hover:border-gray-600 hover:text-white"
          >
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            {repoName}
          </a>
        )}
      </div>
    </div>
  );
}
