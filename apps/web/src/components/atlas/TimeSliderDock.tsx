"use client";

import React, { useEffect, useState, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward, Clock, Calendar } from "lucide-react";
import { PLANNING_HORIZONS } from "@/data/up-75-districts";

interface TimeSliderDockProps {
  currentYear: number;
  onYearChange: (updater: number | ((prev: number) => number)) => void;
}

export function TimeSliderDock({ currentYear, onYearChange }: TimeSliderDockProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const playIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      const intervalMs = Math.max(80, Math.floor(400 / playbackSpeed));
      playIntervalRef.current = setInterval(() => {
        onYearChange((prev) => {
          if (prev >= 2035) {
            setIsPlaying(false);
            return 2035;
          }
          return prev + 1;
        });
      }, intervalMs);
    } else if (playIntervalRef.current) {
      clearInterval(playIntervalRef.current);
    }

    return () => {
      if (playIntervalRef.current) clearInterval(playIntervalRef.current);
    };
  }, [isPlaying, playbackSpeed, onYearChange]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) return;

      if (e.code === "Space") {
        e.preventDefault();
        setIsPlaying((p) => !p);
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        onYearChange((prev) => Math.max(2000, prev - (e.shiftKey ? 5 : 1)));
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        onYearChange((prev) => Math.min(2035, prev + (e.shiftKey ? 5 : 1)));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onYearChange]);

  const activeHorizon =
    PLANNING_HORIZONS.slice().reverse().find((h) => currentYear >= h.year) ||
    PLANNING_HORIZONS[0];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-atlas-canvas/95 backdrop-blur-lg border-t border-atlas-border px-3 sm:px-6 py-2.5 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col gap-2">
        {/* Top Control Bar: Year Display, Horizon Description, Playback Controls */}
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-baseline gap-1.5 bg-atlas-card border border-atlas-border px-3 py-1 rounded-xl shadow-sm">
              <span className="text-xl sm:text-2xl font-serif font-black tracking-tight text-saffron tabular-nums">
                {currentYear}
              </span>
              <span className="text-[10px] uppercase font-bold text-atlas-muted">
                {currentYear < 2026
                  ? "Historical"
                  : currentYear === 2026
                  ? "Live Present"
                  : "AI Forecast"}
              </span>
            </div>
            <div className="hidden md:block">
              <div className="text-xs font-semibold text-atlas-text flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                {activeHorizon.label}
              </div>
              <p className="text-[11px] text-atlas-muted line-clamp-1 max-w-lg">
                {activeHorizon.desc}
              </p>
            </div>
          </div>

          {/* Player controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => onYearChange((prev) => Math.max(2000, prev - 1))}
              title="Back 1 Year (ArrowLeft)"
              className="p-1.5 sm:p-2 rounded-lg bg-atlas-card hover:bg-atlas-elevated border border-atlas-border text-atlas-muted hover:text-atlas-text transition"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsPlaying((p) => !p)}
              title={isPlaying ? "Pause (Space)" : "Play Timeline (Space)"}
              className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-saffron hover:bg-saffron-hover text-slate-900 font-bold flex items-center gap-1.5 shadow-glow transition"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              <span className="text-xs font-semibold">{isPlaying ? "Pause" : "Play"}</span>
            </button>

            <button
              onClick={() => onYearChange((prev) => Math.min(2035, prev + 1))}
              title="Forward 1 Year (ArrowRight)"
              className="p-1.5 sm:p-2 rounded-lg bg-atlas-card hover:bg-atlas-elevated border border-atlas-border text-atlas-muted hover:text-atlas-text transition"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            {/* Speed Multiplier */}
            <div className="flex items-center bg-atlas-card border border-atlas-border rounded-lg p-0.5 ml-1 sm:ml-2">
              {[0.5, 1, 2, 5].map((s) => (
                <button
                  key={s}
                  onClick={() => setPlaybackSpeed(s)}
                  className={`px-1.5 py-0.5 text-[10px] font-mono rounded ${
                    playbackSpeed === s
                      ? "bg-saffron text-slate-900 font-bold"
                      : "text-atlas-muted hover:text-atlas-text"
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Continuous Year Range Slider (2000 to 2035) */}
        <div className="relative w-full flex items-center">
          <input
            type="range"
            min={2000}
            max={2035}
            step={1}
            value={currentYear}
            onChange={(e) => onYearChange(Number(e.target.value))}
            className="time-slider w-full cursor-pointer z-10"
          />
        </div>

        {/* Planning Horizons Bar */}
        <div className="flex items-center justify-between overflow-x-auto no-scrollbar gap-1 pt-0.5">
          {PLANNING_HORIZONS.map((horizon) => {
            const isSelected = currentYear === horizon.year;
            return (
              <button
                key={horizon.id}
                onClick={() => onYearChange(horizon.year)}
                className={`whitespace-nowrap px-2.5 py-0.5 rounded text-[10px] font-medium transition-all ${
                  isSelected
                    ? "bg-emerald-600 text-white font-bold shadow-sm"
                    : "text-atlas-faint hover:text-atlas-muted hover:bg-atlas-elevated"
                }`}
              >
                {horizon.year} {horizon.year === 2026 ? "● Live" : ""}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
