"use client";

import { useEffect, useState, useCallback } from "react";
import { CoolifyApplication } from "@/lib/coolify";
import { CustomProject } from "@/lib/custom";
import { AdminProjectRow } from "./AdminProjectRow";
import { CustomProjectRow } from "./CustomProjectRow";
import { CustomProjectForm } from "./CustomProjectForm";

type ProjectWithVisibility = CoolifyApplication & { hidden: boolean };

export function AdminDashboard() {
  const [projects, setProjects] = useState<ProjectWithVisibility[]>([]);
  const [customProjects, setCustomProjects] = useState<CustomProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    try {
      const [coolifyRes, customRes] = await Promise.all([
        fetch("/api/projects/all"),
        fetch("/api/custom"),
      ]);

      if (coolifyRes.status === 401 || customRes.status === 401) {
        window.location.href = "/admin/login";
        return;
      }

      if (!coolifyRes.ok) throw new Error("Failed to fetch Coolify projects");
      if (!customRes.ok) throw new Error("Failed to fetch custom projects");

      const coolifyData = await coolifyRes.json();
      const customData = await customRes.json();

      setProjects(coolifyData);
      setCustomProjects(customData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const visibleCount = projects.filter((p) => !p.hidden).length;
  const hiddenCount = projects.filter((p) => p.hidden).length;

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage which projects appear on your portfolio
          </p>
        </div>
        {!loading && !error && (
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              {visibleCount + customProjects.length} visible
            </span>
            <span className="flex items-center gap-1.5 text-gray-500">
              <span className="h-2 w-2 rounded-full bg-gray-600" />
              {hiddenCount} hidden
            </span>
          </div>
        )}
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 animate-pulse rounded-xl border border-gray-800 bg-gray-900/50"
            />
          ))}
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-center">
          <p className="text-sm text-red-300">{error}</p>
        </div>
      ) : (
        <>
          {/* Coolify Projects */}
          <div className="mb-8">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gray-500">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
              </svg>
              Coolify Applications
            </h2>
            {projects.length === 0 ? (
              <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-8 text-center">
                <p className="text-gray-500">No applications found in Coolify</p>
              </div>
            ) : (
              <div className="space-y-3">
                {projects.map((project) => (
                  <AdminProjectRow key={project.uuid} project={project} />
                ))}
              </div>
            )}
          </div>

          {/* Custom Projects */}
          <div className="mb-8">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gray-500">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.06a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.25 8.81" />
              </svg>
              Custom Projects
            </h2>
            <div className="space-y-3">
              {customProjects.map((project) => (
                <CustomProjectRow
                  key={project.id}
                  project={project}
                  onDeleted={fetchAll}
                />
              ))}
              <CustomProjectForm onAdded={fetchAll} />
            </div>
          </div>
        </>
      )}

      <div className="rounded-xl border border-gray-800/50 bg-gray-900/30 px-5 py-4">
        <p className="text-xs text-gray-600">
          Toggle the switch to show/hide Coolify projects. Add custom link projects with the button above.
          All changes take effect immediately on the public portfolio page.
        </p>
      </div>
    </div>
  );
}
