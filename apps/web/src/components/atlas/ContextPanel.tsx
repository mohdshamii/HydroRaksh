"use client";

import React, { useState } from "react";
import { DistrictWaterEntity } from "@/data/up-75-districts";
import {
  X,
  Droplet,
  ShieldCheck,
  Trophy,
  Activity,
  Layers,
  Sparkles,
  AlertTriangle,
  Compass,
  Calendar,
  CheckCircle2,
  DollarSign,
  Sliders,
  ChevronRight,
} from "lucide-react";

interface ContextPanelProps {
  district: DistrictWaterEntity;
  currentYear: number;
  onClose?: () => void;
  onOpenTrumpCards: () => void;
  onOpenReportError: () => void;
  onOpenJalRakshak?: (tab?: string) => void;
}

export function ContextPanel({
  district,
  currentYear,
  onClose,
  onOpenTrumpCards,
  onOpenReportError,
  onOpenJalRakshak,
}: ContextPanelProps) {
  const [activeTab, setActiveTab] = useState<"health" | "recharge" | "quality">("health");

  // Get current year metrics
  const currentMetrics =
    district.temporalTrajectory.find((t) => t.year === currentYear) ||
    district.temporalTrajectory[district.temporalTrajectory.length - 1];

  return (
    <aside className="w-full lg:w-96 flex flex-col bg-atlas-card border-l border-atlas-border h-full overflow-y-auto z-20 text-atlas-text select-none">
      {/* District Header */}
      <div className="p-4 border-b border-atlas-border bg-atlas-elevated/40">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-serif font-black tracking-wide text-atlas-text">
                {district.name}
              </h2>
              {onClose && (
                <button
                  onClick={onClose}
                  className="lg:hidden p-1 rounded-md text-atlas-muted hover:text-atlas-text"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-atlas-card border border-atlas-border text-emerald-400 font-semibold">
                {district.division} Division
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-atlas-card border border-atlas-border text-atlas-muted">
                {district.region}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-atlas-card border border-atlas-border text-atlas-muted font-mono">
                {district.areaKm2.toLocaleString()} km²
              </span>
            </div>
          </div>

          <button
            onClick={onOpenTrumpCards}
            title="Duel with another UP district on water metrics"
            className="p-2 rounded-xl bg-saffron/15 hover:bg-saffron/25 border border-saffron/30 text-saffron transition"
          >
            <Trophy className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 mt-4 p-0.5 rounded-lg bg-atlas-card border border-atlas-border text-xs">
          <button
            onClick={() => setActiveTab("health")}
            className={`flex-1 py-1 rounded-md font-medium transition ${
              activeTab === "health"
                ? "bg-emerald-600 text-white font-bold"
                : "text-atlas-muted hover:text-atlas-text"
            }`}
          >
            💧 Health & Trend
          </button>
          <button
            onClick={() => setActiveTab("recharge")}
            className={`flex-1 py-1 rounded-md font-medium transition ${
              activeTab === "recharge"
                ? "bg-sky-600 text-white font-bold"
                : "text-atlas-muted hover:text-atlas-text"
            }`}
          >
            🏗️ Recharge
          </button>
          <button
            onClick={() => setActiveTab("quality")}
            className={`flex-1 py-1 rounded-md font-medium transition ${
              activeTab === "quality"
                ? "bg-purple-600 text-white font-bold"
                : "text-atlas-muted hover:text-atlas-text"
            }`}
          >
            🧪 Water Quality
          </button>
        </div>
      </div>

      {/* Tab Body */}
      <div className="p-4 space-y-4 flex-1">
        {activeTab === "health" && (
          <>
            {/* Active Year KPI Card */}
            <div className="p-3.5 rounded-xl bg-atlas-elevated/70 border border-atlas-border space-y-2">
              <div className="flex items-center justify-between text-[11px] text-atlas-muted">
                <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  Horizon: {currentYear} ({currentMetrics.phase})
                </span>
                <span className="font-mono text-saffron font-bold">
                  Score: {currentMetrics.stress_score}/100
                </span>
              </div>

              <div className="flex items-baseline justify-between mt-1">
                <div>
                  <span className="text-[11px] text-atlas-muted">Water Table Depth:</span>
                  <div className="text-2xl font-mono font-black text-atlas-text">
                    {currentMetrics.depth_m} <span className="text-xs font-sans font-normal text-atlas-muted">m bgl</span>
                  </div>
                </div>
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    currentMetrics.category === "Over-Exploited"
                      ? "bg-red-500/20 text-red-400 border border-red-500/40"
                      : currentMetrics.category === "Critical"
                      ? "bg-orange-500/20 text-orange-400 border border-orange-500/40"
                      : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                  }`}
                >
                  {currentMetrics.category}
                </span>
              </div>
            </div>

            {/* Core Hydrological Telemetry */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-atlas-elevated/40 border border-atlas-border">
                <span className="text-atlas-muted text-[10px]">Annual Decline Rate</span>
                <div className="text-sm font-mono font-bold text-rose-400 mt-1">
                  {district.modernWaterMetrics.groundwaterTrendAnnualCm} cm/yr
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-atlas-elevated/40 border border-atlas-border">
                <span className="text-atlas-muted text-[10px]">CGWB Stage of Ext.</span>
                <div className="text-sm font-mono font-bold text-amber-400 mt-1">
                  {district.modernWaterMetrics.cgwbStageExtractionPct}%
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-atlas-elevated/40 border border-atlas-border">
                <span className="text-atlas-muted text-[10px]">Annual Monsoon Rain</span>
                <div className="text-sm font-mono font-bold text-sky-400 mt-1">
                  {district.modernWaterMetrics.avgRainfallMm} mm
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-atlas-elevated/40 border border-atlas-border">
                <span className="text-atlas-muted text-[10px]">Annual Demand</span>
                <div className="text-sm font-mono font-bold text-purple-400 mt-1">
                  {district.modernWaterMetrics.annualDemandMcm} MCM
                </div>
              </div>
            </div>

            {/* Longitudinal Trend (2000 to 2035) */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-atlas-muted flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                Aquifer Trajectory (2000 – 2035)
              </h4>
              <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                {district.temporalTrajectory.map((t, idx) => {
                  const isCurrent = t.year === currentYear;
                  return (
                    <div
                      key={idx}
                      className={`p-2 rounded-lg text-xs flex items-center justify-between border transition ${
                        isCurrent
                          ? "bg-emerald-500/15 border-emerald-500/50 text-emerald-700 dark:text-emerald-300 font-bold"
                          : "bg-atlas-elevated/30 border-atlas-border/50 text-atlas-muted"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-saffron">{t.year}</span>
                        <span className="text-[10px] text-atlas-muted">{t.phase}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-atlas-text font-bold">{t.depth_m}m</span>
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                            t.category === "Over-Exploited"
                              ? "bg-red-500/20 text-red-400"
                              : t.category === "Critical"
                              ? "bg-amber-500/20 text-amber-400"
                              : "bg-emerald-500/20 text-emerald-400"
                          }`}
                        >
                          {t.category}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* River Basin */}
            <div className="p-2.5 rounded-lg bg-atlas-elevated/30 border border-atlas-border text-xs">
              <span className="text-atlas-muted">Major River Basin:</span>
              <div className="font-semibold text-atlas-text mt-0.5">
                {district.modernWaterMetrics.majorRiverBasin}
              </div>
            </div>
          </>
        )}

        {activeTab === "recharge" && (
          <div className="space-y-3">
            {/* Suitability Score Card */}
            <div className="p-3.5 rounded-xl bg-atlas-elevated/50 border border-atlas-border flex items-center justify-between">
              <div>
                <span className="text-xs text-atlas-muted">Recharge Suitability</span>
                <div className="text-2xl font-serif font-black text-cyan-400 mt-0.5">
                  {district.rechargeSuitabilityScore} <span className="text-xs font-sans text-atlas-muted">/ 100</span>
                </div>
              </div>
              <div className="text-right text-xs">
                <div className="text-atlas-text font-medium">{district.soilType}</div>
                <div className="text-atlas-muted text-[11px]">Slope: {district.slopePct}%</div>
              </div>
            </div>

            {/* Recommended Engineering Structures */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-atlas-muted">
                Top Engineering Interventions
              </h4>
              <div className="space-y-2">
                {district.recommendedRechargeStructures.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-atlas-elevated/40 border border-atlas-border space-y-1 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-atlas-text">#{idx + 1} {item.structure}</span>
                      <span className="text-[10px] font-bold text-emerald-500 dark:text-emerald-400">
                        {item.suitability}% Match
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-atlas-muted">
                      <span>Est. Cost: ₹{item.unit_cost_inr.toLocaleString()}</span>
                      <span className="text-sky-600 dark:text-sky-300 font-mono font-bold">+{item.capacity_m3_yr.toLocaleString()} m³/yr</span>
                    </div>
                    <p className="text-[10px] text-atlas-muted italic pt-0.5">
                      {item.target}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "quality" && (
          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-atlas-elevated/50 border border-atlas-border flex items-center justify-between">
              <div>
                <span className="text-xs text-atlas-muted">Water Quality Index (WQI)</span>
                <div className="text-2xl font-serif font-black text-purple-600 dark:text-purple-400 mt-0.5">
                  74.2 <span className="text-xs font-sans text-atlas-muted">/ 100</span>
                </div>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                BIS 10500 Compliant
              </span>
            </div>

            <div className="space-y-2">
              {[
                { name: "pH Level", val: "7.4", limit: "6.5 - 8.5", ok: true },
                { name: "TDS (Total Dissolved Solids)", val: "680 mg/L", limit: "< 2000 mg/L", ok: true },
                { name: "Fluoride (F)", val: "1.1 mg/L", limit: "< 1.5 mg/L", ok: true },
                { name: "Nitrate (NO3)", val: "48 mg/L", limit: "< 45 mg/L", ok: false },
                { name: "Arsenic (As)", val: "0.007 mg/L", limit: "< 0.01 mg/L", ok: true },
              ].map((p, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-atlas-elevated/30 border border-atlas-border flex justify-between items-center">
                  <div>
                    <span className="font-semibold text-atlas-text">{p.name}</span>
                    <div className="text-[10px] text-atlas-muted">Standard: {p.limit}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-bold text-atlas-text">{p.val}</div>
                    <span className={`text-[9px] font-bold ${p.ok ? "text-emerald-500 dark:text-emerald-400" : "text-rose-500 dark:text-rose-400"}`}>
                      {p.ok ? "Safe" : "Requires Filter"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* JalRakshak Suite Quick Tool Launchers */}
        {onOpenJalRakshak && (
          <div className="space-y-2 pt-1">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => onOpenJalRakshak("balance")}
                className="p-2 rounded-xl bg-atlas-elevated hover:bg-atlas-elevated/80 border border-atlas-border text-left font-semibold text-atlas-text transition flex items-center justify-between"
              >
                <span>⚖️ Water Balance</span>
                <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
              </button>
              <button
                onClick={() => onOpenJalRakshak("leakage")}
                className="p-2 rounded-xl bg-atlas-elevated hover:bg-atlas-elevated/80 border border-atlas-border text-left font-semibold text-atlas-text transition flex items-center justify-between"
              >
                <span>🚰 NRW Leakage</span>
                <ChevronRight className="w-3.5 h-3.5 text-sky-400" />
              </button>
              <button
                onClick={() => onOpenJalRakshak("copilot")}
                className="p-2 rounded-xl bg-atlas-elevated hover:bg-atlas-elevated/80 border border-atlas-border text-left font-semibold text-atlas-text transition flex items-center justify-between"
              >
                <span>🤖 AI Copilot</span>
                <ChevronRight className="w-3.5 h-3.5 text-saffron" />
              </button>
              <button
                onClick={() => onOpenJalRakshak("grievance")}
                className="p-2 rounded-xl bg-atlas-elevated hover:bg-atlas-elevated/80 border border-atlas-border text-left font-semibold text-atlas-text transition flex items-center justify-between"
              >
                <span>📢 Grievances</span>
                <ChevronRight className="w-3.5 h-3.5 text-rose-400" />
              </button>
            </div>

            <button
              onClick={() => onOpenJalRakshak("recharge")}
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-glow flex items-center justify-center gap-2 transition"
            >
              <span>🛡️ Open Full JalRakshak AI Decision Suite</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Footer Credibility & Error Reporting */}
      <div className="p-3 border-t border-atlas-border bg-atlas-elevated/20 flex items-center justify-between text-[11px]">
        <span className="text-atlas-faint flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          CGWB 2024 & IMD Open Data
        </span>
        <button
          onClick={onOpenReportError}
          className="text-saffron hover:underline flex items-center gap-1 font-medium"
        >
          <AlertTriangle className="w-3 h-3" />
          Suggest Correction
        </button>
      </div>
    </aside>
  );
}
