"use client";

import { useEffect, useState } from "react";
import { CoolifyApplication } from "@/lib/coolify";
import { AdminProjectRow } from "./AdminProjectRow";

type ProjectWithVisibility = CoolifyApplication & { hidden: boolean };

export function AdminDashboard() {
  const [projects, setProjects] = useState<ProjectWithVisibility[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects/all");
        if (res.status === 401) {
          window.location.href = "/admin/login";
          return;
        }
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load");
      }
      setLoading(false);
    }
    fetchProjects();
  }, []);

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
              {visibleCount} visible
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
      ) : projects.length === 0 ? (
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-12 text-center">
          <p className="text-gray-500">
            No applications found in Coolify
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <AdminProjectRow key={project.uuid} project={project} />
          ))}
        </div>
      )}

      <div className="mt-8 rounded-xl border border-gray-800/50 bg-gray-900/30 px-5 py-4">
        <p className="text-xs text-gray-600">
          Toggle the switch to show/hide projects on the public portfolio page.
          Projects are fetched live from your Coolify instance.
        </p>
      </div>
    </div>
  );
}
