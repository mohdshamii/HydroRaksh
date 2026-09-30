"use client";

import React, { useRef, useEffect, useState } from "react";
import { UP_75_WATER_DISTRICTS, DistrictWaterEntity } from "@/data/up-75-districts";
import { X, Download, Share2, Check } from "lucide-react";

interface SharePosterModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentYear: number;
  selectedDistrict: DistrictWaterEntity;
  viewMode: "water" | "recharge";
}

export function SharePosterModal({
  isOpen,
  onClose,
  currentYear,
  selectedDistrict,
  viewMode,
}: SharePosterModalProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 1200;
    canvas.height = 900;

    // Dark Navy Background
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Decorative Borders
    ctx.strokeStyle = "#334155";
    ctx.lineWidth = 4;
    ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

    ctx.strokeStyle = "#10b981";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

    // Title
    ctx.fillStyle = "#10b981";
    ctx.font = "bold 34px 'Playfair Display', Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText("JalRakshak AI — Groundwater Intelligence & Resource Atlas", canvas.width / 2, 90);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "16px -apple-system, sans-serif";
    ctx.fillText("All 75 Districts of Uttar Pradesh • B.Tech CSE (DS+AI) Major Project", canvas.width / 2, 122);

    // Planning Horizon Stamp
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 44px 'Playfair Display', Georgia, serif";
    ctx.fillText(`${currentYear} Planning Horizon`, canvas.width / 2, 180);

    // Map Projection
    ctx.save();
    ctx.translate(140, 160);
    const scale = 0.95;
    ctx.scale(scale, scale);

    UP_75_WATER_DISTRICTS.forEach((d) => {
      const isSel = d.id === selectedDistrict.id;
      const path = new Path2D(d.svgPath);
      ctx.fillStyle = isSel
        ? "#f59e0b"
        : viewMode === "water"
        ? d.modernWaterMetrics.waterStressScore > 65
          ? "#ef4444"
          : d.modernWaterMetrics.waterStressScore > 45
          ? "#f97316"
          : "#10b981"
        : d.rechargeSuitabilityScore > 80
        ? "#06b6d4"
        : "#3b82f6";
      ctx.fill(path);
      ctx.strokeStyle = isSel ? "#ffffff" : "rgba(255,255,255,0.2)";
      ctx.lineWidth = isSel ? 3 : 1;
      ctx.stroke(path);

      ctx.fillStyle = isSel ? "#0f172a" : "#cbd5e1";
      ctx.font = isSel ? "bold 11px sans-serif" : "9px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(d.name, d.projected[0], d.projected[1]);
    });
    ctx.restore();

    // Bottom Selected District Dossier Banner
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(60, canvas.height - 130, canvas.width - 120, 75);
    ctx.strokeStyle = "#334155";
    ctx.strokeRect(60, canvas.height - 130, canvas.width - 120, 75);

    ctx.textAlign = "left";
    ctx.fillStyle = "#10b981";
    ctx.font = "bold 20px 'Playfair Display', Georgia, serif";
    ctx.fillText(
      `District Focus: ${selectedDistrict.name} (${selectedDistrict.division} Division)`,
      85,
      canvas.height - 95
    );

    ctx.fillStyle = "#94a3b8";
    ctx.font = "14px sans-serif";
    ctx.fillText(
      `Water Table: ${selectedDistrict.modernWaterMetrics.groundwaterDepthM}m bgl | CGWB: ${selectedDistrict.modernWaterMetrics.cgwbCategory} (${selectedDistrict.modernWaterMetrics.cgwbStageExtractionPct}%) | Suitability: ${selectedDistrict.rechargeSuitabilityScore}/100`,
      85,
      canvas.height - 70
    );

    // Watermark
    ctx.textAlign = "right";
    ctx.fillStyle = "#64748b";
    ctx.font = "12px monospace";
    ctx.fillText(
      "💧 JalRakshak AI • Detect • Predict • Locate • Recommend • Optimize • Monitor",
      canvas.width - 85,
      canvas.height - 75
    );
  }, [isOpen, currentYear, selectedDistrict, viewMode]);

  if (!isOpen) return null;

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = `jalrakshak-dossier-${selectedDistrict.id}-${currentYear}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in select-none">
      <div className="relative w-full max-w-4xl bg-atlas-card border border-atlas-border rounded-2xl shadow-2xl flex flex-col overflow-hidden text-atlas-text">
        <div className="p-4 sm:p-5 border-b border-atlas-border flex items-center justify-between bg-atlas-elevated/40">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-black tracking-wide text-atlas-text">
                Shareable Water Resource Dossier Poster
              </h2>
              <p className="text-xs text-atlas-muted">
                High-resolution cartographic snapshot with district hydrological metrics & project watermark
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

        <div className="p-4 sm:p-6 flex items-center justify-center bg-atlas-canvas">
          <canvas
            ref={canvasRef}
            className="w-full max-h-[55vh] object-contain rounded-xl border border-atlas-border shadow-2xl"
          />
        </div>

        <div className="p-4 sm:p-5 border-t border-atlas-border bg-atlas-elevated/40 flex items-center justify-between gap-4">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-atlas-card hover:bg-atlas-elevated border border-atlas-border text-xs font-semibold text-atlas-text transition"
          >
            {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            {isCopied ? "Link Copied!" : "Copy Shareable URL"}
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-glow transition"
          >
            <Download className="w-4 h-4" />
            Download Poster (PNG)
          </button>
        </div>
      </div>
    </div>
  );
}
