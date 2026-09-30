"use client";

import React from "react";
import { UP_75_WATER_DISTRICTS } from "@/data/up-75-districts";
import { X, Sparkles, ArrowRight, Droplets, MapPin, ShieldAlert, Award, Layers } from "lucide-react";

interface StatCardsGridProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectState: (districtId: string, year: number) => void;
}

export function StatCardsGrid({ isOpen, onClose, onSelectState }: StatCardsGridProps) {
  if (!isOpen) return null;

  // Auto-computed facts across all 75 UP districts
  const sortedDepth = [...UP_75_WATER_DISTRICTS].sort((a, b) => b.modernWaterMetrics.groundwaterDepthM - a.modernWaterMetrics.groundwaterDepthM);
  const sortedTrend = [...UP_75_WATER_DISTRICTS].sort((a, b) => a.modernWaterMetrics.groundwaterTrendAnnualCm - b.modernWaterMetrics.groundwaterTrendAnnualCm);
  const sortedRain = [...UP_75_WATER_DISTRICTS].sort((a, b) => b.modernWaterMetrics.avgRainfallMm - a.modernWaterMetrics.avgRainfallMm);
  const sortedStage = [...UP_75_WATER_DISTRICTS].sort((a, b) => b.modernWaterMetrics.cgwbStageExtractionPct - a.modernWaterMetrics.cgwbStageExtractionPct);
  const sortedSuitability = [...UP_75_WATER_DISTRICTS].sort((a, b) => b.rechargeSuitabilityScore - a.rechargeSuitabilityScore);
  const sortedDemand = [...UP_75_WATER_DISTRICTS].sort((a, b) => b.modernWaterMetrics.annualDemandMcm - a.modernWaterMetrics.annualDemandMcm);

  const facts = [
    {
      title: "Deepest Aquifer Overdraft",
      district: sortedDepth[0].name,
      districtId: sortedDepth[0].id,
      year: 2026,
      stat: `${sortedDepth[0].modernWaterMetrics.groundwaterDepthM} m bgl`,
      desc: "Intensive urbanization and extraction have pushed water levels to severe depths.",
      category: "Over-Exploited",
      badgeColor: "bg-red-500/20 text-red-400",
    },
    {
      title: "Shallowest Water Table",
      district: sortedDepth[sortedDepth.length - 1].name,
      districtId: sortedDepth[sortedDepth.length - 1].id,
      year: 2026,
      stat: `${sortedDepth[sortedDepth.length - 1].modernWaterMetrics.groundwaterDepthM} m bgl`,
      desc: "Terai belt benefits from perennial Himalayan streams and artesian conditions.",
      category: "Abundant Aquifer",
      badgeColor: "bg-emerald-500/20 text-emerald-400",
    },
    {
      title: "Fastest Annual Water Table Fall",
      district: sortedTrend[0].name,
      districtId: sortedTrend[0].id,
      year: 2026,
      stat: `${sortedTrend[0].modernWaterMetrics.groundwaterTrendAnnualCm} cm/yr`,
      desc: "Severe overdraft in western UP's intensive sugarcane and urban industrial belt.",
      category: "Critical Depletion",
      badgeColor: "bg-rose-500/20 text-rose-400",
    },
    {
      title: "Highest Stage of Extraction",
      district: sortedStage[0].name,
      districtId: sortedStage[0].id,
      year: 2026,
      stat: `${sortedStage[0].modernWaterMetrics.cgwbStageExtractionPct}%`,
      desc: "Pumping vastly exceeds annual replenishable groundwater recharge.",
      category: "CGWB Flagged",
      badgeColor: "bg-red-500/20 text-red-400",
    },
    {
      title: "Lowest Stage of Extraction",
      district: sortedStage[sortedStage.length - 1].name,
      districtId: sortedStage[sortedStage.length - 1].id,
      year: 2026,
      stat: `${sortedStage[sortedStage.length - 1].modernWaterMetrics.cgwbStageExtractionPct}%`,
      desc: "Minimal tubewell density with high natural replenishment.",
      category: "Safe Zone",
      badgeColor: "bg-emerald-500/20 text-emerald-400",
    },
    {
      title: "Highest Annual Monsoon Rainfall",
      district: sortedRain[0].name,
      districtId: sortedRain[0].id,
      year: 2026,
      stat: `${sortedRain[0].modernWaterMetrics.avgRainfallMm} mm`,
      desc: "Heavy orographic rainfall near the Himalayan foothills.",
      category: "Precipitation",
      badgeColor: "bg-sky-500/20 text-sky-400",
    },
    {
      title: "Driest / Lowest Annual Rainfall",
      district: sortedRain[sortedRain.length - 1].name,
      districtId: sortedRain[sortedRain.length - 1].id,
      year: 2026,
      stat: `${sortedRain[sortedRain.length - 1].modernWaterMetrics.avgRainfallMm} mm`,
      desc: "Semi-arid western fringes with acute monsoon vulnerability.",
      category: "Precipitation",
      badgeColor: "bg-amber-500/20 text-amber-400",
    },
    {
      title: "Highest Recharge Suitability",
      district: sortedSuitability[0].name,
      districtId: sortedSuitability[0].id,
      year: 2026,
      stat: `${sortedSuitability[0].rechargeSuitabilityScore} / 100`,
      desc: "Ideal combination of high sand permeability, gentle slope and thick unconfined layers.",
      category: "AI GIS Ranking",
      badgeColor: "bg-cyan-500/20 text-cyan-400",
    },
    {
      title: "Highest Annual Water Demand",
      district: sortedDemand[0].name,
      districtId: sortedDemand[0].id,
      year: 2026,
      stat: `${sortedDemand[0].modernWaterMetrics.annualDemandMcm} MCM`,
      desc: "Massive combined municipal, industrial and agricultural consumption.",
      category: "Demand Pressure",
      badgeColor: "bg-purple-500/20 text-purple-400",
    },
    {
      title: "Bundelkhand Hard Rock Aquifer Hotspot",
      district: "Jhansi",
      districtId: "jhansi",
      year: 2026,
      stat: "21.2 m bgl (Granitic)",
      desc: "Low storage capacity crystalline rock requires check dams and gully plugs.",
      category: "Hydrogeology",
      badgeColor: "bg-amber-500/20 text-amber-400",
    },
    {
      title: "Sugarcane Tubewell Intensive Zone",
      district: "Shamli",
      districtId: "shamli",
      year: 2026,
      stat: "138% Extraction",
      desc: "Heavy agricultural water demand creates persistent sub-surface overdraft.",
      category: "Agriculture",
      badgeColor: "bg-red-500/20 text-red-400",
    },
    {
      title: "NCR Rapid Urban Infiltration Deficit",
      district: "Gautam Buddha Nagar",
      districtId: "gautam-buddha-nagar",
      year: 2026,
      stat: "142% Extraction",
      desc: "Impervious concrete sprawl reduces natural groundwater recharge.",
      category: "Urban Growth",
      badgeColor: "bg-rose-500/20 text-rose-400",
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in select-none">
      <div className="relative w-full max-w-5xl max-h-[88vh] bg-atlas-card border border-atlas-border rounded-2xl shadow-2xl flex flex-col overflow-hidden text-atlas-text">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-atlas-border flex items-center justify-between bg-atlas-elevated/40">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-black tracking-wide text-atlas-text">
                JalRakshak AI — Groundwater Intelligence Superlatives
              </h2>
              <p className="text-xs text-atlas-muted">
                Auto-computed facts across all 75 districts of UP • Click any card to load that district on the map
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

        {/* Cards Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 flex-1">
          {facts.map((f, idx) => (
            <div
              key={idx}
              onClick={() => {
                onSelectState(f.districtId, f.year);
                onClose();
              }}
              className="group p-4 rounded-xl bg-atlas-elevated/40 hover:bg-atlas-elevated border border-atlas-border hover:border-emerald-500/60 transition cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${f.badgeColor}`}>
                    {f.category}
                  </span>
                  <span className="text-[10px] text-atlas-muted font-mono">{f.district}</span>
                </div>
                <h3 className="text-sm font-serif font-bold text-atlas-text group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                  {f.title}
                </h3>
                <div className="text-lg font-mono font-black text-saffron mt-1">{f.stat}</div>
                <p className="text-xs text-atlas-muted mt-1.5 line-clamp-2 leading-relaxed">
                  {f.desc}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-atlas-border/50 flex items-center justify-between text-[11px] text-atlas-muted group-hover:text-atlas-text">
                <span>View on Map</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition text-emerald-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
