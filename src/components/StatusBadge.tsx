interface StatusBadgeProps {
  status: string | null;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const primaryStatus = status?.split(":")[0]?.toLowerCase() || "unknown";

  const colorMap: Record<string, string> = {
    running: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    exited: "bg-red-500/15 text-red-400 border-red-500/30",
    stopped: "bg-red-500/15 text-red-400 border-red-500/30",
    starting: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    restarting: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    building: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  };

  const classes =
    colorMap[primaryStatus] ||
    "bg-gray-500/15 text-gray-400 border-gray-500/30";

  const dotColor =
    primaryStatus === "running"
      ? "bg-emerald-400 animate-pulse"
      : primaryStatus === "exited" || primaryStatus === "stopped"
        ? "bg-red-400"
        : primaryStatus === "starting" || primaryStatus === "restarting"
          ? "bg-yellow-400 animate-pulse"
          : "bg-gray-400";

  const label = primaryStatus.charAt(0).toUpperCase() + primaryStatus.slice(1);

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${classes}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />
      {label}
    </span>
  );
}
