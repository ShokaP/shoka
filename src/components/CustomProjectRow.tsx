"use client";

import { useState } from "react";
import { CustomProject } from "@/lib/custom";

interface CustomProjectRowProps {
  project: CustomProject;
  onDeleted: () => void;
}

export function CustomProjectRow({ project, onDeleted }: CustomProjectRowProps) {
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    try {
      const res = await fetch("/api/custom", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: project.id }),
      });

      if (res.ok) {
        onDeleted();
      } else if (res.status === 401) {
        window.location.href = "/admin/login";
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
    setDeleting(false);
    setConfirmDelete(false);
  }

  return (
    <div className="flex items-center justify-between rounded-xl border border-brand-500/20 bg-brand-500/5 p-5">
      <div className="flex-1 min-w-0 mr-4">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="font-semibold text-white truncate">
            {project.name}
          </h3>
          <span className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium bg-purple-500/15 text-purple-400 border-purple-500/30">
            Custom
          </span>
        </div>
        {project.description && (
          <p className="text-sm text-gray-500 truncate">{project.description}</p>
        )}
        <div className="mt-1">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-brand-400 hover:text-brand-300 transition-colors"
          >
            {project.url.replace(/^https?:\/\//, "")}
          </a>
        </div>
      </div>

      {confirmDelete ? (
        <div className="flex items-center gap-2">
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-red-500 disabled:opacity-50"
          >
            {deleting ? "..." : "Confirm"}
          </button>
          <button
            onClick={() => setConfirmDelete(false)}
            className="rounded-lg border border-gray-700 px-3 py-1.5 text-xs text-gray-400 transition-colors hover:text-white"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setConfirmDelete(true)}
          className="rounded-lg border border-gray-700 p-2 text-gray-500 transition-colors hover:border-red-500/50 hover:text-red-400 hover:bg-red-500/10"
          title="Delete project"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </button>
      )}
    </div>
  );
}
