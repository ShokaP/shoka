import { CustomProject } from "@/lib/custom";
import { StatusBadge } from "./StatusBadge";

interface CustomCardProps {
  project: CustomProject;
}

function getDisplayUrl(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export function CustomCard({ project }: CustomCardProps) {
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

      <p className="mb-4 text-xs text-gray-500 truncate">
        {getDisplayUrl(project.url)}
      </p>

      <div className="flex items-center gap-3 pt-3 border-t border-gray-800">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-3.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-brand-500"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          Visit
        </a>
      </div>
    </div>
  );
}
