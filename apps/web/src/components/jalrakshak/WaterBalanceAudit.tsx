"use client";

import React, { useState } from "react";
import { DistrictWaterEntity } from "@/data/up-75-districts";
import { Scale, ArrowDownRight, ArrowUpRight, Droplet, ShieldAlert, CheckCircle2, RefreshCw } from "lucide-react";

interface WaterBalanceAuditProps {
  district: DistrictWaterEntity;
}

export function WaterBalanceAudit({ district }: WaterBalanceAuditProps) {
  const [irrigationEfficiencyGain, setIrrigationEfficiencyGain] = useState<number>(0); // 0 to 30% savings
  const [monsoonAdjustmentPct, setMonsoonAdjustmentPct] = useState<number>(0); // -30% to +30%

  const annualDemand = district.modernWaterMetrics.annualDemandMcm;
  const rainfall = district.modernWaterMetrics.avgRainfallMm;
  const areaKm2 = district.areaKm2;
  const baseStage = district.modernWaterMetrics.cgwbStageExtractionPct;

  // Hydrological Infiltration Estimation (CGWB GEC-2015 Methodology)
  const adjustedRainfall = rainfall * (1 + monsoonAdjustmentPct / 100);
  // Rainfall infiltration factor ~16% for alluvial, ~8% for hard rock
  const isHardRock = district.soilType.toLowerCase().includes("rock") || district.soilType.toLowerCase().includes("granit");
  const infiltrationFactor = isHardRock ? 0.08 : 0.17;

  // Annual Replenishable Groundwater Recharge (MCM)
  const rainfallRechargeMcm = +((areaKm2 * (adjustedRainfall / 1000) * infiltrationFactor)).toFixed(1);
  const canalSeepageMcm = +(rainfallRechargeMcm * 0.18).toFixed(1);
  const surfaceWaterPercolationMcm = +(rainfallRechargeMcm * 0.12).toFixed(1);
  const returnFlowIrrigationMcm = +(annualDemand * 0.10).toFixed(1);

  const totalInflowMcm = +(
    rainfallRechargeMcm +
    canalSeepageMcm +
    surfaceWaterPercolationMcm +
    returnFlowIrrigationMcm
  ).toFixed(1);

  // Environmental Baseflow / Unaccounted natural discharge (~10%)
  const environmentalBaseflowMcm = +(totalInflowMcm * 0.10).toFixed(1);
  const netAvailableRechargeMcm = +(totalInflowMcm - environmentalBaseflowMcm).toFixed(1);

  // Annual Groundwater Draft Breakdown
  const baseAgriDraft = annualDemand * 0.82;
  const adjustedAgriDraft = +(baseAgriDraft * (1 - irrigationEfficiencyGain / 100)).toFixed(1);
  const domesticDraftMcm = +(annualDemand * 0.12).toFixed(1);
  const industrialDraftMcm = +(annualDemand * 0.06).toFixed(1);

  const totalDraftMcm = +(
    adjustedAgriDraft +
    domesticDraftMcm +
    industrialDraftMcm
  ).toFixed(1);

  // Net Balance = Net Availability - Total Draft
  const netAquiferBalanceMcm = +(netAvailableRechargeMcm - totalDraftMcm).toFixed(1);
  const effectiveStage = +( (totalDraftMcm / (netAvailableRechargeMcm || 1)) * 100 ).toFixed(1);

  const isDeficit = netAquiferBalanceMcm < 0;

  return (
    <div className="space-y-6 text-atlas-text">
      {/* Top Banner & Overview */}
      <div className="p-4 sm:p-5 rounded-2xl bg-atlas-elevated/40 border border-atlas-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
            <h3 className="text-base font-serif font-bold text-atlas-text">
              Dynamic Aquifer Water Balance Audit — {district.name}
            </h3>
          </div>
          <p className="text-xs text-atlas-muted mt-1">
            CGWB GEC Methodology: Annual Natural Replenishment vs Total Tubewell Extraction
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 ${
            isDeficit
              ? "bg-rose-500/15 border-rose-500/40 text-rose-500 dark:text-rose-400"
              : "bg-emerald-500/15 border-emerald-500/40 text-emerald-600 dark:text-emerald-400"
          }`}>
            {isDeficit ? <ArrowDownRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
            <span>Net Balance: {netAquiferBalanceMcm > 0 ? `+${netAquiferBalanceMcm}` : netAquiferBalanceMcm} MCM/yr</span>
          </div>

          <span className={`px-2.5 py-1.5 rounded-xl text-xs font-mono font-bold ${
            effectiveStage > 100
              ? "bg-red-500/20 text-red-500 dark:text-red-400"
              : effectiveStage > 70
              ? "bg-amber-500/20 text-amber-500 dark:text-amber-400"
              : "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
          }`}>
            Stage: {effectiveStage}%
          </span>
        </div>
      </div>

      {/* Interactive Simulation Levers */}
      <div className="p-4 rounded-xl bg-atlas-card border border-atlas-border grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-atlas-muted font-medium">Monsoon Rainfall Departure Simulation:</span>
            <span className="font-mono font-bold text-sky-500 dark:text-sky-400">
              {monsoonAdjustmentPct > 0 ? `+${monsoonAdjustmentPct}%` : `${monsoonAdjustmentPct}%`} ({Math.round(adjustedRainfall)} mm)
            </span>
          </div>
          <input
            type="range"
            min={-40}
            max={40}
            step={5}
            value={monsoonAdjustmentPct}
            onChange={(e) => setMonsoonAdjustmentPct(Number(e.target.value))}
            className="w-full h-2 bg-atlas-elevated rounded-lg appearance-none cursor-pointer accent-sky-500"
          />
          <div className="flex justify-between text-[10px] text-atlas-faint mt-1">
            <span>Severe Drought (-40%)</span>
            <span>Normal (0%)</span>
            <span>Excess Monsoon (+40%)</span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-atlas-muted font-medium">Micro-Irrigation (Drip/Sprinkler) Adoption:</span>
            <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
              {irrigationEfficiencyGain}% Draft Reduction
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={35}
            step={5}
            value={irrigationEfficiencyGain}
            onChange={(e) => setIrrigationEfficiencyGain(Number(e.target.value))}
            className="w-full h-2 bg-atlas-elevated rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <div className="flex justify-between text-[10px] text-atlas-faint mt-1">
            <span>Flood Irrigation (0%)</span>
            <span>Target PMKSY Coverage (20%)</span>
            <span>High Tech (35%)</span>
          </div>
        </div>
      </div>

      {/* Two Column Balance Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* INFLOW CHANNELS */}
        <div className="p-4 rounded-xl bg-atlas-elevated/30 border border-atlas-border space-y-3">
          <div className="flex items-center justify-between border-b border-atlas-border pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <Droplet className="w-3.5 h-3.5" />
              Annual Inflow Replenishment
            </span>
            <span className="font-mono text-sm font-black text-emerald-600 dark:text-emerald-400">
              +{totalInflowMcm} MCM
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-lg bg-atlas-card border border-atlas-border/50 flex justify-between items-center">
              <div>
                <div className="font-semibold text-atlas-text">Monsoon Rainfall Infiltration</div>
                <div className="text-[10px] text-atlas-muted">Direct percolation from precipitation</div>
              </div>
              <span className="font-mono font-bold text-sky-500 dark:text-sky-400">+{rainfallRechargeMcm} MCM</span>
            </div>

            <div className="p-2.5 rounded-lg bg-atlas-card border border-atlas-border/50 flex justify-between items-center">
              <div>
                <div className="font-semibold text-atlas-text">Canal Seepage & Waterways</div>
                <div className="text-[10px] text-atlas-muted">Transmission seepage into shallow unconfined zone</div>
              </div>
              <span className="font-mono font-bold text-sky-500 dark:text-sky-400">+{canalSeepageMcm} MCM</span>
            </div>

            <div className="p-2.5 rounded-lg bg-atlas-card border border-atlas-border/50 flex justify-between items-center">
              <div>
                <div className="font-semibold text-atlas-text">Surface Water Ponds / Amrit Sarovar</div>
                <div className="text-[10px] text-atlas-muted">Village depressions & water retention structures</div>
              </div>
              <span className="font-mono font-bold text-sky-500 dark:text-sky-400">+{surfaceWaterPercolationMcm} MCM</span>
            </div>

            <div className="p-2.5 rounded-lg bg-atlas-card border border-atlas-border/50 flex justify-between items-center">
              <div>
                <div className="font-semibold text-atlas-text">Return Flow from Agricultural Irrigation</div>
                <div className="text-[10px] text-atlas-muted">Gravity drainage from agricultural fields</div>
              </div>
              <span className="font-mono font-bold text-sky-500 dark:text-sky-400">+{returnFlowIrrigationMcm} MCM</span>
            </div>

            <div className="pt-1 border-t border-atlas-border/50 flex justify-between text-[11px] text-atlas-muted">
              <span>Less Environmental Baseflow / Evapotranspiration:</span>
              <span className="font-mono text-rose-500">-{environmentalBaseflowMcm} MCM</span>
            </div>
            <div className="flex justify-between text-xs font-bold text-atlas-text">
              <span>Net Annual Groundwater Availability:</span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400">{netAvailableRechargeMcm} MCM</span>
            </div>
          </div>
        </div>

        {/* OUTFLOW DRAFT CHANNELS */}
        <div className="p-4 rounded-xl bg-atlas-elevated/30 border border-atlas-border space-y-3">
          <div className="flex items-center justify-between border-b border-atlas-border pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-500 dark:text-rose-400 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" />
              Annual Tubewell Extraction Draft
            </span>
            <span className="font-mono text-sm font-black text-rose-500 dark:text-rose-400">
              -{totalDraftMcm} MCM
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-lg bg-atlas-card border border-atlas-border/50 flex justify-between items-center">
              <div>
                <div className="font-semibold text-atlas-text">Agricultural Irrigation Tubewells</div>
                <div className="text-[10px] text-atlas-muted">Paddy, sugarcane, wheat deep tubewell pumping</div>
              </div>
              <span className="font-mono font-bold text-rose-500 dark:text-rose-400">-{adjustedAgriDraft} MCM</span>
            </div>

            <div className="p-2.5 rounded-lg bg-atlas-card border border-atlas-border/50 flex justify-between items-center">
              <div>
                <div className="font-semibold text-atlas-text">Domestic & Drinking Water Supply</div>
                <div className="text-[10px] text-atlas-muted">Municipal Jal Sansthan & rural Jal Jeevan Mission</div>
              </div>
              <span className="font-mono font-bold text-amber-500 dark:text-amber-400">-{domesticDraftMcm} MCM</span>
            </div>

            <div className="p-2.5 rounded-lg bg-atlas-card border border-atlas-border/50 flex justify-between items-center">
              <div>
                <div className="font-semibold text-atlas-text">Industrial & Commercial Extraction</div>
                <div className="text-[10px] text-atlas-muted">Manufacturing, brick kilns, construction draft</div>
              </div>
              <span className="font-mono font-bold text-purple-500 dark:text-purple-400">-{industrialDraftMcm} MCM</span>
            </div>

            {/* Visual Balance Bar */}
            <div className="pt-3 space-y-1.5">
              <div className="flex justify-between text-[11px] text-atlas-muted">
                <span>Extraction vs Safe Inflow Ratio:</span>
                <span className="font-mono font-bold">{effectiveStage}%</span>
              </div>
              <div className="w-full h-3 bg-atlas-elevated rounded-full overflow-hidden flex">
                <div
                  className={`h-full transition-all ${
                    effectiveStage > 100 ? "bg-rose-500" : effectiveStage > 70 ? "bg-amber-500" : "bg-emerald-500"
                  }`}
                  style={{ width: `${Math.min(100, effectiveStage)}%` }}
                />
              </div>
            </div>

            <div className={`p-2.5 rounded-lg border text-xs mt-2 ${
              isDeficit
                ? "bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-300"
                : "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300"
            }`}>
              {isDeficit
                ? `⚠️ Over-Extraction Alert: Aquifer storage is being depleted at ${Math.abs(netAquiferBalanceMcm)} MCM/year! Urgent artificial recharge wells and mandatory micro-irrigation required.`
                : `✅ Sustainable Inflow: Replenishment exceeds extraction by ${netAquiferBalanceMcm} MCM/year. Continue monitoring seasonal fluctuations.`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
