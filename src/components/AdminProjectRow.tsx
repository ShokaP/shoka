"use client";

import { useState } from "react";
import { CoolifyApplication } from "@/lib/coolify";
import { StatusBadge } from "./StatusBadge";

interface AdminProjectRowProps {
  project: CoolifyApplication & { hidden: boolean };
}

export function AdminProjectRow({ project }: AdminProjectRowProps) {
  const [hidden, setHidden] = useState(project.hidden);
  const [toggling, setToggling] = useState(false);

  async function handleToggle() {
    setToggling(true);
    try {
      const res = await fetch("/api/projects/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uuid: project.uuid }),
      });

      if (res.ok) {
        const data = await res.json();
        setHidden(data.hidden);
      } else if (res.status === 401) {
        window.location.href = "/admin/login";
      }
    } catch (err) {
      console.error("Toggle failed:", err);
    }
    setToggling(false);
  }

  return (
    <div
      className={`flex items-center justify-between rounded-xl border p-5 transition-all ${
        hidden
          ? "border-gray-800/50 bg-gray-900/30 opacity-60"
          : "border-gray-800 bg-gray-900/50"
      }`}
    >
      <div className="flex-1 min-w-0 mr-4">
        <div className="flex items-center gap-3 mb-1">
          <h3
            className={`font-semibold truncate ${
              hidden ? "text-gray-500 line-through" : "text-white"
            }`}
          >
            {project.name}
          </h3>
          <StatusBadge status={project.status} />
        </div>
        {project.description && (
          <p className="text-sm text-gray-500 truncate">
            {project.description}
          </p>
        )}
        <div className="mt-1 flex items-center gap-3">
          {project.fqdn && (
            <span className="text-xs text-gray-600 truncate">
              {project.fqdn.split(",")[0]?.replace(/^https?:\/\//, "")}
            </span>
          )}
          {project.build_pack && (
            <span className="text-xs text-brand-400/60">{project.build_pack}</span>
          )}
          {project.git_repository && (
            <span className="text-xs text-gray-600">{project.git_repository}</span>
          )}
        </div>
      </div>

      <button
        onClick={handleToggle}
        disabled={toggling}
        className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none disabled:cursor-wait disabled:opacity-50 ${
          hidden ? "bg-gray-700" : "bg-brand-600"
        }`}
        title={hidden ? "Click to show" : "Click to hide"}
      >
        <span
          className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
            hidden ? "translate-x-0" : "translate-x-5"
          }`}
        />
      </button>
    </div>
  );
}
