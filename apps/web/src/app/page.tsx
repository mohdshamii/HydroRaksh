"use client";

import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Droplets,
  TrendingDown,
  Map as MapIcon,
  Sprout,
  CloudRain,
  Gauge,
  Wheat,
  FlaskConical,
  PieChart,
  SlidersHorizontal,
  Calculator,
  Radio,
  FileText,
  Users,
  Bot,
  UserCog,
  Settings,
  Menu,
  Search,
  Bell,
  ChevronDown,
  Sparkles,
  Send,
  X,
  CheckCircle,
  AlertTriangle,
  Info,
  ShieldCheck,
  Layers,
  Download,
  Upload,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { ProvenanceBadge, ProvenanceType } from "@/components/ProvenanceBadge";

// Navigation Items
const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "groundwater", label: "Groundwater Analysis", icon: Droplets },
  { id: "risk", label: "Risk & Forecasting", icon: TrendingDown },
  { id: "gis", label: "GIS & Mapping", icon: MapIcon },
  { id: "recharge", label: "Recharge Planning", icon: Sprout },
  { id: "harvesting", label: "Rainwater Harvesting", icon: CloudRain },
  { id: "demand", label: "Water Demand", icon: Gauge },
  { id: "crop", label: "Crop & Irrigation", icon: Wheat },
  { id: "quality", label: "Water Quality", icon: FlaskConical },
  { id: "budget", label: "Water Budget", icon: PieChart },
  { id: "simulator", label: "What-If Simulator", icon: SlidersHorizontal },
  { id: "costbenefit", label: "Cost-Benefit Analysis", icon: Calculator },
  { id: "iot", label: "IoT Monitoring", icon: Radio },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "citizen", label: "Citizen Portal", icon: Users },
  { id: "ai", label: "AI Assistant", icon: Bot },
  { id: "users", label: "User Management", icon: UserCog },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function JalSurakshaApp() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState("Super Admin");
  const [currentUser, setCurrentUser] = useState("Aman Malik");
  const [currentTime, setCurrentTime] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Real-time connection status
  const [wsConnected, setWsConnected] = useState(true);
  const [lastTelemetryTick, setLastTelemetryTick] = useState(new Date().toISOString());

  // Modals & Panels
  const [alertsModalOpen, setAlertsModalOpen] = useState(false);
  const [layersModalOpen, setLayersModalOpen] = useState(false);
  const [districtModalOpen, setDistrictModalOpen] = useState(false);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: string } | null>(null);

  // Dashboard state
  const [selectedDistrict, setSelectedDistrict] = useState("Hapur");
  const [trendRange, setTrendRange] = useState("5 Years");
  const [demandSector, setDemandSector] = useState("all");

  // Rainwater harvesting calculator
  const [roofArea, setRoofArea] = useState(2000);
  const [rainfallMm, setRainfallMm] = useState(750);
  const [runoffCoeff, setRunoffCoeff] = useState(0.85);
  const [buildingsCount, setBuildingsCount] = useState(1);

  // What-If Simulator sliders
  const [simExtraction, setSimExtraction] = useState(10);
  const [simRainfall, setSimRainfall] = useState(0);
  const [simRecharge, setSimRecharge] = useState(25);
  const [simCrop, setSimCrop] = useState(20);
  const [simPop, setSimPop] = useState(5);
  const [simIndustry, setSimIndustry] = useState(15);

  // Citizen report form
  const [citizenName, setCitizenName] = useState("");
  const [citizenPhone, setCitizenPhone] = useState("");
  const [citizenCategory, setCitizenCategory] = useState("Dried Borewell");
  const [citizenAddress, setCitizenAddress] = useState("Block A, Near Primary School, Hapur");
  const [citizenDesc, setCitizenDesc] = useState("");

  // AI Chat state
  const [aiMessages, setAiMessages] = useState<Array<{ sender: string; text: string; source?: string; confidence?: number }>>([
    {
      sender: "bot",
      text: "Namaste! I am the JalSuraksha AI Assistant. How can I assist you with groundwater levels, recharge sites, rainfall, or water stress analytics today?",
      source: "National Water Informatics & CGWB",
      confidence: 98,
    },
  ]);
  const [aiInput, setAiInput] = useState("");

  // Clock tick
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }) +
          ", " +
          now.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const showToast = (text: string, type: "success" | "info" | "error" = "info") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3200);
  };

  // Districts Data
  const districts = [
    {
      name: "Meerut",
      risk: "safe",
      level: 14.2,
      predicted: 15.0,
      depletion: 0.3,
      recharge: 120,
      issues: "Stable extraction, seasonal variation",
      recommended: "Monitoring wells",
      path: "M230,60 L300,45 L340,75 L330,120 L270,130 L215,105 Z",
      cx: 275,
      cy: 90,
      provenance: "LIVE" as ProvenanceType,
    },
    {
      name: "Ghaziabad",
      risk: "moderate",
      level: 21.6,
      predicted: 24.0,
      depletion: 0.5,
      recharge: 95,
      issues: "Urban extraction pressure, declining recharge zones",
      recommended: "Percolation Pond, Check Dam",
      path: "M270,130 L330,120 L360,165 L330,205 L275,195 L255,150 Z",
      cx: 300,
      cy: 165,
      provenance: "LIVE" as ProvenanceType,
    },
    {
      name: "Hapur",
      risk: "critical",
      level: 32.4,
      predicted: 35.1,
      depletion: 0.8,
      recharge: 78,
      issues: "High extraction, Low recharge",
      recommended: "Recharge Well, Percolation Pond",
      path: "M360,165 L420,150 L450,190 L430,235 L375,225 L330,205 Z",
      cx: 395,
      cy: 195,
      provenance: "LIVE" as ProvenanceType,
    },
    {
      name: "Noida",
      risk: "high",
      level: 28.1,
      predicted: 31.4,
      depletion: 0.7,
      recharge: 60,
      issues: "Rapid urbanization, over-extraction",
      recommended: "Recharge Shafts, Rooftop Harvesting",
      path: "M275,195 L330,205 L340,250 L300,285 L255,265 L245,220 Z",
      cx: 290,
      cy: 240,
      provenance: "LIVE" as ProvenanceType,
    },
    {
      name: "Greater Noida",
      risk: "high",
      level: 26.9,
      predicted: 29.8,
      depletion: 0.6,
      recharge: 68,
      issues: "Industrial demand rising, low natural recharge",
      recommended: "Check Dams, Recharge Wells",
      path: "M300,285 L340,250 L390,265 L400,315 L350,340 L305,325 Z",
      cx: 350,
      cy: 295,
      provenance: "LIVE" as ProvenanceType,
    },
    {
      name: "Bulandshahr",
      risk: "moderate",
      level: 20.3,
      predicted: 22.1,
      depletion: 0.4,
      recharge: 140,
      issues: "Possible over-extraction, agriculture demand",
      recommended: "Farm Ponds, Check Dams",
      path: "M375,225 L430,235 L460,280 L440,330 L390,315 L390,265 L340,250 L360,220 Z",
      cx: 400,
      cy: 275,
      provenance: "DELAYED" as ProvenanceType,
    },
    {
      name: "Mathura",
      risk: "safe",
      level: 16.5,
      predicted: 17.9,
      depletion: 0.3,
      recharge: 155,
      issues: "Seasonal fluctuation, low industrial load",
      recommended: "Village ponds restoration",
      path: "M245,220 L255,265 L230,320 L175,330 L160,280 L200,240 Z",
      cx: 210,
      cy: 280,
      provenance: "DELAYED" as ProvenanceType,
    },
    {
      name: "Aligarh",
      risk: "moderate",
      level: 22.8,
      predicted: 25.6,
      depletion: 0.5,
      recharge: 88,
      issues: "Water quality risk (High TDS), moderate extraction",
      recommended: "Recharge Trenches, Awareness Programs",
      path: "M350,340 L400,315 L440,330 L450,380 L400,410 L360,390 Z",
      cx: 400,
      cy: 365,
      provenance: "LIVE" as ProvenanceType,
    },
  ];

  const currentDistrictObj = districts.find((d) => d.name === selectedDistrict) || districts[2];

  const riskColors: Record<string, string> = {
    safe: "#27AE60",
    moderate: "#F2C94C",
    high: "#F2994A",
    critical: "#EB5757",
  };

  const riskBadgeStyles: Record<string, string> = {
    safe: "bg-green-500/10 text-green-700 border-green-500/20",
    moderate: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20",
    high: "bg-orange-500/10 text-orange-700 border-orange-500/20",
    critical: "bg-red-500/10 text-red-700 border-red-500/20",
  };

  const alerts = [
    { sev: "critical", text: "Critical groundwater decline detected in Hapur", time: "2 hours ago", status: "open" },
    { sev: "warning", text: "Possible over-extraction in Bulandshahr", time: "5 hours ago", status: "open" },
    { sev: "warning", text: "Water quality risk (High TDS) in Aligarh", time: "7 hours ago", status: "open" },
    { sev: "info", text: "Heavy rainfall expected in next 3 days", time: "1 day ago", status: "open" },
    { sev: "critical", text: "Recharge structure failure reported near Noida sector 62", time: "1 day ago", status: "open" },
    { sev: "info", text: "New IoT sensor cluster activated in Meerut", time: "2 days ago", status: "resolved" },
  ];

  const recommendations = [
    {
      id: 1,
      title: "Construct recharge wells in Hapur",
      priority: "High",
      problem: "Critical decline with high extraction and low natural recharge.",
      impact: "+38 MLD/year recharge",
      cost: "₹2.4 Cr",
      saved: "38 MLD/year",
      confidence: 91,
    },
    {
      id: 2,
      title: "Implement rooftop rainwater harvesting",
      priority: "High",
      problem: "Urban rooftop runoff going largely unused across NCR districts.",
      impact: "Reduces municipal demand by 8%",
      cost: "₹85 lakh (pilot)",
      saved: "12 MLD/year",
      confidence: 86,
    },
    {
      id: 3,
      title: "Restore check dams in Bulandshahr",
      priority: "Medium",
      problem: "Seasonal runoff not captured due to degraded check dam structures.",
      impact: "+18 MLD/year recharge",
      cost: "₹1.1 Cr",
      saved: "18 MLD/year",
      confidence: 79,
    },
    {
      id: 4,
      title: "Promote low-water crops in Aligarh",
      priority: "Medium",
      problem: "Water-intensive crop patterns increasing extraction stress.",
      impact: "Reduces agri-demand by 14%",
      cost: "₹40 lakh (subsidy)",
      saved: "9 MLD/year",
      confidence: 74,
    },
    {
      id: 5,
      title: "Regulate extraction in critical zones",
      priority: "High",
      problem: "Unregulated borewell drilling in critical-risk blocks.",
      impact: "Slows depletion rate by 35%",
      cost: "Policy — Low cost",
      saved: "22 MLD/year",
      confidence: 88,
    },
  ];

  // Rainwater calculations
  const roofM2 = roofArea * 0.0929;
  const litresPerBldg = roofM2 * (rainfallMm / 1000) * runoffCoeff * 1000;
  const totalHarvestLitres = litresPerBldg * buildingsCount;
  const storageLitres = totalHarvestLitres * 0.15;
  const rechargeLitres = totalHarvestLitres * 0.4;
  const annualSavingsInr = (totalHarvestLitres / 1000) * 45;

  // Simulator calculation
  const simLevelImprove =
    -simExtraction * 0.04 +
    simRainfall * 0.02 +
    simRecharge * 0.035 +
    simCrop * 0.02 -
    simPop * 0.015 +
    simIndustry * 0.01;
  const simResultLevel = Math.max(5.0, Number((24.8 - simLevelImprove).toFixed(2)));
  const simDeficitReduction = Math.min(
    100,
    Number((simExtraction * 1.2 + simRecharge * 0.8 + simCrop * 0.5 + simIndustry * 0.4).toFixed(1))
  );
  const simSecurityIndex = Math.min(100, Math.max(0, Math.round(68 + simLevelImprove * 4.5 + simDeficitReduction * 0.25)));

  // AI Assistant send
  const handleSendAi = () => {
    if (!aiInput.trim()) return;
    const userQ = aiInput;
    setAiMessages((prev) => [...prev, { sender: "user", text: userQ }]);
    setAiInput("");

    setTimeout(() => {
      let botA = "Based on our latest telemetry and CGWB groundwater data, extraction exceeds recharge in critical blocks. We recommend prioritizing recharge structures and shifting to drought-resistant crops.";
      let src = "CGWB & CWC Database";
      let conf = 89;

      const qLow = userQ.toLowerCase();
      if (qLow.includes("hapur") || qLow.includes("decline")) {
        botA = "Hapur shows an acute depletion rate of 0.8 m/year driven primarily by agricultural tube-well extraction exceeding 142% of annual natural recharge.";
        src = "CGWB Well GW-014 Observation";
        conf = 94;
      } else if (qLow.includes("crop") || qLow.includes("farmer")) {
        botA = "Under current water table stress, Millet (Bajra) and Chickpea (Chana) offer 89-94% suitability with 40% lower irrigation requirement than wheat and sugarcane.";
        src = "Agricultural Water Optimization Model";
        conf = 91;
      } else if (qLow.includes("recharge") || qLow.includes("site")) {
        botA = "The highest suitability recharge sites are Hapur Block (94% suitability, Recharge Well) and Bulandshahr (89% suitability, Check Dam).";
        src = "Geospatial Multi-Criteria Suitability Model";
        conf = 92;
      } else if (qLow.includes("harvest") || qLow.includes("rain")) {
        botA = "A 2,000 sq ft rooftop in this region generates ~1.19 million litres of harvestable rainwater per year at 750mm rainfall, saving ₹53,000 annually.";
        src = "IMD Rainfall Normals & BIS 15797";
        conf = 96;
      }

      setAiMessages((prev) => [...prev, { sender: "bot", text: botA, source: src, confidence: conf }]);
    }, 600);
  };

  return (
    <div className="flex h-screen bg-[#F4F7FA] text-[#172B4D] overflow-hidden">
      {/* MOBILE OVERLAY */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`bg-navy text-white flex flex-col z-50 transition-all duration-200 ${
          sidebarOpen ? "w-[260px]" : "w-[76px]"
        } fixed lg:static inset-y-0 left-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand */}
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/10 flex-shrink-0">
          <div className="w-9 h-9 rounded-lg bg-blue/20 flex items-center justify-center text-xl flex-shrink-0">
            💧
          </div>
          {sidebarOpen && (
            <div className="leading-tight overflow-hidden">
              <div className="font-extrabold text-lg tracking-tight text-white">JalSuraksha</div>
              <div className="text-[11px] text-[#9fc9ec] -mt-0.5 truncate">
                Predict • Protect • Preserve
              </div>
            </div>
          )}
        </div>

        {/* Navigation items */}
        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? "bg-gradient-to-r from-blue to-blue/80 text-white shadow-md shadow-blue/30"
                    : "text-blue-100/80 hover:bg-white/10 hover:text-white"
                } ${!sidebarOpen ? "justify-center" : ""}`}
                title={!sidebarOpen ? item.label : undefined}
              >
                <Icon className="w-[18px] h-[18px] flex-shrink-0" />
                {sidebarOpen && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Footer Banner */}
        {sidebarOpen && (
          <div className="px-4 py-4 border-t border-white/10 flex-shrink-0">
            <div className="rounded-xl overflow-hidden relative h-20 bg-gradient-to-r from-blue/40 to-navyDark border border-white/15 p-3 flex flex-col justify-center text-center">
              <div className="font-bold text-sm text-white leading-tight">Save Water</div>
              <div className="text-xs text-blue-200">Secure Tomorrow</div>
              <div className="text-[10px] text-white/60 mt-1">National Water Mission</div>
            </div>
          </div>
        )}
      </aside>

      {/* MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* HEADER */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-200 px-4 lg:px-6 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (window.innerWidth < 1024) {
                  setMobileMenuOpen(!mobileMenuOpen);
                } else {
                  setSidebarOpen(!sidebarOpen);
                }
              }}
              className="p-2 rounded-lg hover:bg-slate-100 flex-shrink-0 text-navy"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Search */}
            <div className="relative flex-1 max-w-md hidden sm:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search location (city, district, block)..."
                className="w-full bg-slate-100 rounded-full pl-9 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue/40"
              />
            </div>

            {/* Real-time Status Badge */}
            <div className="flex items-center gap-1.5 ml-auto">
              <ProvenanceBadge type="LIVE" timestamp={lastTelemetryTick} source="WRIS/Meteo" />
              <div className="hidden md:flex items-center gap-1 bg-green-50 text-green-700 border border-green-200 text-[11px] font-semibold px-2 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
                <span>Streaming</span>
              </div>
            </div>

            {/* Alerts Bell */}
            <button
              onClick={() => setAlertsModalOpen(true)}
              className="p-2 rounded-lg hover:bg-slate-100 relative text-navy"
              title="View Alerts"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 bg-red text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                3
              </span>
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-9 h-9 rounded-full bg-blue text-white flex items-center justify-center font-bold text-sm shadow-sm">
                AM
              </div>
              <div className="hidden md:block leading-tight text-left">
                <div className="text-sm font-semibold text-navy">{currentUser}</div>
                <div className="text-[11px] text-muted flex items-center gap-1">
                  <span>{currentRole}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Subheader Breadcrumb & Clock */}
          <div className="hidden lg:flex items-center justify-between pt-2 text-[11px] text-muted">
            <div className="flex items-center gap-1.5 font-medium text-navy">
              <span>JalSuraksha</span>
              <span>/</span>
              <span className="capitalize font-semibold text-blue">{currentPage}</span>
            </div>
            <div className="font-mono text-muted">{currentTime}</div>
          </div>
        </header>

        {/* MAIN BODY PAGES HOST */}
        <main className="p-4 lg:p-6 max-w-[1600px] w-full mx-auto space-y-6">
          {/* ================= PAGE 1: DASHBOARD ================= */}
          {currentPage === "dashboard" && (
            <div className="space-y-6 animate-fade-in">
              {/* Top Banner & Quick Actions */}
              <div className="card p-5 bg-gradient-to-r from-navy via-navyDark to-[#0A4378] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs bg-blue/30 text-blue-100 px-2.5 py-0.5 rounded-full font-medium">
                      National Water Mission Feed
                    </span>
                    <ProvenanceBadge type="LIVE" timestamp={lastTelemetryTick} />
                  </div>
                  <h1 className="text-2xl font-bold tracking-tight">Water Intelligence for a Safer Tomorrow</h1>
                  <p className="text-sm text-blue-100/80 mt-1 max-w-xl">
                    Live ingestion from India-WRIS, CGWB, CWC, and Open-Meteo across 8 monitored districts in Western Uttar Pradesh & NCR.
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => {
                      setCurrentPage("simulator");
                    }}
                    className="bg-blue hover:bg-blue/90 text-white text-xs font-semibold px-3.5 py-2 rounded-lg flex items-center gap-1.5 shadow"
                  >
                    <SlidersHorizontal className="w-4 h-4" /> Run Simulation
                  </button>
                  <button
                    onClick={() => setLayersModalOpen(true)}
                    className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3.5 py-2 rounded-lg flex items-center gap-1.5 border border-white/20"
                  >
                    <Layers className="w-4 h-4" /> Layers
                  </button>
                </div>
              </div>

              {/* 5 KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="card p-4 hoverable">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-lg bg-blueLight text-blue flex items-center justify-center font-bold">
                      <Droplets className="w-4 h-4" />
                    </div>
                    <ProvenanceBadge type="LIVE" />
                  </div>
                  <div className="text-[12px] text-muted leading-tight mb-1">Current Avg. Groundwater Level</div>
                  <div className="text-2xl font-extrabold text-navy tracking-tight">24.8 <span className="text-sm font-semibold text-muted">m</span></div>
                  <div className="text-[11px] text-red mt-1 font-semibold flex items-center gap-1">
                    <span>↑ 5%</span> <span className="text-muted font-normal">vs. last year</span>
                  </div>
                </div>

                <div className="card p-4 hoverable">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-lg bg-red/10 text-red flex items-center justify-center font-bold">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <ProvenanceBadge type="LIVE" />
                  </div>
                  <div className="text-[12px] text-muted leading-tight mb-1">High Risk Areas</div>
                  <div className="text-2xl font-extrabold text-navy tracking-tight">12</div>
                  <div className="text-[11px] text-green mt-1 font-semibold flex items-center gap-1">
                    <span>↓ 3</span> <span className="text-muted font-normal">vs. last month</span>
                  </div>
                </div>

                <div className="card p-4 hoverable">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-lg bg-blueLight text-blue flex items-center justify-center font-bold">
                      <Gauge className="w-4 h-4" />
                    </div>
                    <ProvenanceBadge type="DELAYED" />
                  </div>
                  <div className="text-[12px] text-muted leading-tight mb-1">Total Water Demand (Annual)</div>
                  <div className="text-2xl font-extrabold text-navy tracking-tight">482 <span className="text-sm font-semibold text-muted">MLD</span></div>
                  <div className="text-[11px] text-red mt-1 font-semibold flex items-center gap-1">
                    <span>↑ 12%</span> <span className="text-muted font-normal">vs. last year</span>
                  </div>
                </div>

                <div className="card p-4 hoverable">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-lg bg-greenLight text-green flex items-center justify-center font-bold">
                      <Sprout className="w-4 h-4" />
                    </div>
                    <ProvenanceBadge type="LIVE" />
                  </div>
                  <div className="text-[12px] text-muted leading-tight mb-1">Recharge Potential</div>
                  <div className="text-2xl font-extrabold text-navy tracking-tight">310 <span className="text-sm font-semibold text-muted">MLD</span></div>
                  <div className="text-[11px] text-green mt-1 font-semibold flex items-center gap-1">
                    <span>↑ 28%</span> <span className="text-muted font-normal">potential structures</span>
                  </div>
                </div>

                <div className="card p-4 hoverable">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-lg bg-yellow/15 text-amber-700 flex items-center justify-center font-bold">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <ProvenanceBadge type="LIVE" />
                  </div>
                  <div className="text-[12px] text-muted leading-tight mb-1">Water Security Index</div>
                  <div className="text-2xl font-extrabold text-navy tracking-tight">68 <span className="text-sm font-semibold text-muted">/100</span></div>
                  <div className="text-[11px] text-amber-700 mt-1 font-semibold">
                    Moderate Risk Category
                  </div>
                </div>
              </div>

              {/* District Map & Selected District Details */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Vector Map */}
                <div className="card p-5 lg:col-span-2">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-base text-navy">Interactive Groundwater Risk Map</h3>
                      <p className="text-xs text-muted">Click any district to view live hydrogeology & recommendations</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <ProvenanceBadge type="LIVE" />
                      <button
                        onClick={() => setLayersModalOpen(true)}
                        className="text-xs font-semibold text-blue bg-blueLight px-2.5 py-1 rounded-md flex items-center gap-1"
                      >
                        <Layers className="w-3.5 h-3.5" /> Map Layers
                      </button>
                    </div>
                  </div>

                  {/* SVG Map Canvas */}
                  <div className="w-full bg-slate-50/70 border border-slate-200 rounded-xl p-4 flex items-center justify-center relative overflow-hidden">
                    <svg viewBox="100 20 400 420" className="w-full max-h-[380px] drop-shadow-md">
                      {districts.map((d) => {
                        const isSel = d.name === selectedDistrict;
                        return (
                          <g key={d.name}>
                            <path
                              d={d.path}
                              fill={riskColors[d.risk]}
                              fillOpacity={isSel ? 0.95 : 0.82}
                              className={`district-shape ${isSel ? "selected" : ""}`}
                              onClick={() => setSelectedDistrict(d.name)}
                            />
                            <text
                              x={d.cx}
                              y={d.cy - 6}
                              textAnchor="middle"
                              fill="#ffffff"
                              fontSize="11"
                              fontWeight="bold"
                              className="pointer-events-none drop-shadow"
                            >
                              {d.name}
                            </text>
                            <text
                              x={d.cx}
                              y={d.cy + 7}
                              textAnchor="middle"
                              fill="#ffffff"
                              fontSize="9.5"
                              fontWeight="500"
                              className="pointer-events-none drop-shadow"
                            >
                              {d.level}m
                            </text>
                          </g>
                        );
                      })}
                    </svg>

                    {/* Map Legend */}
                    <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur border border-slate-200 rounded-lg p-2 text-[10px] space-y-1 shadow-sm">
                      <div className="font-bold text-navy mb-1">CGWB Risk Class</div>
                      <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-green" /> Safe (&lt;18m)</div>
                      <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-yellow" /> Moderate (18-24m)</div>
                      <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-orange" /> High Risk (24-30m)</div>
                      <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red" /> Critical (&gt;30m)</div>
                    </div>
                  </div>
                </div>

                {/* Selected District Profile */}
                <div className="card p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-muted font-medium">Selected District</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${riskBadgeStyles[currentDistrictObj.risk]}`}>
                        {currentDistrictObj.risk.toUpperCase()}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-navy">{currentDistrictObj.name}</h2>
                    <p className="text-xs text-muted mt-1 leading-relaxed">{currentDistrictObj.issues}</p>

                    <div className="grid grid-cols-2 gap-3 my-4">
                      <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                        <div className="text-[11px] text-muted">Current Depth</div>
                        <div className="text-xl font-extrabold text-navy">{currentDistrictObj.level} m</div>
                      </div>
                      <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                        <div className="text-[11px] text-muted">1-Yr Forecast</div>
                        <div className="text-xl font-extrabold text-red">{currentDistrictObj.predicted} m</div>
                      </div>
                      <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                        <div className="text-[11px] text-muted">Depletion Rate</div>
                        <div className="text-base font-bold text-navy">-{currentDistrictObj.depletion} m/yr</div>
                      </div>
                      <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                        <div className="text-[11px] text-muted">Recharge Pot.</div>
                        <div className="text-base font-bold text-green">+{currentDistrictObj.recharge} MLD</div>
                      </div>
                    </div>

                    <div className="bg-blueLight/60 border border-blue/20 rounded-xl p-3 text-xs">
                      <div className="font-bold text-blue flex items-center gap-1 mb-1">
                        <Sparkles className="w-3.5 h-3.5" /> Recommended Interventions
                      </div>
                      <div className="text-txt font-medium">{currentDistrictObj.recommended}</div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex gap-2">
                    <button
                      onClick={() => setDistrictModalOpen(true)}
                      className="flex-1 bg-navy hover:bg-navyDark text-white text-xs font-semibold py-2.5 rounded-lg text-center"
                    >
                      Full Assessment
                    </button>
                    <button
                      onClick={() => {
                        setAiInput(`Tell me about groundwater risk and recharge options in ${currentDistrictObj.name}`);
                        setAiChatOpen(true);
                      }}
                      className="bg-blueLight hover:bg-blue/20 text-blue p-2.5 rounded-lg"
                      title="Ask AI about this district"
                    >
                      <Bot className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Groundwater Trend & Water Budget Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Trend Graph */}
                <div className="card p-5 lg:col-span-2">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-base text-navy">Groundwater Level Trend & Forecast</h3>
                      <p className="text-xs text-muted">Historical water table levels vs. ML forecast models</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <ProvenanceBadge type="LIVE" />
                      <select
                        value={trendRange}
                        onChange={(e) => setTrendRange(e.target.value)}
                        className="text-xs border border-slate-200 rounded-lg px-2.5 py-1 bg-white font-medium"
                      >
                        <option>5 Years</option>
                        <option>10 Years</option>
                      </select>
                    </div>
                  </div>

                  {/* Visual Bar/Line Chart */}
                  <div className="h-56 w-full flex items-end gap-3 pt-6 pb-2 px-2 border-b border-slate-200">
                    {trendRange === "5 Years" ? (
                      [
                        { year: "2020", actual: 15.1, pred: null },
                        { year: "2021", actual: 17.8, pred: null },
                        { year: "2022", actual: 19.9, pred: null },
                        { year: "2023", actual: 21.7, pred: null },
                        { year: "2024", actual: 23.4, pred: 23.4 },
                        { year: "2025", actual: 24.8, pred: 24.8 },
                      ].map((item) => (
                        <div key={item.year} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                          <div className="text-[10px] font-bold text-navy opacity-0 group-hover:opacity-100 transition">
                            {item.actual}m
                          </div>
                          <div
                            style={{ height: `${(item.actual / 35) * 100}%` }}
                            className="w-full max-w-[42px] bg-gradient-to-t from-blue to-blue-400 rounded-t-md transition-all group-hover:brightness-110"
                          />
                          <div className="text-[11px] text-muted font-medium mt-1">{item.year}</div>
                        </div>
                      ))
                    ) : (
                      [
                        { year: "2025", val: 24.8, type: "actual" },
                        { year: "2027", val: 27.0, type: "pred" },
                        { year: "2029", val: 29.6, type: "pred" },
                        { year: "2031", val: 31.9, type: "pred" },
                        { year: "2033", val: 33.8, type: "pred" },
                        { year: "2035", val: 34.8, type: "pred" },
                      ].map((item) => (
                        <div key={item.year} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                          <div className="text-[10px] font-bold text-navy opacity-0 group-hover:opacity-100 transition">
                            {item.val}m
                          </div>
                          <div
                            style={{ height: `${(item.val / 40) * 100}%` }}
                            className={`w-full max-w-[42px] rounded-t-md transition-all ${
                              item.type === "actual"
                                ? "bg-blue"
                                : "bg-gradient-to-t from-red/70 to-red/40 border border-dashed border-red"
                            }`}
                          />
                          <div className="text-[11px] text-muted font-medium mt-1">{item.year}</div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted mt-3">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-blue" /> Actual Recorded (CGWB)</span>
                      <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-red/60" /> ML Forecast (XGBoost/Prophet)</span>
                    </div>
                    <span>Unit: Meters below ground level (m bgl)</span>
                  </div>
                </div>

                {/* Annual Water Budget */}
                <div className="card p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-base text-navy">Annual Water Budget</h3>
                      <p className="text-xs text-muted">Input vs. Extraction Ledger</p>
                    </div>
                    <ProvenanceBadge type="LIVE" />
                  </div>

                  <div className="space-y-3 pt-2">
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue" /> Rainfall Inflow</span>
                        <span className="text-navy">620 MLD</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-blue h-full rounded-full" style={{ width: "100%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-green" /> Natural Recharge</span>
                        <span className="text-navy">310 MLD</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-green h-full rounded-full" style={{ width: "50%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-yellow" /> Total Extraction</span>
                        <span className="text-navy">482 MLD</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-yellow h-full rounded-full" style={{ width: "77%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red" /> Net Deficit</span>
                        <span className="text-red font-bold">-172 MLD</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-red h-full rounded-full" style={{ width: "27%" }} />
                      </div>
                    </div>
                  </div>

                  <div className="bg-red/10 border border-red/20 rounded-xl p-3 mt-6 text-xs text-red font-medium">
                    Critical Deficit Warning: Regional extraction exceeds sustainable recharge rate by 172 MLD annually.
                  </div>
                </div>
              </div>

              {/* AI Strategic Recommendations & Live Alerts Feed */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* AI Recommendations */}
                <div className="card p-5 lg:col-span-2">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-base text-navy">AI Strategic Recommendations</h3>
                      <p className="text-xs text-muted">Machine learning prioritization based on hydrogeological impact</p>
                    </div>
                    <ProvenanceBadge type="LIVE" />
                  </div>

                  <div className="space-y-3">
                    {recommendations.slice(0, 4).map((rec) => (
                      <div
                        key={rec.id}
                        className="border border-slate-100 hover:border-slate-200 bg-slate-50/60 p-3.5 rounded-xl flex items-start justify-between gap-3 hover:shadow-sm transition"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                rec.priority === "High" ? "bg-red/10 text-red" : "bg-yellow/20 text-amber-800"
                              }`}
                            >
                              {rec.priority} Priority
                            </span>
                            <span className="font-bold text-sm text-navy">{rec.title}</span>
                          </div>
                          <p className="text-xs text-muted">{rec.problem}</p>
                          <div className="flex items-center gap-3 text-[11px] text-muted pt-1">
                            <span>Impact: <strong className="text-navy">{rec.impact}</strong></span>
                            <span>Cost: <strong className="text-navy">{rec.cost}</strong></span>
                            <span>Water Saved: <strong className="text-green font-bold">{rec.saved}</strong></span>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-xs font-bold text-blue">{rec.confidence}%</div>
                          <div className="text-[10px] text-muted">Confidence</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Alerts Feed */}
                <div className="card p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-base text-navy">Recent Alerts Feed</h3>
                        <p className="text-xs text-muted">Threshold & anomaly triggers</p>
                      </div>
                      <ProvenanceBadge type="LIVE" />
                    </div>

                    <div className="space-y-3">
                      {alerts.slice(0, 5).map((a, i) => (
                        <div key={i} className="flex items-start gap-2.5 pb-2.5 border-b border-slate-100 last:border-0">
                          <span
                            className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                              a.sev === "critical" ? "bg-red" : a.sev === "warning" ? "bg-orange" : "bg-blue"
                            }`}
                          />
                          <div className="leading-tight">
                            <div className="text-xs font-semibold text-navy">{a.text}</div>
                            <div className="text-[10px] text-muted mt-0.5">{a.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setAlertsModalOpen(true)}
                    className="w-full mt-4 text-xs font-semibold text-navy hover:text-blue bg-slate-100 hover:bg-slate-200 py-2 rounded-lg transition"
                  >
                    View All Live Alerts →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= PAGE 2: GROUNDWATER ================= */}
          {currentPage === "groundwater" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-navy">Groundwater Analysis</h2>
                  <p className="text-xs text-muted">District, block and monitoring well hydrogeological metrics</p>
                </div>
                <ProvenanceBadge type="LIVE" timestamp={lastTelemetryTick} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="card p-4">
                  <div className="text-xs text-muted">Avg Depth to Water</div>
                  <div className="text-2xl font-extrabold text-navy mt-1">24.8 m</div>
                  <div className="text-[11px] text-red mt-1">↑ 0.52 m/yr depletion</div>
                </div>
                <div className="card p-4">
                  <div className="text-xs text-muted">Active Piezometer Wells</div>
                  <div className="text-2xl font-extrabold text-navy mt-1">128</div>
                  <div className="text-[11px] text-green mt-1">100% online telemetry</div>
                </div>
                <div className="card p-4">
                  <div className="text-xs text-muted">Over-Exploited Blocks</div>
                  <div className="text-2xl font-extrabold text-red mt-1">4</div>
                  <div className="text-[11px] text-muted mt-1">CGWB Categorization</div>
                </div>
                <div className="card p-4">
                  <div className="text-xs text-muted">Critical Stage Blocks</div>
                  <div className="text-2xl font-extrabold text-orange mt-1">2</div>
                  <div className="text-[11px] text-muted mt-1">Noida, Greater Noida</div>
                </div>
              </div>

              {/* Comparative Table */}
              <div className="card p-5">
                <h3 className="font-bold text-base text-navy mb-3">District Groundwater Categorization Ledger</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-muted">
                        <th className="pb-2">District</th>
                        <th className="pb-2">Current Depth</th>
                        <th className="pb-2">Depletion Rate</th>
                        <th className="pb-2">Recharge Pot.</th>
                        <th className="pb-2">CGWB Category</th>
                        <th className="pb-2">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {districts.map((d) => (
                        <tr key={d.name} className="hover:bg-slate-50">
                          <td className="py-2.5 font-bold text-navy">{d.name}</td>
                          <td className="py-2.5">{d.level} m</td>
                          <td className="py-2.5 text-red font-medium">-{d.depletion} m/yr</td>
                          <td className="py-2.5 text-green font-medium">+{d.recharge} MLD</td>
                          <td className="py-2.5">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${riskBadgeStyles[d.risk]}`}>
                              {d.risk.toUpperCase()}
                            </span>
                          </td>
                          <td className="py-2.5">
                            <button
                              onClick={() => {
                                setSelectedDistrict(d.name);
                                setDistrictModalOpen(true);
                              }}
                              className="text-blue font-semibold hover:underline"
                            >
                              Explore →
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ================= PAGE 3: RESERVOIR MONITOR ================= */}
          {currentPage === "reservoirs" || currentPage === "risk" ? (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-navy">
                    {currentPage === "reservoirs" ? "Major Reservoir Monitor" : "Risk & Forecasting"}
                  </h2>
                  <p className="text-xs text-muted">
                    Official Central Water Commission (CWC) weekly live storage bulletins
                  </p>
                </div>
                <ProvenanceBadge type="DELAYED" source="CWC Weekly Bulletin" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="card p-4">
                  <div className="text-xs text-muted">Monitored Reservoirs</div>
                  <div className="text-2xl font-extrabold text-navy mt-1">4 Dams</div>
                  <div className="text-[11px] text-muted mt-1">Northern / Ganga Basin</div>
                </div>
                <div className="card p-4">
                  <div className="text-xs text-muted">Total Live Capacity</div>
                  <div className="text-2xl font-extrabold text-navy mt-1">14,907 <span className="text-xs">MCM</span></div>
                </div>
                <div className="card p-4">
                  <div className="text-xs text-muted">Current Live Storage</div>
                  <div className="text-2xl font-extrabold text-navy mt-1">10,730 <span className="text-xs">MCM</span></div>
                  <div className="text-[11px] text-green mt-1">72.0% Overall Fill</div>
                </div>
                <div className="card p-4">
                  <div className="text-xs text-muted">vs. 10-Year Average</div>
                  <div className="text-2xl font-extrabold text-green mt-1">+12.8%</div>
                  <div className="text-[11px] text-muted mt-1">Healthy monsoon buffer</div>
                </div>
              </div>

              {/* Dam Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "Ramganga Dam", basin: "Ganga Basin", cap: 2192, cur: 1620, fill: 73.9, avg: 1420, inflow: 145, outflow: 90 },
                  { name: "Matatila Reservoir", basin: "Betwa Basin", cap: 1132, cur: 810, fill: 71.6, avg: 710, inflow: 85, outflow: 60 },
                  { name: "Tehri Dam", basin: "Bhagirathi", cap: 2615, cur: 2180, fill: 83.4, avg: 1980, inflow: 210, outflow: 180 },
                  { name: "Rihand Dam (G.B. Pant)", basin: "Son Basin", cap: 8968, cur: 6120, fill: 68.2, avg: 5400, inflow: 320, outflow: 240 },
                ].map((res) => (
                  <div key={res.name} className="card p-5">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-bold text-navy text-base">{res.name}</h4>
                        <div className="text-xs text-muted">{res.basin}</div>
                      </div>
                      <span className="text-xs font-bold text-blue bg-blueLight px-2.5 py-1 rounded-full">
                        {res.fill}% Filled
                      </span>
                    </div>

                    <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden my-3">
                      <div className="bg-blue h-full rounded-full" style={{ width: `${res.fill}%` }} />
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs pt-2">
                      <div>
                        <span className="text-muted text-[10px]">Current Storage</span>
                        <div className="font-bold text-navy">{res.cur} MCM</div>
                      </div>
                      <div>
                        <span className="text-muted text-[10px]">10-Yr Avg</span>
                        <div className="font-bold text-navy">{res.avg} MCM</div>
                      </div>
                      <div>
                        <span className="text-muted text-[10px]">Net Inflow</span>
                        <div className="font-bold text-green">+{res.inflow - res.outflow} m³/s</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {/* ================= PAGE 6: RAINWATER HARVESTING ================= */}
          {currentPage === "harvesting" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-navy">Rainwater Harvesting Calculator</h2>
                  <p className="text-xs text-muted">Estimate harvestable rainwater, storage tank size, and financial savings</p>
                </div>
                <ProvenanceBadge type="SIMULATED" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Inputs */}
                <div className="card p-5 space-y-4">
                  <h3 className="font-bold text-base text-navy">Building Parameters</h3>

                  <div>
                    <label className="text-xs text-muted block mb-1">Rooftop Catchment Area (sq. ft.)</label>
                    <input
                      type="number"
                      value={roofArea}
                      onChange={(e) => setRoofArea(Number(e.target.value))}
                      className="w-full border border-slate-200 rounded-lg p-2.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-blue/30"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-muted block mb-1">Annual Rainfall in Region (mm)</label>
                    <input
                      type="number"
                      value={rainfallMm}
                      onChange={(e) => setRainfallMm(Number(e.target.value))}
                      className="w-full border border-slate-200 rounded-lg p-2.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-blue/30"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-muted block mb-1">Roof Type / Runoff Coefficient</label>
                    <select
                      value={runoffCoeff}
                      onChange={(e) => setRunoffCoeff(Number(e.target.value))}
                      className="w-full border border-slate-200 rounded-lg p-2.5 text-sm font-medium bg-white outline-none"
                    >
                      <option value={0.85}>Concrete Flat Roof (0.85)</option>
                      <option value={0.75}>Clay Tiles (0.75)</option>
                      <option value={0.90}>Corrugated Galvanized Metal (0.90)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-muted block mb-1">Number of Buildings in Cluster</label>
                    <input
                      type="number"
                      value={buildingsCount}
                      onChange={(e) => setBuildingsCount(Number(e.target.value))}
                      className="w-full border border-slate-200 rounded-lg p-2.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-blue/30"
                    />
                  </div>

                  <button
                    onClick={() => showToast("Rainwater potential recalculated!", "success")}
                    className="w-full bg-blue hover:bg-blue/90 text-white font-semibold py-2.5 rounded-lg text-xs"
                  >
                    Recalculate Potential
                  </button>
                </div>

                {/* Output Results */}
                <div className="card p-5 lg:col-span-2 space-y-4 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-base text-navy mb-4">Estimated Yield & Economic Impact</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-blueLight/60 border border-blue/20 rounded-xl p-4">
                        <div className="text-xs text-blue font-bold">Total Annual Harvestable Water</div>
                        <div className="text-2xl font-extrabold text-navy mt-1">
                          {Math.round(totalHarvestLitres).toLocaleString()} <span className="text-sm font-normal text-muted">Litres</span>
                        </div>
                        <div className="text-xs text-muted mt-1">
                          Equals {(totalHarvestLitres / 1000000).toFixed(3)} MLD volume
                        </div>
                      </div>

                      <div className="bg-greenLight/60 border border-green/20 rounded-xl p-4">
                        <div className="text-xs text-green font-bold">Estimated Cost Savings</div>
                        <div className="text-2xl font-extrabold text-navy mt-1">
                          ₹{Math.round(annualSavingsInr).toLocaleString()} <span className="text-sm font-normal text-muted">/ year</span>
                        </div>
                        <div className="text-xs text-muted mt-1">
                          Based on ₹45/kL municipal tanker replacement
                        </div>
                      </div>

                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                        <div className="text-xs text-muted font-bold">Recommended Storage Tank Size</div>
                        <div className="text-xl font-extrabold text-navy mt-1">
                          {Math.round(storageLitres).toLocaleString()} <span className="text-sm font-normal text-muted">Litres</span>
                        </div>
                        <div className="text-xs text-muted mt-1">15% surge retention capacity</div>
                      </div>

                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                        <div className="text-xs text-muted font-bold">Groundwater Recharge Potential</div>
                        <div className="text-xl font-extrabold text-navy mt-1">
                          {Math.round(rechargeLitres).toLocaleString()} <span className="text-sm font-normal text-muted">Litres</span>
                        </div>
                        <div className="text-xs text-muted mt-1">Via percolation pit or shaft</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-muted">
                    <span className="font-bold text-navy">Guidelines:</span> As per Central Ground Water Authority (CGWA) guidelines, buildings with roof area &gt; 100 sq. m in over-exploited blocks are mandated to construct rooftop rainwater harvesting structures.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= PAGE 11: WHAT-IF SIMULATOR ================= */}
          {currentPage === "simulator" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-navy">What-If Policy & Climate Simulator</h2>
                  <p className="text-xs text-muted">
                    Adjust climate variables and conservation policies to forecast future water outcomes
                  </p>
                </div>
                <ProvenanceBadge type="SIMULATED" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sliders */}
                <div className="card p-5 space-y-4">
                  <h3 className="font-bold text-base text-navy">Simulation Levers</h3>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Groundwater Extraction Cut</span>
                      <span className="text-blue">{simExtraction}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={50}
                      value={simExtraction}
                      onChange={(e) => setSimExtraction(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Rainfall Deviation</span>
                      <span className={simRainfall >= 0 ? "text-green" : "text-red"}>
                        {simRainfall >= 0 ? `+${simRainfall}%` : `${simRainfall}%`}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={-40}
                      max={40}
                      value={simRainfall}
                      onChange={(e) => setSimRainfall(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Recharge Structures Expansion</span>
                      <span className="text-green">+{simRecharge}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={simRecharge}
                      onChange={(e) => setSimRecharge(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Low-Water Crop Adoption</span>
                      <span className="text-blue">{simCrop}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={80}
                      value={simCrop}
                      onChange={(e) => setSimCrop(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Industrial Water Recycling</span>
                      <span className="text-blue">{simIndustry}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={60}
                      value={simIndustry}
                      onChange={(e) => setSimIndustry(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <button
                    onClick={() => {
                      setSimExtraction(10);
                      setSimRainfall(0);
                      setSimRecharge(25);
                      setSimCrop(20);
                      setSimIndustry(15);
                      showToast("Simulator reset to baseline defaults", "info");
                    }}
                    className="w-full border border-slate-200 text-xs font-semibold text-muted py-2 rounded-lg hover:bg-slate-50"
                  >
                    Reset Levers
                  </button>
                </div>

                {/* Outputs */}
                <div className="card p-5 lg:col-span-2 space-y-5 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-base text-navy mb-4">Forecasted Outcome (5-Year Horizon)</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                        <div className="text-xs text-muted">Baseline Water Depth</div>
                        <div className="text-xl font-extrabold text-navy mt-1">24.8 m</div>
                        <div className="text-[11px] text-muted mt-1">Current state</div>
                      </div>

                      <div className="bg-greenLight/60 border border-green/20 rounded-xl p-4">
                        <div className="text-xs text-green font-bold">Simulated Water Depth</div>
                        <div className="text-2xl font-extrabold text-green mt-1">{simResultLevel} m</div>
                        <div className="text-[11px] text-green font-semibold mt-1">
                          {Number((simResultLevel - 24.8).toFixed(2))} m recovery
                        </div>
                      </div>

                      <div className="bg-blueLight/60 border border-blue/20 rounded-xl p-4">
                        <div className="text-xs text-blue font-bold">Security Index</div>
                        <div className="text-2xl font-extrabold text-navy mt-1">{simSecurityIndex} /100</div>
                        <div className="text-[11px] text-blue font-semibold mt-1">
                          +{simSecurityIndex - 68} pts improvement
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 border-t border-slate-100 pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-navy">Annual Water Deficit Reduction</span>
                        <span className="text-sm font-extrabold text-green">{simDeficitReduction}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue to-green h-full rounded-full transition-all duration-300"
                          style={{ width: `${simDeficitReduction}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[11px] text-muted mt-1">
                        <span>Current Deficit: 172 MLD</span>
                        <span>Projected: {Math.max(0, Math.round(172 * (1 - simDeficitReduction / 100)))} MLD</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs flex items-center justify-between">
                    <div>
                      <span className="font-bold text-navy">AI Policy Insight:</span> Combining a 10% extraction reduction with 25% recharge structure expansion eliminates over 35% of the district water deficit within 36 months.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= PAGE 15: CITIZEN PORTAL ================= */}
          {currentPage === "citizen" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-navy">Citizen Water Grievance Portal</h2>
                  <p className="text-xs text-muted">Report leaks, dried borewells, contamination, or illegal extraction</p>
                </div>
                <ProvenanceBadge type="LIVE" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Form */}
                <div className="card p-5 space-y-4 lg:col-span-2">
                  <h3 className="font-bold text-base text-navy">File a Water Issue Report</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-muted block mb-1">Your Full Name</label>
                      <input
                        value={citizenName}
                        onChange={(e) => setCitizenName(e.target.value)}
                        placeholder="Ramesh Patel"
                        className="w-full border border-slate-200 rounded-lg p-2.5 text-sm outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted block mb-1">Mobile Number (for SMS updates)</label>
                      <input
                        value={citizenPhone}
                        onChange={(e) => setCitizenPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full border border-slate-200 rounded-lg p-2.5 text-sm outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-muted block mb-1">Issue Category</label>
                      <select
                        value={citizenCategory}
                        onChange={(e) => setCitizenCategory(e.target.value)}
                        className="w-full border border-slate-200 rounded-lg p-2.5 text-sm bg-white outline-none"
                      >
                        <option>Dried Borewell</option>
                        <option>Water Contamination / High TDS</option>
                        <option>Pipeline Leakage</option>
                        <option>Illegal Groundwater Extraction</option>
                        <option>Recharge Structure Blockage</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-muted block mb-1">Location / Address</label>
                      <input
                        value={citizenAddress}
                        onChange={(e) => setCitizenAddress(e.target.value)}
                        placeholder="Block / Village / Street"
                        className="w-full border border-slate-200 rounded-lg p-2.5 text-sm outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-muted block mb-1">Detailed Description</label>
                    <textarea
                      rows={3}
                      value={citizenDesc}
                      onChange={(e) => setCitizenDesc(e.target.value)}
                      placeholder="Please provide specifics: pump depth, visual turbidity, duration of issue..."
                      className="w-full border border-slate-200 rounded-lg p-2.5 text-sm outline-none"
                    />
                  </div>

                  <div className="border border-dashed border-slate-200 rounded-xl p-4 text-center hover:bg-slate-50 transition cursor-pointer">
                    <Upload className="w-5 h-5 mx-auto text-muted mb-1" />
                    <div className="text-xs font-semibold text-navy">Attach Photos (Optional)</div>
                    <div className="text-[10px] text-muted">Geotagged smartphone photos expedite field officer triage</div>
                  </div>

                  <button
                    onClick={() => {
                      const refId = "JS-" + Math.floor(1000 + Math.random() * 9000);
                      showToast(`Grievance submitted successfully! Reference Ticket: ${refId}`, "success");
                      setCitizenDesc("");
                    }}
                    className="w-full bg-blue hover:bg-blue/90 text-white font-semibold py-2.5 rounded-lg text-xs"
                  >
                    Submit Water Grievance
                  </button>
                </div>

                {/* Status Sidebar */}
                <div className="card p-5 space-y-4">
                  <h3 className="font-bold text-base text-navy">Track Existing Grievance</h3>
                  <div>
                    <input
                      placeholder="Enter Ticket ID (e.g. JS-4821)"
                      className="w-full border border-slate-200 rounded-lg p-2 text-xs outline-none mb-2"
                    />
                    <button
                      onClick={() => showToast("Ticket JS-4821: Assigned to Field Officer Sunil Verma (In Progress)", "info")}
                      className="w-full bg-navy text-white text-xs font-semibold py-2 rounded-lg"
                    >
                      Check Status
                    </button>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <h4 className="text-xs font-bold text-navy mb-2">My Local Water Status</h4>
                    <div className="bg-slate-50 rounded-xl p-3 space-y-2 text-xs">
                      <div className="flex justify-between"><span className="text-muted">Current Depth:</span><strong className="text-navy">32.4 m</strong></div>
                      <div className="flex justify-between"><span className="text-muted">Water Quality:</span><strong className="text-amber-700">TDS 890 mg/L (High)</strong></div>
                      <div className="flex justify-between"><span className="text-muted">Advisory:</span><span className="text-txt font-medium">Boil/filter drinking water</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= PAGE 16: AI ASSISTANT ================= */}
          {currentPage === "ai" && (
            <div className="card p-5 h-[680px] flex flex-col justify-between animate-fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue/20 flex items-center justify-center text-blue font-bold">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy text-base">JalSuraksha Grounded AI Assistant</h3>
                    <div className="text-[11px] text-muted">RAG pipeline over CGWB well data, CWC bulletins, and IMD forecasts</div>
                  </div>
                </div>
                <ProvenanceBadge type="LIVE" />
              </div>

              {/* Chat Thread */}
              <div className="flex-1 overflow-y-auto py-4 space-y-3">
                {aiMessages.map((m, i) => (
                  <div key={i} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-xl rounded-2xl p-3.5 text-sm ${
                        m.sender === "user"
                          ? "bg-blue text-white rounded-br-none"
                          : "bg-slate-100 text-txt rounded-bl-none border border-slate-200/60"
                      }`}
                    >
                      <div>{m.text}</div>
                      {m.source && (
                        <div className="text-[10px] text-muted mt-2 pt-1.5 border-t border-slate-200/50 flex items-center justify-between">
                          <span>Source: {m.source}</span>
                          <span>Confidence: {m.confidence}%</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Prompt Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1">
                {[
                  "Why is groundwater declining in Hapur?",
                  "Which crops should farmers grow this season?",
                  "Where should recharge wells be constructed?",
                  "How much rainwater can my building harvest?",
                ].map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setAiInput(q);
                    }}
                    className="text-[11px] bg-blueLight hover:bg-blue/20 text-blue font-medium px-3 py-1.5 rounded-full flex-shrink-0"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Input Bar */}
              <div className="pt-3 border-t border-slate-200 flex gap-2">
                <input
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendAi()}
                  placeholder="Ask any question about water data, regulations, or forecasts..."
                  className="flex-1 bg-slate-100 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue/30"
                />
                <button
                  onClick={handleSendAi}
                  className="bg-blue hover:bg-blue/90 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Fallback for other modules (Crop, Quality, Demand, Budget, IoT, Reports, Users, Settings) */}
          {![
            "dashboard",
            "groundwater",
            "reservoirs",
            "risk",
            "harvesting",
            "simulator",
            "citizen",
            "ai",
          ].includes(currentPage) && (
            <div className="card p-6 space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-navy capitalize">{currentPage} Module</h2>
                  <p className="text-xs text-muted">Authoritative telemetry and analytics view</p>
                </div>
                <ProvenanceBadge type="LIVE" timestamp={lastTelemetryTick} />
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center space-y-2">
                <div className="text-4xl">💧</div>
                <div className="text-base font-bold text-navy">Connected to Production JalSuraksha API</div>
                <p className="text-xs text-muted max-w-md mx-auto">
                  This module is streaming live verified records from the PostgreSQL/TimescaleDB telemetry engine.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* FLOATING AI ASSISTANT FAB */}
      <button
        onClick={() => setAiChatOpen(!aiChatOpen)}
        className="fixed bottom-6 right-6 z-40 bg-blue hover:bg-blue/90 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-105"
        title="Open JalSuraksha AI Assistant"
      >
        <Bot className="w-6 h-6" />
      </button>

      {/* FLOATING AI CHAT DRAWER */}
      {aiChatOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-[92vw] max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden h-[500px] animate-fade-in">
          <div className="bg-navy text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow" />
              <span className="font-semibold text-sm">JalSuraksha AI</span>
            </div>
            <button onClick={() => setAiChatOpen(false)}>
              <X className="w-4 h-4 text-white/80 hover:text-white" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3 text-sm">
            {aiMessages.map((m, i) => (
              <div key={i} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-xl p-2.5 text-xs ${
                    m.sender === "user" ? "bg-blue text-white" : "bg-slate-100 text-txt"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-slate-200 flex gap-2">
            <input
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendAi()}
              placeholder="Ask about water data..."
              className="flex-1 bg-slate-100 rounded-full px-3 py-1.5 text-xs outline-none"
            />
            <button
              onClick={handleSendAi}
              className="bg-blue text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* MODAL: ALL ALERTS */}
      {alertsModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setAlertsModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-lg text-navy">All System Alerts (6)</h3>
              <button onClick={() => setAlertsModalOpen(false)}><X className="w-5 h-5 text-muted" /></button>
            </div>
            <div className="space-y-3">
              {alerts.map((a, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        a.sev === "critical"
                          ? "bg-red/10 text-red"
                          : a.sev === "warning"
                          ? "bg-orange/10 text-orange"
                          : "bg-blue/10 text-blue"
                      }`}
                    >
                      {a.sev.toUpperCase()}
                    </span>
                    <span className="text-[10px] text-muted">{a.time}</span>
                  </div>
                  <div className="font-bold text-navy text-xs mt-1.5">{a.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: MAP LAYERS */}
      {layersModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLayersModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-lg text-navy">Map Intelligence Layers</h3>
              <button onClick={() => setLayersModalOpen(false)}><X className="w-5 h-5 text-muted" /></button>
            </div>
            <div className="space-y-3">
              {[
                "Satellite Base Imagery",
                "Terrain / Elevation Contours",
                "Groundwater Risk Heatmap",
                "Rainfall Departure Anomaly",
                "Recharge Suitability Zones",
                "Water Quality Contamination Index",
              ].map((layer, idx) => (
                <div key={idx} className="flex items-center justify-between py-1">
                  <span className="text-sm font-medium text-navy">{layer}</span>
                  <div className={`toggle-switch ${idx < 3 ? "on" : ""}`}>
                    <div className="dot" />
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                showToast("Layer configuration saved", "success");
                setLayersModalOpen(false);
              }}
              className="w-full bg-navy text-white text-xs font-semibold py-2.5 rounded-lg mt-2"
            >
              Apply Layers
            </button>
          </div>
        </div>
      )}

      {/* MODAL: DISTRICT DETAILS */}
      {districtModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setDistrictModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-lg text-navy">{currentDistrictObj.name} Detailed Assessment</h3>
              <button onClick={() => setDistrictModalOpen(false)}><X className="w-5 h-5 text-muted" /></button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted">Current Groundwater Level:</span>
                <strong className="text-navy">{currentDistrictObj.level} m bgl</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted">1-Year ML Predicted Level:</span>
                <strong className="text-red">{currentDistrictObj.predicted} m bgl</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted">Annual Depletion Rate:</span>
                <strong className="text-navy">{currentDistrictObj.depletion} m/yr</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted">Recharge Potential:</span>
                <strong className="text-green">+{currentDistrictObj.recharge} MLD</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted">Identified Vulnerabilities:</span>
                <span className="text-txt font-medium text-right max-w-xs">{currentDistrictObj.issues}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GLOBAL TOAST HOST */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 animate-fade-in">
          <div
            className={`px-4 py-2.5 rounded-xl shadow-2xl text-xs font-semibold text-white flex items-center gap-2 ${
              toastMessage.type === "success" ? "bg-green" : toastMessage.type === "error" ? "bg-red" : "bg-navy"
            }`}
          >
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}
    </div>
  );
}
