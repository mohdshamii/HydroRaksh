/**
 * JalSuraksha (HydroRaksh) Core Application State & UI Dispatch Engine
 * Replaces TypeScript/React state with a lightweight, zero-dependency, ultra-fast client.
 */

window.JalSuraksha = (function() {
  // Global Application State
  const state = {
    currentYear: 2026,
    selectedStateCode: "UP",
    selectedDistrictId: "agra",
    viewMode: "water", // 'water' (Stress Heatmap) or 'recharge' (Recharge Suitability)
    showRivers: true,
    showHotspots: true,
    showIoTSensors: true,
    isColorBlindMode: false,
    theme: "dark",
    isPlayingTime: false,
    playSpeed: 1, // 1x, 2x, 5x
    playInterval: null,
    districts: [],
    states: [],
    sources: []
  };

  function init(initialData) {
    state.districts = initialData.districts || [];
    state.states = initialData.states || [];
    state.sources = initialData.sources || [];

    // Parse URL params
    const params = new URLSearchParams(window.location.search);
    const yr = parseInt(params.get("year"));
    if (!isNaN(yr) && yr >= 2000 && yr <= 2035) state.currentYear = yr;
    const sc = params.get("state");
    if (sc) state.selectedStateCode = sc.toUpperCase();
    const reg = params.get("region");
    if (reg) {
      state.selectedDistrictId = reg.toLowerCase();
    } else if (state.districts && state.districts.length > 0) {
      state.selectedDistrictId = state.districts[0].id.toLowerCase();
    }
    // Verify selected district belongs to loaded districts
    if (state.districts && state.districts.length > 0) {
      const match = state.districts.find(d => d.id.toLowerCase() === state.selectedDistrictId);
      if (!match) {
        state.selectedDistrictId = state.districts[0].id.toLowerCase();
      }
    }
    const mode = params.get("mode");
    if (mode === "water" || mode === "recharge") state.viewMode = mode;

    // Load Theme Preference
    const urlTheme = params.get("theme");
    const savedTheme = localStorage.getItem("jalsuraksha_theme");
    if (urlTheme === "light" || urlTheme === "dark") {
      state.theme = urlTheme;
      localStorage.setItem("jalsuraksha_theme", urlTheme);
    } else if (savedTheme === "light" || savedTheme === "dark") {
      state.theme = savedTheme;
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
      state.theme = "light";
    }
    applyTheme(state.theme);

    // Initial render
    updateNavbarUI();
    if (window.JalMap) window.JalMap.render();
    updateContextPanel();
    updateTimeSliderUI();

    // Bind event listeners
    bindEvents();
    if (window.lucide) window.lucide.createIcons();
  }

  function applyTheme(themeName) {
    state.theme = themeName;
    document.documentElement.setAttribute("data-theme", themeName);
    if (themeName === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    }
    try { localStorage.setItem("jalsuraksha_theme", themeName); } catch (e) {}
    
    // Update theme button icon
    const themeIcon = document.getElementById("themeToggleIcon");
    if (themeIcon) {
      themeIcon.setAttribute("data-lucide", themeName === "dark" ? "sun" : "moon");
      if (window.lucide) window.lucide.createIcons();
    }
  }

  function toggleTheme() {
    applyTheme(state.theme === "dark" ? "light" : "dark");
    if (window.JalMap) window.JalMap.updateDistrictColors();
  }

  function syncURL() {
    const params = new URLSearchParams();
    params.set("year", state.currentYear);
    params.set("state", state.selectedStateCode);
    params.set("region", state.selectedDistrictId);
    params.set("mode", state.viewMode);
    window.history.replaceState(null, "", "?" + params.toString());
  }

  function setSelectedState(code) {
    state.selectedStateCode = code.toUpperCase();
    // Fetch state districts if not UP
    if (state.selectedStateCode === "UP") {
      fetch("/api/v1/geography/districts?state_code=IN-UP")
        .then(res => res.json())
        .then(data => {
          // Keep UP local rich data
          window.location.href = `/?state=UP&year=${state.currentYear}&mode=${state.viewMode}`;
        });
    } else {
      window.location.href = `/?state=${state.selectedStateCode}&year=${state.currentYear}&mode=${state.viewMode}`;
    }
  }

  function setSelectedDistrict(distId) {
    state.selectedDistrictId = distId.toLowerCase();
    syncURL();
    if (window.JalMap) window.JalMap.highlightDistrict(distId);
    updateContextPanel();
    updateNavbarUI();
  }

  function setCurrentYear(year) {
    state.currentYear = parseInt(year);
    syncURL();
    updateTimeSliderUI();
    if (window.JalMap) window.JalMap.updateDistrictColors();
    updateContextPanel();
  }

  function setViewMode(mode) {
    state.viewMode = mode;
    syncURL();
    updateNavbarUI();
    if (window.JalMap) window.JalMap.updateDistrictColors();
  }

  function getSelectedDistrictData() {
    return state.districts.find(d => d.id.toLowerCase() === state.selectedDistrictId) || state.districts[0];
  }

  function updateNavbarUI() {
    // Mode buttons
    const btnWater = document.getElementById("btnViewModeWater");
    const btnRecharge = document.getElementById("btnViewModeRecharge");
    if (btnWater && btnRecharge) {
      if (state.viewMode === "water") {
        btnWater.className = "flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-rose-600 text-white shadow";
        btnRecharge.className = "flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium text-atlas-muted hover:text-atlas-text";
      } else {
        btnWater.className = "flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium text-atlas-muted hover:text-atlas-text";
        btnRecharge.className = "flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-600 text-white shadow";
      }
    }

    // Year display in navbar
    const navYearSpan = document.getElementById("navYearDisplay");
    const navYearBadge = document.getElementById("navYearBadge");
    if (navYearSpan) navYearSpan.textContent = state.currentYear;
    if (navYearBadge) {
      if (state.currentYear < 2026) {
        navYearBadge.textContent = "Hist";
        navYearBadge.className = "text-[9px] px-1 py-0.2 rounded uppercase font-bold border bg-amber-500/15 text-amber-400 border-amber-500/30";
      } else if (state.currentYear === 2026) {
        navYearBadge.textContent = "Live";
        navYearBadge.className = "text-[9px] px-1 py-0.2 rounded uppercase font-bold border bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
      } else {
        navYearBadge.textContent = "AI";
        navYearBadge.className = "text-[9px] px-1 py-0.2 rounded uppercase font-bold border bg-purple-500/15 text-purple-400 border-purple-500/30";
      }
    }

    // Dynamic document title
    const d = getSelectedDistrictData();
    if (d) {
      const stateObj = state.states.find(s => s.code === state.selectedStateCode) || { name: "Uttar Pradesh" };
      const stress = d.modernWaterMetrics ? (d.modernWaterMetrics.waterStressScore || 65) : 65;
      document.title = `${d.name} (${stateObj.name}) • ${state.currentYear} Water Stress ${stress}/100 • JalSuraksha Pan-India`;
    }
  }

  function updateContextPanel() {
    const d = getSelectedDistrictData();
    if (!d) return;

    // Update Dossier Header
    const titleEl = document.getElementById("dossierDistrictName");
    const divEl = document.getElementById("dossierDivision");
    const regEl = document.getElementById("dossierRegion");
    const areaEl = document.getElementById("dossierArea");

    if (titleEl) titleEl.textContent = d.name;
    if (divEl) divEl.textContent = (d.division || "Central") + " Division";
    if (regEl) regEl.textContent = d.region || "Territory";
    if (areaEl) areaEl.textContent = (d.areaKm2 ? d.areaKm2.toLocaleString() : "—") + " km²";

    // Temporal point for current year
    const trajectory = d.temporalTrajectory || [];
    let pt = trajectory.find(t => t.year === state.currentYear);
    if (!pt && trajectory.length > 0) pt = trajectory[trajectory.length - 1];
    if (!pt) {
      pt = {
        year: state.currentYear,
        depth_m: d.modernWaterMetrics ? d.modernWaterMetrics.groundwaterDepthM : 14.5,
        stress_score: d.modernWaterMetrics ? d.modernWaterMetrics.waterStressScore : 65,
        category: d.modernWaterMetrics ? d.modernWaterMetrics.cgwbCategory : "Semi-Critical"
      };
    }

    // Health Tab metrics
    const depthEl = document.getElementById("dossierDepthVal");
    const stressEl = document.getElementById("dossierStressVal");
    const catEl = document.getElementById("dossierCategoryBadge");
    const trendEl = document.getElementById("dossierTrendVal");
    const rainEl = document.getElementById("dossierRainVal");
    const stageEl = document.getElementById("dossierStageVal");

    if (depthEl) depthEl.textContent = pt.depth_m + " m bgl";
    if (stressEl) stressEl.textContent = pt.stress_score + "/100";
    if (catEl) {
      catEl.textContent = pt.category;
      catEl.className = "text-[11px] font-bold px-2 py-0.5 rounded-md uppercase " + getCategoryBadgeClass(pt.category);
    }
    if (trendEl && d.modernWaterMetrics) trendEl.textContent = d.modernWaterMetrics.groundwaterTrendAnnualCm + " cm/yr";
    if (rainEl && d.modernWaterMetrics) rainEl.textContent = (d.modernWaterMetrics.rainfallDeparturePct >= 0 ? "+" : "") + d.modernWaterMetrics.rainfallDeparturePct + "%";
    if (stageEl && d.modernWaterMetrics) stageEl.textContent = d.modernWaterMetrics.cgwbStageExtractionPct + "%";

    // Recharge Tab metrics
    const suitEl = document.getElementById("dossierRechargeScore");
    const soilEl = document.getElementById("dossierSoilType");
    if (suitEl) suitEl.textContent = (d.rechargeSuitabilityScore || 75) + "/100";
    if (soilEl) soilEl.textContent = d.soilType || "Alluvial Silt Loam";

    // Water Quality Tab metrics
    const wq = d.waterQuality || {};
    const wqiEl = document.getElementById("dossierWQIVal");
    const phEl = document.getElementById("dossierPHVal");
    const tdsEl = document.getElementById("dossierTDSVal");
    const ecEl = document.getElementById("dossierECVal");
    const fEl = document.getElementById("dossierFluorideVal");
    const asEl = document.getElementById("dossierArsenicVal");
    const no3El = document.getElementById("dossierNitrateVal");

    if (wqiEl) wqiEl.textContent = (wq.wqi || 76) + " (" + (wq.status || "Moderate") + ")";
    if (phEl) phEl.textContent = wq.ph || "7.4";
    if (tdsEl) tdsEl.textContent = (wq.tdsMgL || "450") + " mg/L";
    if (ecEl) ecEl.textContent = (wq.ecUsCm || "720") + " µS/cm";
    if (fEl) fEl.textContent = (wq.fluorideMgL || "0.85") + " mg/L";
    if (asEl) asEl.textContent = (wq.arsenicMgL || "0.003") + " mg/L";
    if (no3El) no3El.textContent = (wq.nitrateMgL || "26.4") + " mg/L";

    // Borewell Tab metrics
    const bw = d.borewellData || {};
    const failRateEl = document.getElementById("dossierBwFailRate");
    const casingRiskEl = document.getElementById("dossierBwCasingRisk");
    const drillDepthEl = document.getElementById("dossierBwDrillDepth");
    const causeEl = document.getElementById("dossierBwCause");

    if (failRateEl) failRateEl.textContent = (bw.failureRatePct || 14.2) + "%";
    if (casingRiskEl) casingRiskEl.textContent = (bw.casingFailureRiskPct || 48.0) + "%";
    if (drillDepthEl) drillDepthEl.textContent = (bw.avgFailureDepthM ? Math.round(bw.avgFailureDepthM + 25) : 65) + " m";
    if (causeEl) causeEl.textContent = bw.predominantCause || "Unconfined sand dewatering dry-run";

    // Render sparkline trend if Chart is available
    renderTrendSparkline(d);
  }

  function getCategoryBadgeClass(category) {
    if (!category) return "bg-amber-500/15 text-amber-400 border border-amber-500/30";
    const c = category.toLowerCase();
    if (c.includes("over")) return "bg-red-500/15 text-red-500 border border-red-500/30";
    if (c.includes("critical") && !c.includes("semi")) return "bg-orange-500/15 text-orange-400 border border-orange-500/30";
    if (c.includes("semi")) return "bg-amber-500/15 text-amber-400 border border-amber-500/30";
    return "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30";
  }

  let sparklineChart = null;
  function renderTrendSparkline(district) {
    const canvas = document.getElementById("dossierSparklineCanvas");
    if (!canvas || !window.Chart) return;

    const traj = district.temporalTrajectory || [];
    const labels = traj.map(t => t.year);
    const data = traj.map(t => t.depth_m);

    if (sparklineChart) {
      sparklineChart.destroy();
    }

    const ctx = canvas.getContext("2d");
    sparklineChart = new window.Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [{
          data: data,
          borderColor: "#f59e0b",
          backgroundColor: "rgba(245, 158, 11, 0.12)",
          fill: true,
          tension: 0.35,
          pointRadius: 2,
          pointHoverRadius: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: true } },
        scales: {
          x: { display: true, grid: { display: false }, ticks: { font: { size: 9 }, color: "#64748b" } },
          y: { display: true, reverse: true, grid: { color: "rgba(255,255,255,0.05)" }, ticks: { font: { size: 9 }, color: "#64748b" } }
        }
      }
    });
  }

  function updateTimeSliderUI() {
    const slider = document.getElementById("timeSliderInput");
    const valSpan = document.getElementById("timeSliderCurrentYear");
    if (slider) slider.value = state.currentYear;
    if (valSpan) valSpan.textContent = state.currentYear;
  }

  function togglePlayTime() {
    state.isPlayingTime = !state.isPlayingTime;
    const playBtnIcon = document.getElementById("timePlayBtnIcon");

    if (state.isPlayingTime) {
      if (playBtnIcon) {
        playBtnIcon.setAttribute("data-lucide", "pause");
        if (window.lucide) window.lucide.createIcons();
      }
      const delay = Math.round(1200 / state.playSpeed);
      state.playInterval = setInterval(() => {
        let nextYr = state.currentYear + 1;
        if (nextYr > 2035) nextYr = 2000;
        setCurrentYear(nextYr);
      }, delay);
    } else {
      if (playBtnIcon) {
        playBtnIcon.setAttribute("data-lucide", "play");
        if (window.lucide) window.lucide.createIcons();
      }
      if (state.playInterval) clearInterval(state.playInterval);
    }
  }

  function setPlaySpeed(speed) {
    state.playSpeed = speed;
    if (state.isPlayingTime) {
      clearInterval(state.playInterval);
      const delay = Math.round(1200 / state.playSpeed);
      state.playInterval = setInterval(() => {
        let nextYr = state.currentYear + 1;
        if (nextYr > 2035) nextYr = 2000;
        setCurrentYear(nextYr);
      }, delay);
    }
    // Update active speed button style
    [1, 2, 5].forEach(s => {
      const btn = document.getElementById(`speedBtn${s}x`);
      if (btn) {
        if (s === speed) {
          btn.className = "px-2 py-0.5 rounded text-[10px] font-bold bg-saffron text-slate-900";
        } else {
          btn.className = "px-2 py-0.5 rounded text-[10px] font-semibold text-atlas-muted hover:text-atlas-text";
        }
      }
    });
  }

  function resolveModalId(modalId) {
    if (modalId === "ownerModal") return "ownerProfileModal";
    return modalId;
  }

  function openModal(modalId) {
    const id = resolveModalId(modalId);
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
      if (window.lucide) window.lucide.createIcons();
    }
  }

  function closeModal(modalId) {
    const id = resolveModalId(modalId);
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }
  }

  function toggleModal(modalId, forceOpen) {
    const id = resolveModalId(modalId);
    const modal = document.getElementById(id);
    if (!modal) return;
    if (forceOpen === true) {
      openModal(id);
    } else if (forceOpen === false) {
      closeModal(id);
    } else {
      if (modal.classList.contains("hidden")) {
        openModal(id);
      } else {
        closeModal(id);
      }
    }
  }

  function bindEvents() {
    // Search Autocomplete
    const searchInput = document.getElementById("globalDistrictSearch");
    const searchDropdown = document.getElementById("searchDropdownResults");

    if (searchInput && searchDropdown) {
      searchInput.addEventListener("input", function(e) {
        const q = e.target.value.trim().toLowerCase();
        if (!q) {
          searchDropdown.classList.add("hidden");
          return;
        }

        const matches = state.districts.filter(d => 
          d.name.toLowerCase().includes(q) ||
          (d.division && d.division.toLowerCase().includes(q)) ||
          (d.modernWaterMetrics && d.modernWaterMetrics.majorRiverBasin && d.modernWaterMetrics.majorRiverBasin.toLowerCase().includes(q))
        ).slice(0, 8);

        if (matches.length === 0) {
          searchDropdown.classList.add("hidden");
          return;
        }

        searchDropdown.innerHTML = matches.map(d => `
          <button onclick="window.JalSuraksha.setSelectedDistrict('${d.id}'); document.getElementById('searchDropdownResults').classList.add('hidden');"
            class="w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-atlas-elevated text-atlas-text border-b border-atlas-border/50 last:border-0">
            <div>
              <span class="font-semibold text-emerald-400">${d.name}</span>
              <span class="text-atlas-muted ml-2 text-[11px]">(${d.division || "Central"} Division)</span>
            </div>
            <span class="text-[10px] font-mono text-saffron">
              Stress: ${d.modernWaterMetrics ? d.modernWaterMetrics.waterStressScore : 65}/100
            </span>
          </button>
        `).join("");

        searchDropdown.classList.remove("hidden");
      });

      document.addEventListener("click", function(e) {
        if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
          searchDropdown.classList.add("hidden");
        }
      });
    }

    // Time Slider input event
    const timeInput = document.getElementById("timeSliderInput");
    if (timeInput) {
      timeInput.addEventListener("input", function(e) {
        setCurrentYear(e.target.value);
      });
    }
  }

  function toggleMobileMenu() {
    const el = document.getElementById("navbarMobileMenu");
    if (!el) return;
    el.classList.toggle("hidden");
    if (window.lucide) window.lucide.createIcons();
  }

  return {
    state,
    init,
    toggleTheme,
    setSelectedState,
    setSelectedDistrict,
    setCurrentYear,
    setViewMode,
    togglePlayTime,
    setPlaySpeed,
    openModal,
    closeModal,
    toggleModal,
    toggleMobileMenu,
    updateContextPanel
  };
})();
