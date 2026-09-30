"use client";

import React, { useState } from "react";
import { UP_75_WATER_DISTRICTS, DistrictWaterEntity } from "@/data/up-75-districts";

interface AtlasMapProps {
  currentYear: number;
  selectedDistrictId: string;
  onSelectDistrict: (id: string) => void;
  viewMode: "water" | "recharge";
  showRivers: boolean;
  showHotspots: boolean;
  showIoTSensors: boolean;
  isColorBlindMode: boolean;
}

export function AtlasMap({
  currentYear,
  selectedDistrictId,
  onSelectDistrict,
  viewMode,
  showRivers,
  showHotspots,
  showIoTSensors,
  isColorBlindMode,
}: AtlasMapProps) {
  const [hoveredDistrict, setHoveredDistrict] = useState<DistrictWaterEntity | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Get temporal metrics for a district at currentYear
  const getTemporalMetrics = (d: DistrictWaterEntity) => {
    const pt = d.temporalTrajectory.find((t) => t.year === currentYear);
    if (pt) return pt;
    // interpolate or find closest
    return d.temporalTrajectory.slice().reverse().find((t) => currentYear >= t.year) || d.temporalTrajectory[0];
  };

  // Compute fill color based on view mode and current year
  const getDistrictFill = (d: DistrictWaterEntity): string => {
    if (viewMode === "recharge") {
      const suit = d.rechargeSuitabilityScore;
      if (suit >= 88) return isColorBlindMode ? "#009e73" : "#06b6d4"; // High / Cyan
      if (suit >= 75) return isColorBlindMode ? "#56b4e9" : "#3b82f6"; // Good / Blue
      if (suit >= 60) return isColorBlindMode ? "#f0e442" : "#f59e0b"; // Moderate / Amber
      return isColorBlindMode ? "#708090" : "#64748b"; // Low / Slate
    }

    // Water Stress Mode
    const t = getTemporalMetrics(d);
    const stress = t.stress_score;
    if (stress >= 75) return isColorBlindMode ? "#d55e00" : "#ef4444"; // Over-Exploited / Red
    if (stress >= 55) return isColorBlindMode ? "#e69f00" : "#f97316"; // Critical / Orange
    if (stress >= 35) return isColorBlindMode ? "#f0e442" : "#f59e0b"; // Semi-Critical / Amber
    return isColorBlindMode ? "#009e73" : "#10b981"; // Safe / Emerald
  };

  // Known IoT active monitoring districts
  const iotDistricts = ["agra", "ghaziabad", "meerut", "jhansi", "lucknow"];

  return (
    <div
      className="relative w-full h-full min-h-[520px] lg:min-h-[640px] flex items-center justify-center bg-atlas-canvas overflow-hidden select-none p-2"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
    >
      {/* Background Spatial Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      {/* Main SVG Vector Canvas */}
      <svg
        viewBox="0 0 940 760"
        className="w-full h-full max-h-[82vh] drop-shadow-xl z-10 transition-all duration-300"
      >
        <defs>
          <filter id="districtGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#f59e0b" floodOpacity="0.8" />
          </filter>
          <filter id="hoverGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#ffffff" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Major River Basins (Ganga, Yamuna, Gomti, Ghaghara, Betwa, Ken, Son) */}
        {showRivers && (
          <g className="rivers-overlay opacity-75 pointer-events-none">
            {/* Yamuna */}
            <path
              d="M 120 70 Q 150 250 170 370 T 300 480 T 560 590"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            {/* Ganga */}
            <path
              d="M 190 90 Q 280 230 380 390 T 570 590 T 730 580 T 890 530"
              fill="none"
              stroke="#0284c7"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Gomti */}
            <path
              d="M 370 170 Q 420 300 490 420 T 690 550"
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="2.2"
              strokeDasharray="4 2"
            />
            {/* Ghaghara */}
            <path
              d="M 550 190 Q 640 320 750 430 T 880 520"
              fill="none"
              stroke="#0369a1"
              strokeWidth="3.5"
            />
            {/* Betwa */}
            <path
              d="M 230 670 Q 250 580 330 530 T 430 510"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2.4"
            />
            {/* Ken */}
            <path
              d="M 450 630 Q 460 580 470 550"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2"
            />
            {/* Son */}
            <path
              d="M 680 670 Q 750 660 840 680"
              fill="none"
              stroke="#0284c7"
              strokeWidth="2.8"
            />
          </g>
        )}

        {/* 75 Districts Polygons */}
        <g className="districts-layer">
          {UP_75_WATER_DISTRICTS.map((d) => {
            const isSelected = d.id === selectedDistrictId;
            const isHovered = hoveredDistrict?.id === d.id;
            const fillColor = getDistrictFill(d);

            return (
              <g key={d.id} className="transition-all duration-200">
                <path
                  d={d.svgPath}
                  fill={fillColor}
                  className={`district-shape ${isSelected ? "selected" : ""}`}
                  filter={isSelected ? "url(#districtGlow)" : isHovered ? "url(#hoverGlow)" : undefined}
                  onClick={() => onSelectDistrict(d.id)}
                  onMouseEnter={() => setHoveredDistrict(d)}
                  onMouseLeave={() => setHoveredDistrict(null)}
                />

                {/* Centroid Text Label */}
                <text
                  x={d.projected[0]}
                  y={d.projected[1] + 3}
                  textAnchor="middle"
                  className={`pointer-events-none text-[8.5px] font-sans font-semibold tracking-tight transition-opacity ${
                    isSelected
                      ? "fill-slate-900 font-extrabold text-[10px]"
                      : "fill-white/85"
                  }`}
                  style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}
                >
                  {d.name}
                </text>
              </g>
            );
          })}
        </g>

        {/* Critical Over-Extraction Hotspot Markers */}
        {showHotspots &&
          UP_75_WATER_DISTRICTS.filter((d) => d.modernWaterMetrics.cgwbStageExtractionPct > 100).map(
            (d) => (
              <g
                key={`hotspot-${d.id}`}
                className="cursor-pointer"
                onClick={() => onSelectDistrict(d.id)}
              >
                <circle
                  cx={d.projected[0]}
                  cy={d.projected[1] - 13}
                  r="7.5"
                  fill="#ef4444"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  className="animate-pulse"
                />
                <text
                  x={d.projected[0]}
                  y={d.projected[1] - 10}
                  textAnchor="middle"
                  fontSize="8"
                  fill="#ffffff"
                  fontWeight="bold"
                >
                  !
                </text>
              </g>
            )
          )}

        {/* IoT Active Edge Node Markers */}
        {showIoTSensors &&
          UP_75_WATER_DISTRICTS.filter((d) => iotDistricts.includes(d.id)).map((d) => (
            <g
              key={`iot-${d.id}`}
              className="cursor-pointer"
              onClick={() => onSelectDistrict(d.id)}
            >
              <circle
                cx={d.projected[0] + 12}
                cy={d.projected[1] - 12}
                r="6"
                fill="#10b981"
                stroke="#ffffff"
                strokeWidth="1.2"
              />
              <text
                x={d.projected[0] + 12}
                y={d.projected[1] - 8}
                textAnchor="middle"
                fontSize="7"
                fill="#ffffff"
              >
                📡
              </text>
            </g>
          ))}
      </svg>

      {/* Hover Floating Tooltip */}
      {hoveredDistrict && (
        <div
          className="absolute z-50 pointer-events-none p-3 rounded-xl bg-atlas-card/95 border border-atlas-border shadow-2xl backdrop-blur-md max-w-xs animate-fade-in text-atlas-text"
          style={{
            left: Math.min(mousePos.x + 16, 700),
            top: Math.max(mousePos.y - 80, 20),
          }}
        >
          <div className="flex items-center justify-between gap-2 border-b border-atlas-border pb-1 mb-1.5">
            <span className="font-serif font-bold text-sm text-emerald-400">
              {hoveredDistrict.name}
            </span>
            <span className="text-[10px] text-atlas-muted px-1.5 py-0.5 rounded bg-atlas-elevated">
              {hoveredDistrict.division}
            </span>
          </div>

          <div className="space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-atlas-muted">Water Stress ({currentYear}):</span>
              <span className="font-mono font-bold text-saffron">
                {getTemporalMetrics(hoveredDistrict).stress_score} / 100
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-atlas-muted">Water Table Depth:</span>
              <span className="font-mono text-atlas-text font-bold">
                {getTemporalMetrics(hoveredDistrict).depth_m} m bgl
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-atlas-muted">Recharge Suitability:</span>
              <span className="font-mono text-emerald-400 font-bold">
                {hoveredDistrict.rechargeSuitabilityScore} / 100
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-atlas-muted">CGWB Stage:</span>
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  hoveredDistrict.modernWaterMetrics.cgwbStageExtractionPct > 100
                    ? "bg-red-500/20 text-red-400"
                    : hoveredDistrict.modernWaterMetrics.cgwbStageExtractionPct > 70
                    ? "bg-amber-500/20 text-amber-400"
                    : "bg-emerald-500/20 text-emerald-400"
                }`}
              >
                {hoveredDistrict.modernWaterMetrics.cgwbStageExtractionPct}% ({hoveredDistrict.modernWaterMetrics.cgwbCategory})
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
