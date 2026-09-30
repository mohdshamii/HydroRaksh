"use client";

import React, { useState, useMemo } from "react";
import { UP_75_WATER_DISTRICTS, DistrictWaterEntity } from "@/data/up-75-districts";
import { Search, Download, ArrowUpDown, Filter, CheckCircle2, Shield, Eye } from "lucide-react";

interface DistrictMatrixExplorerProps {
  onSelectDistrict?: (id: string) => void;
}

type SortField =
  | "name"
  | "depth"
  | "trend"
  | "stage"
  | "rain"
  | "stress"
  | "suitability";

export function DistrictMatrixExplorer({ onSelectDistrict }: DistrictMatrixExplorerProps) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [divisionFilter, setDivisionFilter] = useState<string>("All");
  const [sortField, setSortField] = useState<SortField>("stress");
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  // Distinct divisions
  const divisions = useMemo(() => {
    return Array.from(new Set(UP_75_WATER_DISTRICTS.map((d) => d.division))).sort();
  }, []);

  // Filter & Sort
  const filteredDistricts = useMemo(() => {
    let list = UP_75_WATER_DISTRICTS.filter((d) => {
      const matchSearch =
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.division.toLowerCase().includes(search.toLowerCase()) ||
        d.soilType.toLowerCase().includes(search.toLowerCase()) ||
        d.modernWaterMetrics.majorRiverBasin.toLowerCase().includes(search.toLowerCase());

      const matchCategory =
        categoryFilter === "All" || d.modernWaterMetrics.cgwbCategory === categoryFilter;

      const matchDivision =
        divisionFilter === "All" || d.division === divisionFilter;

      return matchSearch && matchCategory && matchDivision;
    });

    list.sort((a, b) => {
      let valA: number | string = 0;
      let valB: number | string = 0;

      switch (sortField) {
        case "name":
          valA = a.name;
          valB = b.name;
          break;
        case "depth":
          valA = a.modernWaterMetrics.groundwaterDepthM;
          valB = b.modernWaterMetrics.groundwaterDepthM;
          break;
        case "trend":
          valA = a.modernWaterMetrics.groundwaterTrendAnnualCm;
          valB = b.modernWaterMetrics.groundwaterTrendAnnualCm;
          break;
        case "stage":
          valA = a.modernWaterMetrics.cgwbStageExtractionPct;
          valB = b.modernWaterMetrics.cgwbStageExtractionPct;
          break;
        case "rain":
          valA = a.modernWaterMetrics.avgRainfallMm;
          valB = b.modernWaterMetrics.avgRainfallMm;
          break;
        case "stress":
          valA = a.modernWaterMetrics.waterStressScore;
          valB = b.modernWaterMetrics.waterStressScore;
          break;
        case "suitability":
          valA = a.rechargeSuitabilityScore;
          valB = b.rechargeSuitabilityScore;
          break;
      }

      if (typeof valA === "string" && typeof valB === "string") {
        return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortAsc ? Number(valA) - Number(valB) : Number(valB) - Number(valA);
    });

    return list;
  }, [search, categoryFilter, divisionFilter, sortField, sortAsc]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const handleExportCSV = () => {
    const headers = [
      "District",
      "Division",
      "Region",
      "Area_Km2",
      "Water_Table_Depth_m_bgl",
      "Annual_Fall_Rate_cm_yr",
      "CGWB_Category",
      "Extraction_Stage_Pct",
      "Annual_Rainfall_mm",
      "Annual_Demand_MCM",
      "Water_Stress_Score_100",
      "AI_Recharge_Suitability_100",
      "Soil_Type",
      "Major_River_Basin",
    ];

    const rows = filteredDistricts.map((d) => [
      `"${d.name}"`,
      `"${d.division}"`,
      `"${d.region}"`,
      d.areaKm2,
      d.modernWaterMetrics.groundwaterDepthM,
      d.modernWaterMetrics.groundwaterTrendAnnualCm,
      `"${d.modernWaterMetrics.cgwbCategory}"`,
      d.modernWaterMetrics.cgwbStageExtractionPct,
      d.modernWaterMetrics.avgRainfallMm,
      d.modernWaterMetrics.annualDemandMcm,
      d.modernWaterMetrics.waterStressScore,
      d.rechargeSuitabilityScore,
      `"${d.soilType}"`,
      `"${d.modernWaterMetrics.majorRiverBasin}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `jalrakshak_up_75_districts_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 text-atlas-text">
      {/* Top Banner & Export */}
      <div className="p-4 rounded-2xl bg-atlas-elevated/40 border border-atlas-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-serif font-bold text-atlas-text">
            75-District Multi-Metric Hydrological Ranking Matrix
          </h3>
          <p className="text-xs text-atlas-muted mt-0.5">
            Complete comparative dataset of all 75 districts of Uttar Pradesh • Click column header to sort
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-glow transition"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Dataset (CSV)</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
        <div className="sm:col-span-6 relative">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-atlas-muted" />
          <input
            type="text"
            placeholder="Filter by district name, division, soil, or river basin..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-atlas-card border border-atlas-border text-atlas-text placeholder:text-atlas-faint focus:outline-none focus:ring-1 focus:ring-emerald-400"
          />
        </div>

        <div className="sm:col-span-3">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full py-2 px-3 rounded-xl bg-atlas-card border border-atlas-border text-atlas-text focus:outline-none focus:ring-1 focus:ring-emerald-400 font-medium"
          >
            <option value="All">All CGWB Categories</option>
            <option value="Over-Exploited">Over-Exploited (&gt;100%)</option>
            <option value="Critical">Critical (90-100%)</option>
            <option value="Semi-Critical">Semi-Critical (70-90%)</option>
            <option value="Safe">Safe (&lt;70%)</option>
          </select>
        </div>

        <div className="sm:col-span-3">
          <select
            value={divisionFilter}
            onChange={(e) => setDivisionFilter(e.target.value)}
            className="w-full py-2 px-3 rounded-xl bg-atlas-card border border-atlas-border text-atlas-text focus:outline-none focus:ring-1 focus:ring-emerald-400 font-medium"
          >
            <option value="All">All 18 Divisions</option>
            {divisions.map((div) => (
              <option key={div} value={div}>
                {div} Division
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="rounded-2xl border border-atlas-border bg-atlas-card overflow-hidden shadow-sm">
        <div className="overflow-x-auto max-h-[500px]">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-atlas-elevated/70 sticky top-0 z-10 border-b border-atlas-border text-atlas-muted select-none">
              <tr>
                <th
                  onClick={() => handleSort("name")}
                  className="p-3 font-semibold cursor-pointer hover:text-atlas-text"
                >
                  <div className="flex items-center gap-1">
                    <span>District & Division</span>
                    <ArrowUpDown className="w-3 h-3 text-atlas-faint" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("depth")}
                  className="p-3 font-semibold cursor-pointer hover:text-atlas-text"
                >
                  <div className="flex items-center gap-1">
                    <span>Depth (m bgl)</span>
                    <ArrowUpDown className="w-3 h-3 text-atlas-faint" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("trend")}
                  className="p-3 font-semibold cursor-pointer hover:text-atlas-text"
                >
                  <div className="flex items-center gap-1">
                    <span>Fall Rate</span>
                    <ArrowUpDown className="w-3 h-3 text-atlas-faint" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("stage")}
                  className="p-3 font-semibold cursor-pointer hover:text-atlas-text"
                >
                  <div className="flex items-center gap-1">
                    <span>Extraction Stage</span>
                    <ArrowUpDown className="w-3 h-3 text-atlas-faint" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("stress")}
                  className="p-3 font-semibold cursor-pointer hover:text-atlas-text"
                >
                  <div className="flex items-center gap-1">
                    <span>Stress Score</span>
                    <ArrowUpDown className="w-3 h-3 text-atlas-faint" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("suitability")}
                  className="p-3 font-semibold cursor-pointer hover:text-atlas-text"
                >
                  <div className="flex items-center gap-1">
                    <span>Recharge Score</span>
                    <ArrowUpDown className="w-3 h-3 text-atlas-faint" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("rain")}
                  className="p-3 font-semibold cursor-pointer hover:text-atlas-text"
                >
                  <div className="flex items-center gap-1">
                    <span>Rainfall</span>
                    <ArrowUpDown className="w-3 h-3 text-atlas-faint" />
                  </div>
                </th>
                <th className="p-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-atlas-border/50">
              {filteredDistricts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-atlas-muted">
                    No districts match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredDistricts.map((d) => (
                  <tr
                    key={d.id}
                    className="hover:bg-atlas-elevated/40 transition group cursor-pointer"
                    onClick={() => onSelectDistrict && onSelectDistrict(d.id)}
                  >
                    <td className="p-3 font-medium text-atlas-text">
                      <div className="font-bold group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition">
                        {d.name}
                      </div>
                      <div className="text-[10px] text-atlas-muted">{d.division} • {d.region}</div>
                    </td>

                    <td className="p-3 font-mono font-bold text-atlas-text">
                      {d.modernWaterMetrics.groundwaterDepthM} m
                    </td>

                    <td className="p-3 font-mono font-bold text-rose-500 dark:text-rose-400">
                      {d.modernWaterMetrics.groundwaterTrendAnnualCm} cm/yr
                    </td>

                    <td className="p-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          d.modernWaterMetrics.cgwbStageExtractionPct > 100
                            ? "bg-red-500/20 text-red-500 dark:text-red-400 border-red-500/30"
                            : d.modernWaterMetrics.cgwbStageExtractionPct > 70
                            ? "bg-amber-500/20 text-amber-500 dark:text-amber-400 border-amber-500/30"
                            : "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                        }`}
                      >
                        {d.modernWaterMetrics.cgwbStageExtractionPct}% ({d.modernWaterMetrics.cgwbCategory})
                      </span>
                    </td>

                    <td className="p-3 font-mono font-black text-saffron">
                      {d.modernWaterMetrics.waterStressScore} / 100
                    </td>

                    <td className="p-3 font-mono font-black text-cyan-600 dark:text-cyan-400">
                      {d.rechargeSuitabilityScore} / 100
                    </td>

                    <td className="p-3 font-mono text-sky-600 dark:text-sky-400">
                      {d.modernWaterMetrics.avgRainfallMm} mm
                    </td>

                    <td className="p-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onSelectDistrict) onSelectDistrict(d.id);
                        }}
                        className="p-1.5 rounded-lg bg-atlas-elevated hover:bg-emerald-600 text-atlas-muted hover:text-white transition"
                        title="Focus on Map & Dossier"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-between items-center text-xs text-atlas-muted px-1">
        <span>Showing {filteredDistricts.length} of 75 districts</span>
        <span>Source: Central Ground Water Board (CGWB) & IMD Hydro-Meteorological Division</span>
      </div>
    </div>
  );
}
