"use client";

import React, { useState } from "react";
import { DistrictWaterEntity } from "@/data/up-75-districts";
import { Droplet, AlertTriangle, Activity, DollarSign, Wrench, CheckCircle2, ShieldAlert } from "lucide-react";

interface NRWLeakageAnalyticsProps {
  district: DistrictWaterEntity;
}

export function NRWLeakageAnalytics({ district }: NRWLeakageAnalyticsProps) {
  // Municipal parameters (scaled according to district population & demand)
  const baseBulkSupplyMLD = +(district.modernWaterMetrics.annualDemandMcm * 0.28 * (1000 / 365)).toFixed(1);
  const [targetNRWPct, setTargetNRWPct] = useState<number>(20); // Jal Jeevan Mission target: 15-20%
  const [selectedDMA, setSelectedDMA] = useState<string>("DMA-01-Central");
  const [dispatchAlertSent, setDispatchAlertSent] = useState<boolean>(false);

  // Baseline NRW percentage typical for Indian cities (32% to 48%)
  const isNCRorWest = district.region.includes("Doab") || district.division === "Meerut";
  const baselineNRWPct = isNCRorWest ? 42.5 : 36.8;

  const billedConsumptionMLD = +(baseBulkSupplyMLD * (1 - baselineNRWPct / 100)).toFixed(1);
  const unbilledLossMLD = +(baseBulkSupplyMLD - billedConsumptionMLD).toFixed(1);

  // Breakdown of losses
  const physicalLeakageMLD = +(unbilledLossMLD * 0.65).toFixed(1);
  const unauthorizedTheftMLD = +(unbilledLossMLD * 0.23).toFixed(1);
  const meterInaccuracyMLD = +(unbilledLossMLD * 0.12).toFixed(1);

  // Financial Impact (Water production cost ~₹18 per kilolitre)
  const productionCostPerKL = 18;
  const annualLossINR = Math.round(unbilledLossMLD * 1000 * 365 * productionCostPerKL);
  const annualLossCrores = +(annualLossINR / 10000000).toFixed(2);

  // Potential savings if brought to target NRW %
  const targetLossMLD = +(baseBulkSupplyMLD * (targetNRWPct / 100)).toFixed(1);
  const recoverableLossMLD = Math.max(0, +(unbilledLossMLD - targetLossMLD).toFixed(1));
  const recoverableSavingsCrores = +(
    (recoverableLossMLD * 1000 * 365 * productionCostPerKL) / 10000000
  ).toFixed(2);

  // DMA Pressure & Transient Telemetry Zones
  const dmaZones = [
    { id: "DMA-01-Central", name: "Sector 1 & Civil Lines", pressureBar: 1.8, flowM3h: 340, status: "Normal", leakRisk: "Low" },
    { id: "DMA-02-Industrial", name: "Industrial Phase II Hub", pressureBar: 0.9, flowM3h: 580, status: "Pressure Drop Anomaly", leakRisk: "High Alert (Pipe Burst)" },
    { id: "DMA-03-OldCity", name: "Old City Dense Feeder", pressureBar: 1.2, flowM3h: 410, status: "Background Seepage", leakRisk: "Moderate" },
    { id: "DMA-04-Suburban", name: "Ring Road Suburban Extension", pressureBar: 2.1, flowM3h: 210, status: "Normal", leakRisk: "Low" },
  ];

  const currentDMA = dmaZones.find((d) => d.id === selectedDMA) || dmaZones[0];

  const handleDispatch = () => {
    setDispatchAlertSent(true);
    setTimeout(() => setDispatchAlertSent(false), 3000);
  };

  return (
    <div className="space-y-6 text-atlas-text">
      {/* Top Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-atlas-elevated/40 border border-atlas-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Droplet className="w-5 h-5 text-sky-500 dark:text-sky-400" />
            <h3 className="text-base font-serif font-bold text-atlas-text">
              Non-Revenue Water (NRW) & Distribution Loss Analytics — {district.name}
            </h3>
          </div>
          <p className="text-xs text-atlas-muted mt-1">
            Municipal Water Distribution Efficiency, Pipeline Physical Leakage & Revenue Recovery
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-500 dark:text-rose-400 text-xs font-bold">
            Baseline NRW: {baselineNRWPct}%
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/40 text-purple-600 dark:text-purple-400 text-xs font-bold">
            Annual Loss: ₹{annualLossCrores} Cr
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-atlas-elevated/30 border border-atlas-border">
          <span className="text-[11px] text-atlas-muted">Total Bulk Supply Inflow</span>
          <div className="text-xl font-mono font-black text-sky-500 dark:text-sky-400 mt-1">
            {baseBulkSupplyMLD} <span className="text-xs font-sans font-normal text-atlas-muted">MLD</span>
          </div>
          <span className="text-[10px] text-atlas-faint">Million Litres Per Day</span>
        </div>

        <div className="p-3.5 rounded-xl bg-atlas-elevated/30 border border-atlas-border">
          <span className="text-[11px] text-atlas-muted">Billed Revenue Water</span>
          <div className="text-xl font-mono font-black text-emerald-600 dark:text-emerald-400 mt-1">
            {billedConsumptionMLD} <span className="text-xs font-sans font-normal text-atlas-muted">MLD</span>
          </div>
          <span className="text-[10px] text-atlas-faint">Authorized metered draw</span>
        </div>

        <div className="p-3.5 rounded-xl bg-atlas-elevated/30 border border-atlas-border">
          <span className="text-[11px] text-atlas-muted">Physical Network Leakage</span>
          <div className="text-xl font-mono font-black text-rose-500 dark:text-rose-400 mt-1">
            {physicalLeakageMLD} <span className="text-xs font-sans font-normal text-atlas-muted">MLD</span>
          </div>
          <span className="text-[10px] text-atlas-faint">Underground line fissures</span>
        </div>

        <div className="p-3.5 rounded-xl bg-atlas-elevated/30 border border-atlas-border">
          <span className="text-[11px] text-atlas-muted">Recoverable Savings</span>
          <div className="text-xl font-mono font-black text-saffron mt-1">
            ₹{recoverableSavingsCrores} <span className="text-xs font-sans font-normal text-atlas-muted">Cr/yr</span>
          </div>
          <span className="text-[10px] text-atlas-faint">At {targetNRWPct}% Target NRW</span>
        </div>
      </div>

      {/* Target NRW Slider & Loss Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Loss Component Breakdown */}
        <div className="p-4 rounded-xl bg-atlas-elevated/20 border border-atlas-border space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-atlas-muted flex items-center gap-1.5">
            <DollarSign className="w-4 h-4 text-emerald-500" />
            Unbilled Water Loss Allocation
          </h4>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-lg bg-atlas-card border border-atlas-border/50 flex justify-between items-center">
              <div>
                <span className="font-semibold text-atlas-text">Physical Pipe Leaks & Bursts (65%)</span>
                <div className="text-[10px] text-atlas-muted">Distribution main fractures & joint seepages</div>
              </div>
              <span className="font-mono font-bold text-rose-500 dark:text-rose-400">{physicalLeakageMLD} MLD</span>
            </div>

            <div className="p-2.5 rounded-lg bg-atlas-card border border-atlas-border/50 flex justify-between items-center">
              <div>
                <span className="font-semibold text-atlas-text">Commercial Theft & Illegal Tapping (23%)</span>
                <div className="text-[10px] text-atlas-muted">Unauthorized connections & commercial bypasses</div>
              </div>
              <span className="font-mono font-bold text-amber-500 dark:text-amber-400">{unauthorizedTheftMLD} MLD</span>
            </div>

            <div className="p-2.5 rounded-lg bg-atlas-card border border-atlas-border/50 flex justify-between items-center">
              <div>
                <span className="font-semibold text-atlas-text">Customer Meter Under-Registration (12%)</span>
                <div className="text-[10px] text-atlas-muted">Mechanical meter wear & low-flow inaccuracy</div>
              </div>
              <span className="font-mono font-bold text-purple-500 dark:text-purple-400">{meterInaccuracyMLD} MLD</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-atlas-card border border-atlas-border mt-3 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-atlas-muted font-medium">Policy NRW Reduction Target:</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{targetNRWPct}% NRW</span>
            </div>
            <input
              type="range"
              min={10}
              max={30}
              step={1}
              value={targetNRWPct}
              onChange={(e) => setTargetNRWPct(Number(e.target.value))}
              className="w-full h-2 bg-atlas-elevated rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-atlas-faint">
              <span>World-Class (10%)</span>
              <span>Jal Jeevan Mission Standard (20%)</span>
              <span>Relaxed (30%)</span>
            </div>
          </div>
        </div>

        {/* Real-Time Acoustic & Pressure Pipe Burst Detector */}
        <div className="p-4 rounded-xl bg-atlas-elevated/20 border border-atlas-border space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-atlas-muted flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-rose-500" />
              DMA Pressure & Pipe Burst Detector
            </h4>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
              Live Acoustic Sensors
            </span>
          </div>

          <div className="space-y-2">
            {dmaZones.map((dma) => (
              <div
                key={dma.id}
                onClick={() => setSelectedDMA(dma.id)}
                className={`p-3 rounded-xl border transition cursor-pointer flex items-center justify-between text-xs ${
                  selectedDMA === dma.id
                    ? "bg-atlas-elevated border-emerald-500/60 shadow-sm"
                    : "bg-atlas-card border-atlas-border/50 hover:bg-atlas-elevated/50"
                }`}
              >
                <div>
                  <div className="font-semibold text-atlas-text flex items-center gap-1.5">
                    {dma.name}
                    {dma.leakRisk.includes("High Alert") && (
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                    )}
                  </div>
                  <div className="text-[10px] text-atlas-muted mt-0.5">
                    Pressure: {dma.pressureBar} bar • Flow: {dma.flowM3h} m³/h
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      dma.leakRisk.includes("High Alert")
                        ? "bg-red-500/20 text-red-500 dark:text-red-400 border border-red-500/30"
                        : dma.leakRisk.includes("Moderate")
                        ? "bg-amber-500/20 text-amber-500 dark:text-amber-400 border border-amber-500/30"
                        : "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                    }`}
                  >
                    {dma.leakRisk}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Action Trigger for Selected DMA */}
          <div className="p-3 rounded-xl bg-atlas-card border border-atlas-border space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-atlas-text">Focus DMA: {currentDMA.name}</span>
              <span className="text-[10px] text-atlas-muted font-mono">{currentDMA.status}</span>
            </div>

            {currentDMA.leakRisk.includes("High Alert") ? (
              <div className="space-y-2">
                <p className="text-[11px] text-rose-500 dark:text-rose-400 leading-relaxed">
                  ⚠️ Pressure dropped by 55% with a sudden flow surge of +240 m³/h. Acoustic signature matches a main conduit burst!
                </p>
                <button
                  onClick={handleDispatch}
                  className="w-full py-2 px-3 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-glow flex items-center justify-center gap-1.5 transition"
                >
                  <Wrench className="w-3.5 h-3.5" />
                  {dispatchAlertSent ? "Crew Dispatched to DMA!" : "Dispatch Emergency Jal Sansthan Repair Crew"}
                </button>
              </div>
            ) : (
              <p className="text-[11px] text-atlas-muted">
                Pressure transients within safe operating limits. No acoustic anomaly detected on distribution mains.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
