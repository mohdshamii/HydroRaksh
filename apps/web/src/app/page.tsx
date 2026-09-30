"use client";

import React, { useState, useEffect, Suspense } from "react";
import { UP_75_WATER_DISTRICTS, DistrictWaterEntity } from "@/data/up-75-districts";
import { AtlasNavbar } from "@/components/atlas/AtlasNavbar";
import { TimeSliderDock } from "@/components/atlas/TimeSliderDock";
import { AtlasMap } from "@/components/atlas/AtlasMap";
import { ContextPanel } from "@/components/atlas/ContextPanel";
import { LayerFilterPanel } from "@/components/atlas/LayerFilterPanel";
import { StatCardsGrid } from "@/components/atlas/StatCardsGrid";
import { TrumpCardModal } from "@/components/atlas/TrumpCardModal";
import { SharePosterModal } from "@/components/atlas/SharePosterModal";
import { ReportErrorModal } from "@/components/atlas/ReportErrorModal";
import { JalRakshakSuiteModal } from "@/components/jalrakshak/JalRakshakSuiteModal";
import { ChevronUp } from "lucide-react";

function JalRakshakApp() {
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>("agra");
  const [viewMode, setViewMode] = useState<"water" | "recharge">("water");
  const [showRivers, setShowRivers] = useState<boolean>(true);
  const [showHotspots, setShowHotspots] = useState<boolean>(true);
  const [showIoTSensors, setShowIoTSensors] = useState<boolean>(true);
  const [isColorBlindMode, setIsColorBlindMode] = useState<boolean>(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Modal dialog states
  const [isTrumpCardsOpen, setIsTrumpCardsOpen] = useState(false);
  const [isStatCardsOpen, setIsStatCardsOpen] = useState(false);
  const [isPosterOpen, setIsPosterOpen] = useState(false);
  const [isReportErrorOpen, setIsReportErrorOpen] = useState(false);
  const [isMobileDossierOpen, setIsMobileDossierOpen] = useState(false);
  const [isJalRakshakOpen, setIsJalRakshakOpen] = useState(false);
  const [jalRakshakTab, setJalRakshakTab] = useState<string>("recharge");

  const handleOpenJalRakshak = (tab?: string) => {
    if (tab) setJalRakshakTab(tab);
    setIsJalRakshakOpen(true);
  };

  // Initialize from URL search parameters on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const yearParam = params.get("year");
      const regionParam = params.get("region");
      const modeParam = params.get("mode");

      if (yearParam && !isNaN(Number(yearParam))) {
        setCurrentYear(Number(yearParam));
      }
      if (regionParam && UP_75_WATER_DISTRICTS.some((d) => d.id === regionParam)) {
        setSelectedDistrictId(regionParam);
      }
      if (modeParam === "water" || modeParam === "recharge") {
        setViewMode(modeParam);
      }
    }
  }, []);

  // Sync state to URL search parameters
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams();
      params.set("year", currentYear.toString());
      params.set("region", selectedDistrictId);
      params.set("mode", viewMode);
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState(null, "", newUrl);
    }
  }, [currentYear, selectedDistrictId, viewMode]);

  // Sync Theme class to <html>
  useEffect(() => {
    if (typeof document !== "undefined") {
      if (theme === "light") {
        document.documentElement.classList.add("light");
      } else {
        document.documentElement.classList.remove("light");
      }
    }
  }, [theme]);

  const selectedDistrict =
    UP_75_WATER_DISTRICTS.find((d) => d.id === selectedDistrictId) ||
    UP_75_WATER_DISTRICTS[0];

  return (
    <div className="min-h-screen flex flex-col bg-atlas-canvas text-atlas-text overflow-hidden">
      {/* Top JalRakshak Navigation Bar */}
      <AtlasNavbar
        currentYear={currentYear}
        selectedDistrictId={selectedDistrictId}
        onSelectDistrict={(id) => {
          setSelectedDistrictId(id);
          setIsMobileDossierOpen(true);
        }}
        onSelectYear={(yr) => setCurrentYear(yr)}
        viewMode={viewMode}
        onToggleViewMode={(m) => setViewMode(m)}
        theme={theme}
        onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
        onOpenTrumpCards={() => setIsTrumpCardsOpen(true)}
        onOpenStatCards={() => setIsStatCardsOpen(true)}
        onOpenPoster={() => setIsPosterOpen(true)}
        onOpenJalRakshak={handleOpenJalRakshak}
      />

      {/* Main 3-Column Workspace */}
      <main className="flex-1 flex overflow-hidden relative pb-28">
        {/* Left Filters & Planning Horizons Sidebar (Desktop) */}
        <LayerFilterPanel
          currentYear={currentYear}
          onSelectYear={(yr) => setCurrentYear(yr)}
          showRivers={showRivers}
          onToggleRivers={() => setShowRivers(!showRivers)}
          showHotspots={showHotspots}
          onToggleHotspots={() => setShowHotspots(!showHotspots)}
          showIoTSensors={showIoTSensors}
          onToggleIoTSensors={() => setShowIoTSensors(!showIoTSensors)}
          isColorBlindMode={isColorBlindMode}
          onToggleColorBlind={() => setIsColorBlindMode(!isColorBlindMode)}
          viewMode={viewMode}
        />

        {/* Center Interactive Map Canvas */}
        <section className="flex-1 relative flex flex-col overflow-hidden">
          <AtlasMap
            currentYear={currentYear}
            selectedDistrictId={selectedDistrictId}
            onSelectDistrict={(id) => {
              setSelectedDistrictId(id);
              setIsMobileDossierOpen(true);
            }}
            viewMode={viewMode}
            showRivers={showRivers}
            showHotspots={showHotspots}
            showIoTSensors={showIoTSensors}
            isColorBlindMode={isColorBlindMode}
          />
        </section>

        {/* Right District Water Dossier & Context Panel (Desktop) */}
        <div className="hidden lg:block h-full">
          <ContextPanel
            district={selectedDistrict}
            currentYear={currentYear}
            onOpenTrumpCards={() => setIsTrumpCardsOpen(true)}
            onOpenReportError={() => setIsReportErrorOpen(true)}
            onOpenJalRakshak={handleOpenJalRakshak}
          />
        </div>

        {/* Mobile Dossier Drawer Trigger */}
        <div className="lg:hidden fixed bottom-28 right-4 z-30">
          <button
            onClick={() => setIsMobileDossierOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-glow"
          >
            <span>{selectedDistrict.name} Water Dossier</span>
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Bottom Sheet Modal */}
        {isMobileDossierOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/70 backdrop-blur-sm animate-fade-in">
            <div className="h-[75vh] w-full bg-atlas-card rounded-t-2xl overflow-hidden flex flex-col border-t border-atlas-border">
              <ContextPanel
                district={selectedDistrict}
                currentYear={currentYear}
                onClose={() => setIsMobileDossierOpen(false)}
                onOpenTrumpCards={() => {
                  setIsMobileDossierOpen(false);
                  setIsTrumpCardsOpen(true);
                }}
                onOpenReportError={() => {
                  setIsMobileDossierOpen(false);
                  setIsReportErrorOpen(true);
                }}
                onOpenJalRakshak={(tab) => {
                  setIsMobileDossierOpen(false);
                  handleOpenJalRakshak(tab);
                }}
              />
            </div>
          </div>
        )}
      </main>

      {/* Docked Continuous Time Slider Bar (2000 to 2035) */}
      <TimeSliderDock
        currentYear={currentYear}
        onYearChange={(yr) => setCurrentYear(yr)}
      />

      {/* Modals & Discovery Overlays */}
      <TrumpCardModal
        isOpen={isTrumpCardsOpen}
        onClose={() => setIsTrumpCardsOpen(false)}
        initialDistrictId={selectedDistrictId}
      />

      <StatCardsGrid
        isOpen={isStatCardsOpen}
        onClose={() => setIsStatCardsOpen(false)}
        onSelectState={(districtId, year) => {
          setSelectedDistrictId(districtId);
          setCurrentYear(year);
        }}
      />

      <SharePosterModal
        isOpen={isPosterOpen}
        onClose={() => setIsPosterOpen(false)}
        currentYear={currentYear}
        selectedDistrict={selectedDistrict}
        viewMode={viewMode}
      />

      <ReportErrorModal
        isOpen={isReportErrorOpen}
        onClose={() => setIsReportErrorOpen(false)}
        district={selectedDistrict}
        currentYear={currentYear}
      />

      <JalRakshakSuiteModal
        isOpen={isJalRakshakOpen}
        onClose={() => setIsJalRakshakOpen(false)}
        initialDistrictId={selectedDistrictId}
        initialTab={jalRakshakTab}
      />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">Loading JalRakshak AI Decision Platform...</div>}>
      <JalRakshakApp />
    </Suspense>
  );
}
