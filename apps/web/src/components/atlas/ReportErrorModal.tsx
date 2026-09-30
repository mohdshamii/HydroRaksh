"use client";

import React, { useState } from "react";
import { DistrictWaterEntity } from "@/data/up-75-districts";
import { X, Send, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";

interface ReportErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  district: DistrictWaterEntity;
  currentYear: number;
}

export function ReportErrorModal({
  isOpen,
  onClose,
  district,
  currentYear,
}: ReportErrorModalProps) {
  const [issueType, setIssueType] = useState<string>("depth_discrepancy");
  const [sourceCitation, setSourceCitation] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in select-none">
      <div className="relative w-full max-w-lg bg-atlas-card border border-atlas-border rounded-2xl shadow-2xl overflow-hidden text-atlas-text">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-atlas-border flex items-center justify-between bg-atlas-elevated/40">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-saffron border border-saffron/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-serif font-bold text-atlas-text">
                Report Field Water Discrepancy
              </h2>
              <p className="text-xs text-atlas-muted">
                {district.name} ({district.division} Division) • {currentYear} Horizon
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-atlas-muted hover:text-atlas-text hover:bg-atlas-elevated transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
            <h3 className="text-base font-serif font-bold text-atlas-text">
              Observation Logged Successfully!
            </h3>
            <p className="text-xs text-atlas-muted max-w-sm mx-auto">
              Your field telemetry will be cross-referenced with Central Ground Water Board (CGWB) station logs and state water records for model calibration.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 text-xs">
            <div>
              <label className="block text-atlas-muted font-medium mb-1">
                Discrepancy Category
              </label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-atlas-elevated/60 border border-atlas-border text-atlas-text focus:outline-none focus:ring-1 focus:ring-emerald-400"
              >
                <option value="depth_discrepancy" className="bg-atlas-card text-atlas-text">
                  Water Table Depth / Piezometer Discrepancy
                </option>
                <option value="dry_well" className="bg-atlas-card text-atlas-text">
                  Community Borewell Dry-Out / Pump Failure
                </option>
                <option value="contamination" className="bg-atlas-card text-atlas-text">
                  Drinking Water Contamination (Arsenic/Fluoride/TDS)
                </option>
                <option value="structure_silted" className="bg-atlas-card text-atlas-text">
                  Recharge Structure / Amrit Sarovar Damaged or Silted
                </option>
                <option value="overdraft" className="bg-atlas-card text-atlas-text">
                  Unregulated Commercial / Industrial Groundwater Extraction
                </option>
              </select>
            </div>

            <div>
              <label className="block text-atlas-muted font-medium mb-1">
                Field Observation Details
              </label>
              <textarea
                required
                rows={3}
                placeholder="e.g. Village tubewell depth recorded at 34m bgl in June 2026, differing by 6m from baseline CGWB station..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-atlas-elevated/60 border border-atlas-border text-atlas-text placeholder:text-atlas-faint focus:outline-none focus:ring-1 focus:ring-emerald-400"
              />
            </div>

            <div>
              <label className="block text-atlas-muted font-medium mb-1">
                Authoritative Reference / Official Source
              </label>
              <input
                required
                type="text"
                placeholder="e.g. UP Ground Water Dept Report, Jal Jeevan Mission Gram Samiti, or CGWB Bulletin"
                value={sourceCitation}
                onChange={(e) => setSourceCitation(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-atlas-elevated/60 border border-atlas-border text-atlas-text placeholder:text-atlas-faint focus:outline-none focus:ring-1 focus:ring-emerald-400"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-atlas-card hover:bg-atlas-elevated border border-atlas-border text-atlas-muted hover:text-atlas-text transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition shadow-glow"
              >
                <Send className="w-3.5 h-3.5" />
                Submit Verification Log
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
