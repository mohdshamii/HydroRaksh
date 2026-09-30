import React from "react";

export type ProvenanceType = "LIVE" | "DELAYED" | "SIMULATED" | "STALE";

interface ProvenanceBadgeProps {
  type: ProvenanceType;
  timestamp?: string;
  source?: string;
  className?: string;
}

export const ProvenanceBadge: React.FC<ProvenanceBadgeProps> = ({
  type,
  timestamp,
  source,
  className = "",
}) => {
  const configs = {
    LIVE: {
      bg: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
      dot: "bg-emerald-500 animate-pulse",
      label: "LIVE",
      tooltip: "Authoritative real-time streaming feed",
    },
    DELAYED: {
      bg: "bg-amber-500/10 text-amber-700 border-amber-500/20",
      dot: "bg-amber-500",
      label: "DELAYED",
      tooltip: "Official scheduled government bulletin",
    },
    SIMULATED: {
      bg: "bg-orange-500/10 text-orange-700 border-orange-500/20",
      dot: "bg-orange-500",
      label: "SIMULATED",
      tooltip: "Scenario model calculation (dev/sandbox)",
    },
    STALE: {
      bg: "bg-slate-500/10 text-slate-600 border-slate-500/20",
      dot: "bg-slate-400",
      label: "STALE",
      tooltip: "Offline cached observation",
    },
  };

  const config = configs[type] || configs.LIVE;

  // Format short timestamp
  let timeStr = "";
  if (timestamp) {
    try {
      const dt = new Date(timestamp);
      timeStr = dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch {
      timeStr = "";
    }
  }

  return (
    <div
      title={`${config.tooltip}${source ? ` • Source: ${source}` : ""}`}
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide border ${config.bg} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      <span>{config.label}</span>
      {timeStr && <span className="opacity-70 font-mono font-normal">({timeStr})</span>}
    </div>
  );
};
