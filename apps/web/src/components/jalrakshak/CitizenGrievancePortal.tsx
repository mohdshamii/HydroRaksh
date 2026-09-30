"use client";

import React, { useState } from "react";
import { DistrictWaterEntity, UP_75_WATER_DISTRICTS } from "@/data/up-75-districts";
import { AlertCircle, CheckCircle2, Clock, Send, ShieldAlert, Filter, MapPin, Phone, User } from "lucide-react";

interface CitizenGrievancePortalProps {
  initialDistrictId?: string;
}

interface GrievanceTicket {
  id: string;
  districtName: string;
  category: string;
  location: string;
  severity: "Emergency" | "High" | "Normal";
  date: string;
  status: "Logged" | "Field Dispatched" | "Under Repair" | "Resolved";
  assignedDept: string;
  description: string;
}

export function CitizenGrievancePortal({ initialDistrictId }: CitizenGrievancePortalProps) {
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>(initialDistrictId || "agra");
  const [category, setCategory] = useState<string>("dry_borewell");
  const [locationName, setLocationName] = useState<string>("");
  const [severity, setSeverity] = useState<"Emergency" | "High" | "Normal">("High");
  const [description, setDescription] = useState<string>("");
  const [citizenName, setCitizenName] = useState<string>("");
  const [citizenPhone, setCitizenPhone] = useState<string>("");
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  // Initial mock grievances list
  const [tickets, setTickets] = useState<GrievanceTicket[]>([
    {
      id: "JAL-UP-8491",
      districtName: "Agra",
      category: "Dry Borewell Failure",
      location: "Fatehabad Road, Village Dauki",
      severity: "Emergency",
      date: "2026-09-30 09:15 AM",
      status: "Field Dispatched",
      assignedDept: "UP Jal Nigam (Rural Division)",
      description: "Community submersible well dried out after water table fell below 38m bgl. 240 households without drinking supply.",
    },
    {
      id: "JAL-UP-8488",
      districtName: "Ghaziabad",
      category: "Illegal Tanker Mafia Extraction",
      location: "Sahibabad Industrial Area Site 4",
      severity: "High",
      date: "2026-09-29 04:30 PM",
      status: "Under Repair",
      assignedDept: "District Groundwater Cell & DM Taskforce",
      description: "Unregulated commercial borewell pumping 50,000L/day into unauthorized tankers without CGWB NOC.",
    },
    {
      id: "JAL-UP-8482",
      districtName: "Jhansi",
      category: "Damaged Check Dam Siltation",
      location: "Babina Block, Stream Bund",
      severity: "Normal",
      date: "2026-09-28 11:20 AM",
      status: "Logged",
      assignedDept: "Minor Irrigation Department UP",
      description: "Monsoon debris and heavy silt blocked masonry weir overflow gates.",
    },
    {
      id: "JAL-UP-8475",
      districtName: "Meerut",
      category: "Pipeline Burst Street Gush",
      location: "Delhi Road, Near Transport Nagar",
      severity: "Emergency",
      date: "2026-09-27 08:45 AM",
      status: "Resolved",
      assignedDept: "Meerut Jal Sansthan",
      description: "Main 400mm CI feeder pipe ruptured. Repaired with sleeve clamp and supply restored.",
    },
  ]);

  const [statusFilter, setStatusFilter] = useState<string>("All");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentDistrict =
      UP_75_WATER_DISTRICTS.find((d) => d.id === selectedDistrictId) || UP_75_WATER_DISTRICTS[0];

    const newTicket: GrievanceTicket = {
      id: `JAL-UP-${Math.floor(1000 + Math.random() * 9000)}`,
      districtName: currentDistrict.name,
      category:
        category === "dry_borewell"
          ? "Dry Borewell Failure"
          : category === "contamination"
          ? "Contaminated Tap Water"
          : category === "leakage"
          ? "Pipeline Burst Street Gush"
          : category === "tanker"
          ? "Illegal Tanker Mafia Extraction"
          : "Broken Community Handpump",
      location: locationName || "Local Ward",
      severity: severity,
      date: "Just Now",
      status: "Logged",
      assignedDept: "District Water Monitoring Cell & Jal Sansthan",
      description: description,
    };

    setTickets([newTicket, ...tickets]);
    setSubmittedMessage(`Grievance registered successfully with Ticket ID #${newTicket.id}!`);
    setDescription("");
    setLocationName("");
    setTimeout(() => setSubmittedMessage(null), 4000);
  };

  const filteredTickets =
    statusFilter === "All"
      ? tickets
      : tickets.filter((t) => t.status === statusFilter);

  return (
    <div className="space-y-6 text-atlas-text">
      {/* Header */}
      <div className="p-4 sm:p-5 rounded-2xl bg-atlas-elevated/40 border border-atlas-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
            <h3 className="text-base font-serif font-bold text-atlas-text">
              Citizen Water Grievance & Borewell Failure Portal
            </h3>
          </div>
          <p className="text-xs text-atlas-muted mt-1">
            Real-time public incident reporting: dry borewells, contamination, bursts & illegal extraction across UP
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-600 dark:text-emerald-400">
            {tickets.length} Active Tickets
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Report Form */}
        <div className="lg:col-span-5 p-4 sm:p-5 rounded-2xl bg-atlas-elevated/20 border border-atlas-border space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-atlas-muted flex items-center gap-1.5">
            <Send className="w-3.5 h-3.5 text-emerald-500" />
            Log New Water Grievance / Emergency
          </h4>

          {submittedMessage && (
            <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{submittedMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block text-atlas-muted mb-1 font-medium">District</label>
              <select
                value={selectedDistrictId}
                onChange={(e) => setSelectedDistrictId(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-atlas-card border border-atlas-border text-atlas-text font-serif font-bold focus:outline-none focus:ring-1 focus:ring-emerald-400"
              >
                {UP_75_WATER_DISTRICTS.map((d) => (
                  <option key={d.id} value={d.id} className="bg-atlas-card text-atlas-text">
                    {d.name} ({d.division})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-atlas-muted mb-1 font-medium">Incident Type</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2 rounded-lg bg-atlas-card border border-atlas-border text-atlas-text focus:outline-none focus:ring-1 focus:ring-emerald-400"
                >
                  <option value="dry_borewell">Dry Borewell / Drop</option>
                  <option value="contamination">Water Contamination</option>
                  <option value="leakage">Pipeline Burst / Leak</option>
                  <option value="tanker">Illegal Water Tanker</option>
                  <option value="handpump">Broken Handpump</option>
                </select>
              </div>

              <div>
                <label className="block text-atlas-muted mb-1 font-medium">Severity</label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value as any)}
                  className="w-full p-2 rounded-lg bg-atlas-card border border-atlas-border text-atlas-text focus:outline-none focus:ring-1 focus:ring-emerald-400 font-semibold"
                >
                  <option value="Emergency">🚨 Emergency (No Supply)</option>
                  <option value="High">⚠️ High Priority</option>
                  <option value="Normal">ℹ️ Normal Maintenance</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-atlas-muted mb-1 font-medium">Specific Location / Ward / Village</label>
              <div className="relative">
                <MapPin className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-atlas-muted" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Village Khandauli, Ward 14, Main Tubewell"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 rounded-lg bg-atlas-card border border-atlas-border text-atlas-text placeholder:text-atlas-faint focus:outline-none focus:ring-1 focus:ring-emerald-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-atlas-muted mb-1 font-medium">Description of Issue</label>
              <textarea
                required
                rows={2}
                placeholder="Describe groundwater depth change, smell, leak duration, affected families..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-atlas-card border border-atlas-border text-atlas-text placeholder:text-atlas-faint focus:outline-none focus:ring-1 focus:ring-emerald-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-atlas-muted mb-1 font-medium">Citizen Name</label>
                <input
                  type="text"
                  placeholder="Optional"
                  value={citizenName}
                  onChange={(e) => setCitizenName(e.target.value)}
                  className="w-full p-2 rounded-lg bg-atlas-card border border-atlas-border text-atlas-text placeholder:text-atlas-faint"
                />
              </div>
              <div>
                <label className="block text-atlas-muted mb-1 font-medium">Mobile (for SMS updates)</label>
                <input
                  type="tel"
                  placeholder="+91"
                  value={citizenPhone}
                  onChange={(e) => setCitizenPhone(e.target.value)}
                  className="w-full p-2 rounded-lg bg-atlas-card border border-atlas-border text-atlas-text placeholder:text-atlas-faint"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-glow flex items-center justify-center gap-1.5 transition mt-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit & Dispatch Grievance</span>
            </button>
          </form>
        </div>

        {/* Live Tracking Board */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-atlas-muted flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              Live Grievance Dispatch Board
            </h4>

            {/* Status Filter */}
            <div className="flex items-center gap-1 bg-atlas-card border border-atlas-border p-0.5 rounded-lg text-[11px]">
              {["All", "Logged", "Field Dispatched", "Resolved"].map((f) => (
                <button
                  key={f}
                  onClick={() => setStatusFilter(f)}
                  className={`px-2 py-0.5 rounded-md transition ${
                    statusFilter === f
                      ? "bg-emerald-600 text-white font-bold"
                      : "text-atlas-muted hover:text-atlas-text"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {filteredTickets.map((t) => (
              <div
                key={t.id}
                className="p-3.5 rounded-xl bg-atlas-elevated/30 border border-atlas-border hover:border-emerald-500/40 transition space-y-2 text-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-saffron text-[11px]">{t.id}</span>
                      <h5 className="font-bold text-atlas-text">{t.category}</h5>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                          t.severity === "Emergency"
                            ? "bg-rose-500/20 text-rose-500 dark:text-rose-400"
                            : t.severity === "High"
                            ? "bg-amber-500/20 text-amber-500 dark:text-amber-400"
                            : "bg-sky-500/20 text-sky-500 dark:text-sky-400"
                        }`}
                      >
                        {t.severity}
                      </span>
                    </div>
                    <div className="text-[11px] text-atlas-muted flex items-center gap-2 mt-0.5">
                      <span>{t.districtName}</span>
                      <span>•</span>
                      <span className="text-atlas-text font-medium">{t.location}</span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      t.status === "Resolved"
                        ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                        : t.status === "Field Dispatched"
                        ? "bg-blue-500/20 text-blue-500 dark:text-blue-400 border-blue-500/30"
                        : t.status === "Under Repair"
                        ? "bg-purple-500/20 text-purple-500 dark:text-purple-400 border-purple-500/30"
                        : "bg-amber-500/20 text-amber-500 dark:text-amber-400 border-amber-500/30"
                    }`}
                  >
                    {t.status}
                  </span>
                </div>

                <p className="text-[11px] text-atlas-muted leading-relaxed">{t.description}</p>

                <div className="pt-2 border-t border-atlas-border/50 flex items-center justify-between text-[10px] text-atlas-faint">
                  <span>Assigned: {t.assignedDept}</span>
                  <span>{t.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
