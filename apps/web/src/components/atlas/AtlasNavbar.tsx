"use client";

import React, { useState } from "react";
import { Search, Moon, Sun, Layers, Trophy, Sparkles, Share2, Shield, Droplets, Bot, Table, ShieldAlert } from "lucide-react";
import { UP_75_WATER_DISTRICTS } from "@/data/up-75-districts";

interface AtlasNavbarProps {
  currentYear: number;
  selectedDistrictId: string;
  onSelectDistrict: (id: string) => void;
  onSelectYear: (year: number) => void;
  viewMode: "water" | "recharge";
  onToggleViewMode: (mode: "water" | "recharge") => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
  onOpenTrumpCards: () => void;
  onOpenStatCards: () => void;
  onOpenPoster: () => void;
  onOpenJalRakshak: (tab?: string) => void;
}

export function AtlasNavbar({
  currentYear,
  selectedDistrictId,
  onSelectDistrict,
  onSelectYear,
  viewMode,
  onToggleViewMode,
  theme,
  onToggleTheme,
  onOpenTrumpCards,
  onOpenStatCards,
  onOpenPoster,
  onOpenJalRakshak,
}: AtlasNavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const filteredDistricts = searchQuery.trim()
    ? UP_75_WATER_DISTRICTS.filter((d) =>
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.division.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.modernWaterMetrics.majorRiverBasin.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 8)
    : [];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-atlas-border bg-atlas-canvas/90 backdrop-blur-md px-3 sm:px-4 py-2 flex items-center justify-between gap-4 select-none">
      {/* Brand & Subtitle */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 shadow-glow text-white font-bold text-lg">
          💧
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-serif font-black tracking-wide text-atlas-text">
              JalRakshak AI
            </h1>
            <span className="text-[10px] font-sans px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/30">
              UP 75 Districts • B.Tech CSE (DS+AI)
            </span>
          </div>
          <p className="text-[11px] text-atlas-muted hidden sm:block">
            Intelligent Groundwater & Water Resource Decision-Support System
          </p>
        </div>
      </div>

      {/* Autocomplete Search Bar */}
      <div className="relative flex-1 max-w-md hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-atlas-muted" />
          <input
            type="text"
            placeholder="Search district (e.g. Agra, Ghaziabad, Meerut, Jhansi)..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsOpenDropdown(true);
            }}
            onFocus={() => setIsOpenDropdown(true)}
            className="w-full pl-9 pr-4 py-1.5 rounded-lg bg-atlas-card border border-atlas-border text-xs text-atlas-text placeholder:text-atlas-faint focus:outline-none focus:ring-1 focus:ring-emerald-400"
          />
        </div>

        {isOpenDropdown && filteredDistricts.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-atlas-card border border-atlas-border rounded-lg shadow-cardDark overflow-hidden z-50">
            {filteredDistricts.map((d) => (
              <button
                key={d.id}
                onClick={() => {
                  onSelectDistrict(d.id);
                  setSearchQuery("");
                  setIsOpenDropdown(false);
                }}
                className="w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-atlas-elevated text-atlas-text border-b border-atlas-border/50 last:border-0"
              >
                <div>
                  <span className="font-semibold text-emerald-400">{d.name}</span>
                  <span className="text-atlas-muted ml-2 text-[11px]">
                    ({d.division} Division)
                  </span>
                </div>
                <span className="text-[10px] font-mono text-saffron">
                  Stress: {d.modernWaterMetrics.waterStressScore}/100
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right Controls & Quick Actions */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Mode Toggle: Water Stress Heatmap vs Recharge Suitability */}
        <div className="flex items-center p-0.5 rounded-lg bg-atlas-card border border-atlas-border text-xs">
          <button
            onClick={() => onToggleViewMode("water")}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
              viewMode === "water"
                ? "bg-rose-600 text-white shadow font-semibold"
                : "text-atlas-muted hover:text-atlas-text"
            }`}
          >
            💧 Stress Heatmap
          </button>
          <button
            onClick={() => onToggleViewMode("recharge")}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
              viewMode === "recharge"
                ? "bg-emerald-600 text-white shadow font-semibold"
                : "text-atlas-muted hover:text-atlas-text"
            }`}
          >
            🏗️ Recharge Suitability
          </button>
        </div>

        {/* JalRakshak Suite Action Button */}
        <button
          onClick={() => onOpenJalRakshak("recharge")}
          title="Open Complete JalRakshak AI Decision-Support Suite"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-glow transition"
        >
          <Shield className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Decision Suite</span>
        </button>

        {/* AI Copilot Quick Launcher */}
        <button
          onClick={() => onOpenJalRakshak("copilot")}
          title="Ask JalRakshak AI Copilot"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-atlas-card hover:bg-atlas-elevated border border-atlas-border text-xs font-semibold text-atlas-text transition"
        >
          <Bot className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" />
          <span className="hidden xl:inline">AI Copilot</span>
        </button>

        {/* 75-District Matrix Quick Launcher */}
        <button
          onClick={() => onOpenJalRakshak("matrix")}
          title="Open 75-District Hydrological Matrix & CSV Export"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-atlas-card hover:bg-atlas-elevated border border-atlas-border text-xs font-semibold text-atlas-text transition"
        >
          <Table className="h-3.5 w-3.5 text-sky-500 dark:text-sky-400" />
          <span className="hidden xl:inline">75-District Matrix</span>
        </button>

        {/* Citizen Grievance Quick Launcher */}
        <button
          onClick={() => onOpenJalRakshak("grievance")}
          title="Citizen Water Grievance & Borewell Failure Portal"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-atlas-card hover:bg-atlas-elevated border border-atlas-border text-xs font-semibold text-atlas-text transition"
        >
          <ShieldAlert className="h-3.5 w-3.5 text-rose-500 dark:text-rose-400" />
          <span className="hidden xl:inline">Grievances</span>
        </button>

        {/* Feature Action Buttons */}
        <button
          onClick={onOpenTrumpCards}
          title="Compare 2 Districts on Water Metrics"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-atlas-card hover:bg-atlas-elevated border border-atlas-border text-xs font-medium text-atlas-text transition"
        >
          <Trophy className="h-3.5 w-3.5 text-amber-500 dark:text-amber-400" />
          <span className="hidden 2xl:inline">Duel</span>
        </button>

        <button
          onClick={onOpenStatCards}
          title="30-50 Auto-Computed Groundwater Facts"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-atlas-card hover:bg-atlas-elevated border border-atlas-border text-xs font-medium text-atlas-text transition"
        >
          <Sparkles className="h-3.5 w-3.5 text-sky-500 dark:text-sky-400" />
          <span className="hidden 2xl:inline">Facts</span>
        </button>

        <button
          onClick={onOpenPoster}
          title="Export Water Resource Dossier Poster (PNG)"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-saffron/15 hover:bg-saffron/25 border border-saffron/40 text-xs font-medium text-saffron transition"
        >
          <Share2 className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Export</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          className="p-1.5 rounded-lg bg-atlas-card hover:bg-atlas-elevated border border-atlas-border text-atlas-muted hover:text-atlas-text transition"
        >
          {theme === "dark" ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-700" />}
        </button>
      </div>
    </header>
  );
}
