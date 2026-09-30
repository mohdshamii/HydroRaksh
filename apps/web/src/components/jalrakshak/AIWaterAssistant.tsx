"use client";

import React, { useState } from "react";
import { DistrictWaterEntity, UP_75_WATER_DISTRICTS } from "@/data/up-75-districts";
import { Bot, Send, Sparkles, User, HelpCircle, Shield, Droplets, ArrowRight } from "lucide-react";

interface AIWaterAssistantProps {
  district: DistrictWaterEntity;
}

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  suggestedAction?: string;
}

export function AIWaterAssistant({ district }: AIWaterAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-1",
      sender: "ai",
      text: `Hello! I am JalRakshak Copilot, your AI Groundwater & Water Resource Intelligence Assistant. Currently analyzing **${district.name}** (${district.modernWaterMetrics.cgwbCategory}, ${district.modernWaterMetrics.groundwaterDepthM}m bgl depth, ${district.soilType}). How can I assist your groundwater planning or research today?`,
      timestamp: "Just Now",
    },
  ]);
  const [inputQuery, setInputQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const promptChips = [
    `How to stop overdraft in ${district.name}?`,
    `What recharge structure is best for ${district.soilType}?`,
    `What is the PMKSY subsidy for drip irrigation in UP?`,
    `Explain CGWB BIS 10500 standards for drinking water.`,
    `Calculate RWH potential for a 200 m² rooftop.`,
  ];

  const generateAnswer = (query: string): string => {
    const q = query.toLowerCase();
    const isHardRock = district.soilType.toLowerCase().includes("rock") || district.soilType.toLowerCase().includes("granit");

    if (q.includes("overdraft") || q.includes("stop") || q.includes("deplet")) {
      return `### Action Plan for Groundwater Recovery in ${district.name}:
1. **Extraction Regulation**: ${district.name} is currently categorized as **${district.modernWaterMetrics.cgwbCategory}** with an extraction stage of **${district.modernWaterMetrics.cgwbStageExtractionPct}%**. Under the *UP Ground Water Act 2020*, non-domestic bulk extraction requires digital flowmeters and mandatory recharge structures.
2. **Crop Diversification**: Shifting 20% of sugarcane/paddy acreage to pulses (Moong/Urad) and mustard saves ~180 MCM of annual aquifer draft.
3. **Artificial Recharge**: Implement deep injection wells with silt traps in sandy alluvium, or check dams in high slope runoff corridors.
4. **Water Footprint Reduction**: Target 100% adoption of micro-irrigation (drip/sprinkler) under PMKSY with state 55% subsidy.`;
    }

    if (q.includes("recharge structure") || q.includes("soil") || q.includes("best")) {
      if (isHardRock) {
        return `### Recharge Engineering for ${district.soilType}:
In **hard rock crystalline granitic terrain** (typical of Bundelkhand), groundwater occurs in shallow weathered zones and secondary joint fractures:
- **Primary Structure**: Masonry Check Dams & Nala Bunds on 1st/2nd order seasonal streams (Unit Cost: ~₹3.8L, Capacity: ~9,200 m³/yr).
- **Secondary Structure**: Farm Ponds / Village Amrit Sarovars with silt traps.
- **Avoid**: Deep tube-well injection without fracture mapping (causes hydraulic bypass).`;
      } else {
        return `### Recharge Engineering for ${district.soilType}:
In **deep Indo-Gangetic alluvium** with permeable sand and silt layers:
- **Primary Structure**: Deep Injection / Recharge Wells penetrating the unconfined aquifer layer (Unit Cost: ~₹85,000, Annual Capacity: ~1,250 m³).
- **Secondary Structure**: Multi-layer graded sand-gravel filter pits for institutional and residential campuses (Cost: ~₹35,000).
- **Community Scale**: Desilting of village percolation ponds (Amrit Sarovar).`;
      }
    }

    if (q.includes("subsidy") || q.includes("pmksy") || q.includes("irrigation") || q.includes("drip")) {
      return `### Pradhan Mantri Krishi Sinchayee Yojana (PMKSY) in Uttar Pradesh:
- **Small & Marginal Farmers**: Up to **55% capital subsidy** on drip and micro-sprinkler installations.
- **Other Farmers**: Up to **45% subsidy**.
- **Water Savings**: Reduces agricultural tubewell draft by **40% to 60%** compared to traditional flood irrigation.
- **Yield Enhancement**: Fertilizer efficiency increases by 25-30% via fertigation.
- **Payback Period**: Typically achieved within **1.8 to 2.4 crop seasons**.`;
    }

    if (q.includes("bis") || q.includes("quality") || q.includes("fluoride") || q.includes("standard")) {
      return `### BIS 10500:2012 Drinking Water Standards Summary:
- **Total Dissolved Solids (TDS)**: Desirable limit 500 mg/L; Permissible limit in absence of alternate source is 2,000 mg/L.
- **Fluoride (F)**: Max limit **1.0 to 1.5 mg/L**. (Excess causes dental & skeletal fluorosis).
- **Nitrate (NO3)**: Max limit **45 mg/L**. (High nitrate from excessive urea fertilizer causes Methemoglobinemia / Blue Baby Syndrome).
- **Arsenic (As)**: Max limit **0.01 mg/L** (Strict toxic heavy metal limit).
- **pH**: 6.5 to 8.5.`;
    }

    if (q.includes("rwh") || q.includes("rooftop") || q.includes("potential")) {
      const annualRainfallM = district.modernWaterMetrics.avgRainfallMm / 1000;
      const sampleHarvestLitres = Math.round(200 * annualRainfallM * 0.85 * 1000);
      return `### Rooftop Rainwater Harvesting Estimation for 200 m² Roof in ${district.name}:
- **Annual Rainfall**: ${district.modernWaterMetrics.avgRainfallMm} mm
- **Runoff Coefficient**: 0.85 (Concrete slab)
- **Annual Harvestable Yield**: **${sampleHarvestLitres.toLocaleString()} Litres / year** (~${(sampleHarvestLitres / 1000).toFixed(1)} m³/yr)
- **Domestic Offset**: Meets 100% of non-potable flushing & gardening requirements for a family of 5 for 210+ days!
- **Estimated System Cost**: ₹48,000 to ₹55,000 with multi-stage sand filter and storage sump.`;
    }

    return `Based on hydrological telemetry for **${district.name}** (Aquifer Depth: ${district.modernWaterMetrics.groundwaterDepthM}m bgl, Rainfall: ${district.modernWaterMetrics.avgRainfallMm}mm/yr, CGWB Stage: ${district.modernWaterMetrics.cgwbStageExtractionPct}%):
1. **Recharge Suitability**: Rated at **${district.rechargeSuitabilityScore}/100** under AI spatial modeling.
2. **Key Challenge**: High agricultural extraction (${district.modernWaterMetrics.annualDemandMcm} MCM demand).
3. **Recommendation**: Combine artificial recharge structures with community water budgeting and PMKSY micro-irrigation.
Feel free to ask for specific budget calculations, crop calendars, or technical CAD parameters!`;
  };

  const handleSend = (textToSend?: string) => {
    const q = textToSend || inputQuery;
    if (!q.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: q,
      timestamp: "Just Now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setIsTyping(true);

    setTimeout(() => {
      const responseText = generateAnswer(q);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: responseText,
        timestamp: "Just Now",
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 450);
  };

  return (
    <div className="space-y-4 text-atlas-text flex flex-col h-[560px]">
      {/* Header */}
      <div className="p-3.5 rounded-2xl bg-atlas-elevated/40 border border-atlas-border flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-serif font-bold text-atlas-text">
              JalRakshak AI — Domain Intelligence Copilot
            </h3>
            <p className="text-[11px] text-atlas-muted">
              Trained on CGWB, Atal Bhujal Yojana, BIS 10500 & UP Groundwater Department data
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
          ● Online • Focus: {district.name}
        </span>
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 overflow-y-auto space-y-3 p-3 rounded-2xl bg-atlas-canvas border border-atlas-border">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex gap-2.5 max-w-[85%] ${
              m.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
            }`}
          >
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                m.sender === "user"
                  ? "bg-saffron text-slate-900"
                  : "bg-emerald-600 text-white shadow-glow"
              }`}
            >
              {m.sender === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>

            <div
              className={`p-3 rounded-2xl text-xs space-y-1.5 leading-relaxed ${
                m.sender === "user"
                  ? "bg-saffron/15 border border-saffron/30 text-atlas-text"
                  : "bg-atlas-card border border-atlas-border text-atlas-text shadow-sm"
              }`}
            >
              <div className="whitespace-pre-line prose prose-sm dark:prose-invert max-w-none text-xs">
                {m.text}
              </div>
              <div className="text-[9px] text-atlas-faint text-right">{m.timestamp}</div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-atlas-muted p-2">
            <Bot className="w-3.5 h-3.5 animate-spin text-emerald-500" />
            <span>JalRakshak Copilot is analyzing hydrogeological parameters...</span>
          </div>
        )}
      </div>

      {/* Suggested Prompt Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 text-[11px]">
        <span className="text-atlas-muted flex items-center gap-1 font-semibold flex-shrink-0 text-[10px]">
          <Sparkles className="w-3 h-3 text-saffron" />
          Ask:
        </span>
        {promptChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(chip)}
            className="whitespace-nowrap px-2.5 py-1 rounded-full bg-atlas-elevated hover:bg-atlas-elevated/80 border border-atlas-border text-atlas-text transition hover:border-emerald-500/50 flex-shrink-0"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2"
      >
        <input
          type="text"
          placeholder={`Ask anything about groundwater, recharge, or policies in ${district.name}...`}
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          className="flex-1 py-2 px-3.5 rounded-xl bg-atlas-card border border-atlas-border text-xs text-atlas-text placeholder:text-atlas-faint focus:outline-none focus:ring-1 focus:ring-emerald-400"
        />
        <button
          type="submit"
          disabled={!inputQuery.trim()}
          className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold transition shadow-glow"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
