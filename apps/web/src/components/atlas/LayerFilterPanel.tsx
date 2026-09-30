"use client";

import React from "react";
import { PLANNING_HORIZONS } from "@/data/up-75-districts";
import { Layers, Eye, Calendar, Waves, AlertTriangle, Cpu, Palette } from "lucide-react";

interface LayerFilterPanelProps {
  currentYear: number;
  onSelectYear: (year: number) => void;
  showRivers: boolean;
  onToggleRivers: () => void;
  showHotspots: boolean;
  onToggleHotspots: () => void;
  showIoTSensors: boolean;
  onToggleIoTSensors: () => void;
  isColorBlindMode: boolean;
  onToggleColorBlind: () => void;
  viewMode: "water" | "recharge";
}

export function LayerFilterPanel({
  currentYear,
  onSelectYear,
  showRivers,
  onToggleRivers,
  showHotspots,
  onToggleHotspots,
  showIoTSensors,
  onToggleIoTSensors,
  isColorBlindMode,
  onToggleColorBlind,
  viewMode,
}: LayerFilterPanelProps) {
  const waterLegend = [
    { label: "Safe / Abundant (< 35)", color: "#10b981" },
    { label: "Semi-Critical (35 - 55)", color: "#f59e0b" },
    { label: "Critical (55 - 75)", color: "#f97316" },
    { label: "Over-Exploited (> 75)", color: "#ef4444" },
  ];

  const rechargeLegend = [
    { label: "High Suitability (> 85)", color: "#06b6d4" },
    { label: "Good Suitability (70 - 85)", color: "#3b82f6" },
    { label: "Moderate (50 - 70)", color: "#f59e0b" },
    { label: "Low / Constrained (< 50)", color: "#64748b" },
  ];

  return (
    <aside className="hidden xl:flex flex-col w-64 bg-atlas-card border-r border-atlas-border p-3.5 space-y-5 text-atlas-text select-none overflow-y-auto z-20">
      {/* Planning Horizons */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-atlas-muted flex items-center gap-1.5 mb-2.5">
          <Calendar className="w-3.5 h-3.5 text-emerald-400" />
          Planning Horizons
        </h3>
        <div className="space-y-1">
          {PLANNING_HORIZONS.map((h) => {
            const isSelected = currentYear === h.year;
            return (
              <button
                key={h.id}
                onClick={() => onSelectYear(h.year)}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition flex items-center justify-between ${
                  isSelected
                    ? "bg-emerald-600 text-white font-bold shadow-sm"
                    : "text-atlas-muted hover:bg-atlas-elevated hover:text-atlas-text"
                }`}
              >
                <span className="truncate">{h.label.split("(")[0]}</span>
                <span className="font-mono text-[10px] text-atlas-faint">
                  {h.year === 2026 ? "Live" : h.year}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Map Layers Toggles */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-atlas-muted flex items-center gap-1.5 mb-2.5">
          <Layers className="w-3.5 h-3.5 text-sky-400" />
          GIS Spatial Layers
        </h3>
        <div className="space-y-2 text-xs">
          <label className="flex items-center justify-between p-2 rounded-lg bg-atlas-elevated/40 border border-atlas-border cursor-pointer hover:bg-atlas-elevated transition">
            <span className="flex items-center gap-2">
              <Waves className="w-3.5 h-3.5 text-sky-400" />
              River Basins
            </span>
            <input
              type="checkbox"
              checked={showRivers}
              onChange={onToggleRivers}
              className="accent-emerald-500 h-4 w-4 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-2 rounded-lg bg-atlas-elevated/40 border border-atlas-border cursor-pointer hover:bg-atlas-elevated transition">
            <span className="flex items-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              Over-Extraction Hotspots
            </span>
            <input
              type="checkbox"
              checked={showHotspots}
              onChange={onToggleHotspots}
              className="accent-emerald-500 h-4 w-4 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-2 rounded-lg bg-atlas-elevated/40 border border-atlas-border cursor-pointer hover:bg-atlas-elevated transition">
            <span className="flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              IoT Sensor Stations
            </span>
            <input
              type="checkbox"
              checked={showIoTSensors}
              onChange={onToggleIoTSensors}
              className="accent-emerald-500 h-4 w-4 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-2 rounded-lg bg-atlas-elevated/40 border border-atlas-border cursor-pointer hover:bg-atlas-elevated transition">
            <span className="flex items-center gap-2">
              <Palette className="w-3.5 h-3.5 text-amber-400" />
              Color-Blind Safe
            </span>
            <input
              type="checkbox"
              checked={isColorBlindMode}
              onChange={onToggleColorBlind}
              className="accent-emerald-500 h-4 w-4 rounded"
            />
          </label>
        </div>
      </div>

      {/* Dynamic Map Legend */}
      <div className="flex-1">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-atlas-muted flex items-center gap-1.5 mb-2.5">
          <Eye className="w-3.5 h-3.5 text-emerald-400" />
          {viewMode === "water" ? "Water Stress Classification" : "Recharge Suitability"}
        </h3>
        <div className="space-y-1.5 bg-atlas-elevated/30 p-2.5 rounded-xl border border-atlas-border text-[11px]">
          {(viewMode === "water" ? waterLegend : rechargeLegend).map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0 border border-white/20"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-atlas-text truncate">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
