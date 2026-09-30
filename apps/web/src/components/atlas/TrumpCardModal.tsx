"use client";

import React, { useState } from "react";
import { UP_75_WATER_DISTRICTS, DistrictWaterEntity } from "@/data/up-75-districts";
import { X, Trophy, Droplets, CheckCircle2, Shield } from "lucide-react";

interface TrumpCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDistrictId?: string;
}

export function TrumpCardModal({ isOpen, onClose, initialDistrictId }: TrumpCardModalProps) {
  const [districtAId, setDistrictAId] = useState<string>(initialDistrictId || "agra");
  const [districtBId, setDistrictBId] = useState<string>(
    initialDistrictId === "ghaziabad" ? "meerut" : "ghaziabad"
  );

  if (!isOpen) return null;

  const districtA =
    UP_75_WATER_DISTRICTS.find((d) => d.id === districtAId) || UP_75_WATER_DISTRICTS[0];
  const districtB =
    UP_75_WATER_DISTRICTS.find((d) => d.id === districtBId) || UP_75_WATER_DISTRICTS[1];

  const attributes = [
    {
      label: "Water Table Depth (Shallower = Better)",
      valA: districtA.modernWaterMetrics.groundwaterDepthM,
      valB: districtB.modernWaterMetrics.groundwaterDepthM,
      format: (v: number) => `${v} m bgl`,
      higherIsBetter: false,
    },
    {
      label: "Annual Fall Rate (Lower = Better)",
      valA: Math.abs(districtA.modernWaterMetrics.groundwaterTrendAnnualCm),
      valB: Math.abs(districtB.modernWaterMetrics.groundwaterTrendAnnualCm),
      format: (v: number) => `${v} cm/yr`,
      higherIsBetter: false,
    },
    {
      label: "CGWB Extraction Stage (Lower = Safer)",
      valA: districtA.modernWaterMetrics.cgwbStageExtractionPct,
      valB: districtB.modernWaterMetrics.cgwbStageExtractionPct,
      format: (v: number) => `${v}%`,
      higherIsBetter: false,
    },
    {
      label: "Annual Rainfall",
      valA: districtA.modernWaterMetrics.avgRainfallMm,
      valB: districtB.modernWaterMetrics.avgRainfallMm,
      format: (v: number) => `${v} mm`,
      higherIsBetter: true,
    },
    {
      label: "Water Security (Lower Stress = Safer)",
      valA: districtA.modernWaterMetrics.waterStressScore,
      valB: districtB.modernWaterMetrics.waterStressScore,
      format: (v: number) => `${v} / 100`,
      higherIsBetter: false,
    },
    {
      label: "AI Recharge Suitability",
      valA: districtA.rechargeSuitabilityScore,
      valB: districtB.rechargeSuitabilityScore,
      format: (v: number) => `${v} / 100`,
      higherIsBetter: true,
    },
    {
      label: "Terrain Slope (Flatter = Better Recharge)",
      valA: districtA.slopePct,
      valB: districtB.slopePct,
      format: (v: number) => `${v}%`,
      higherIsBetter: false,
    },
    {
      label: "Annual Demand Burden (Lower = Better)",
      valA: districtA.modernWaterMetrics.annualDemandMcm,
      valB: districtB.modernWaterMetrics.annualDemandMcm,
      format: (v: number) => `${v} MCM`,
      higherIsBetter: false,
    },
  ];

  let scoreA = 0;
  let scoreB = 0;
  attributes.forEach((attr) => {
    if (attr.valA !== attr.valB) {
      const aWins = attr.higherIsBetter ? attr.valA > attr.valB : attr.valA < attr.valB;
      if (aWins) scoreA++;
      else scoreB++;
    }
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in select-none">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-atlas-card border border-atlas-border rounded-2xl shadow-2xl flex flex-col overflow-hidden text-atlas-text">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-atlas-border flex items-center justify-between bg-atlas-elevated/40">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-black tracking-wide text-atlas-text">
                District Hydrological Duel Arena
              </h2>
              <p className="text-xs text-atlas-muted">
                Side-by-side comparison across 8 groundwater, rainfall, extraction & recharge metrics
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-atlas-muted hover:text-atlas-text hover:bg-atlas-elevated transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Selectors */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-atlas-elevated/50 border border-atlas-border">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  District 1
                </span>
                <span className="text-sm font-mono font-black text-amber-400">
                  {scoreA} Wins
                </span>
              </div>
              <select
                value={districtAId}
                onChange={(e) => setDistrictAId(e.target.value)}
                className="w-full py-1.5 px-2 rounded-lg bg-atlas-card border border-atlas-border text-sm font-serif font-bold text-atlas-text focus:outline-none focus:ring-1 focus:ring-emerald-400 cursor-pointer"
              >
                {UP_75_WATER_DISTRICTS.map((d) => (
                  <option key={d.id} value={d.id} className="bg-atlas-card text-atlas-text">
                    {d.name} ({d.division})
                  </option>
                ))}
              </select>
              <div className="text-xs text-atlas-muted mt-2">
                CGWB: {districtA.modernWaterMetrics.cgwbCategory} • {districtA.soilType}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-atlas-elevated/50 border border-atlas-border">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400">
                  District 2
                </span>
                <span className="text-sm font-mono font-black text-sky-400">
                  {scoreB} Wins
                </span>
              </div>
              <select
                value={districtBId}
                onChange={(e) => setDistrictBId(e.target.value)}
                className="w-full py-1.5 px-2 rounded-lg bg-atlas-card border border-atlas-border text-sm font-serif font-bold text-atlas-text focus:outline-none focus:ring-1 focus:ring-sky-400 cursor-pointer"
              >
                {UP_75_WATER_DISTRICTS.map((d) => (
                  <option key={d.id} value={d.id} className="bg-atlas-card text-atlas-text">
                    {d.name} ({d.division})
                  </option>
                ))}
              </select>
              <div className="text-xs text-atlas-muted mt-2">
                CGWB: {districtB.modernWaterMetrics.cgwbCategory} • {districtB.soilType}
              </div>
            </div>
          </div>

          {/* Metrics Duel Table */}
          <div className="space-y-2">
            {attributes.map((attr, idx) => {
              const aWins =
                attr.valA !== attr.valB &&
                (attr.higherIsBetter ? attr.valA > attr.valB : attr.valA < attr.valB);
              const bWins =
                attr.valA !== attr.valB &&
                (attr.higherIsBetter ? attr.valB > attr.valA : attr.valB < attr.valA);

              return (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-atlas-elevated/30 border border-atlas-border/70 flex items-center justify-between text-xs"
                >
                  <div
                    className={`flex-1 text-left font-mono font-bold ${
                      aWins ? "text-amber-500 dark:text-amber-400 text-sm" : "text-atlas-muted"
                    }`}
                  >
                    {attr.format(attr.valA)} {aWins && "👑"}
                  </div>

                  <div className="flex-1 text-center font-medium text-atlas-text">
                    {attr.label}
                  </div>

                  <div
                    className={`flex-1 text-right font-mono font-bold ${
                      bWins ? "text-sky-500 dark:text-sky-400 text-sm" : "text-atlas-muted"
                    }`}
                  >
                    {bWins && "👑 "} {attr.format(attr.valB)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Result Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/15 via-transparent to-sky-500/15 border border-atlas-border text-center">
            <div className="text-xs text-atlas-muted uppercase tracking-wider font-semibold">
              Water Security Duel Verdict
            </div>
            <div className="text-lg font-serif font-black text-atlas-text mt-1">
              {scoreA > scoreB
                ? `🏆 ${districtA.name} demonstrates superior water resilience (${scoreA} winning metrics)!`
                : scoreB > scoreA
                ? `🏆 ${districtB.name} demonstrates superior water resilience (${scoreB} winning metrics)!`
                : "🤝 Balanced groundwater indicators between both districts!"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
