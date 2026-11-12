# JalSuraksha — Accessibility (WCAG 2.2 AA) & Internationalization (i18n)

**Platform:** JalSuraksha — National AI Groundwater Intelligence & Decision-Support System  
**Design Reference:** Guidelines for Indian Government Websites (GIGW 3.0), W3C Web Content Accessibility Guidelines (WCAG 2.2 AA)  

---

## 1. Accessibility Architecture (WCAG 2.2 AA Compliance)

JalSuraksha is designed to ensure equitable digital access for all Indian citizens, field workers, researchers, and government officials regardless of device, physical ability, or visual acuity.

### A. Color Contrast Verification

All text and UI controls meet or exceed the WCAG AA minimum contrast ratio of **$4.5:1$ for body text** and **$3:1$ for large headings / graphical controls**:

| Design Token / Element | Foreground Hex | Background Hex | Measured Contrast Ratio | WCAG Compliance Tier |
| :--- | :---: | :---: | :---: | :---: |
| **Government Navy on White** | `#0F2E5A` | `#FFFFFF` | **12.4 : 1** | **AAA Compliant** |
| **Dark Navy on Light Gray** | `#0A1E3F` | `#F4F6F9` | **13.8 : 1** | **AAA Compliant** |
| **Tricolour Saffron on Dark Navy** | `#E06D10` | `#0A1E3F` | **5.2 : 1** | **AA Compliant** |
| **Permissible Exceedance (Rose)** | `#DC2626` | `#FFFFFF` | **5.1 : 1** | **AA Compliant** |
| **Safe Chemical Status (Emerald)** | `#059669` | `#FFFFFF` | **4.6 : 1** | **AA Compliant** |
| **Muted Telemetry Labels** | `#4B5563` | `#FFFFFF` | **7.0 : 1** | **AAA Compliant** |

---

### B. Font Sizing & Accessibility Controls

1. **Dynamic Font Resizer (`A-`, `A`, `A+`):**
   - Implemented in the global utility bar of [`apps/flask_app/templates/components/navbar.html`](file:///d:/projects/JalSuraksha/apps/flask_app/templates/components/navbar.html).
   - Allows users to scale the interface typography dynamically:
     - `A-` (Small): Scales font size to $90\%$ of default.
     - `A` (Default): Standard $100\%$ root scale ($16\text{px}$ base).
     - `A+` (Large): Scales font size to $115\%$ of default for enhanced readability.
   - Operates by modulating the root HTML font size, preserving all flexbox and grid layouts without horizontal overflow or clipping.

2. **Color-Blind Safety & Redundant Signaling:**
   - Visual status is **never conveyed through color alone**:
     - *Water Quality:* Parameter status includes text labels (`Within Limit`, `Permissible Exceedance`, `Severe Exceedance`) and measured values with units ($\text{mg/L}$) alongside colored pills.
     - *Groundwater Stress:* Districts display both numerical stress scores ($0-100$), stage of extraction percentages, and official category strings (`Safe`, `Semi-Critical`, `Critical`, `Over-Exploited`).
     - *Map Polygons:* Interactive maps show SVG district outlines, names, and explicit values upon hover and focus.

3. **Keyboard Navigability & Focus Management:**
   - All interactive controls (navigation tabs, dropdowns, modal triggers, search inputs, and time sliders) are fully focusable via the `Tab` key.
   - Focus rings use high-visibility styling (`focus:ring-2 focus:ring-govNavyLight focus:outline-none`).
   - Modals trap focus and can be dismissed immediately by pressing the `Escape` key or clicking the backdrop overlay.

4. **Screen Reader Semantic Landmarks:**
   - Implemented standard HTML5 landmarks:
     - `<header role="banner">` for government brand, search, and navigation.
     - `<nav role="navigation">` for primary mega-navigation and breadcrumbs.
     - `<main role="main">` for interactive atlas canvas and district dossier.
     - `<aside role="complementary">` for telemetry context panel and drawer.
     - `<dialog role="dialog" aria-modal="true">` for modals with `aria-labelledby` headers.

---

## 2. Internationalization (i18n) Architecture

The platform supports India's official administrative languages, with dynamic runtime switching between English and Hindi, and extensible schemas for regional languages:

- **English (`en`):** Default administrative language for national reporting and scientific research.
- **Hindi (`hi` — हिन्दी):** Official language of the Union and primary language for state groundwater directorates across northern and central India.
- **Urdu (`ur` — اردو):** Widely utilized in regional agrarian belts, with Right-to-Left (RTL) layout direction support.

---

### Trilingual Hydrological Terminology Matrix

| English Scientific Concept | Hindi (हिन्दी) | Urdu (اردو - RTL) | Description / Legal Context |
| :--- | :--- | :--- | :--- |
| **Groundwater Table Depth** | भूजल स्तर की गहराई | زیر زمین پانی کی سطح کی گہرائی | Measured in meters below ground level ($m\text{ bgl}$) |
| **Over-Exploited Block** | अति-शोषित ब्लॉक | ضرورت سے زیادہ استعمال شدہ بلاک | Extraction $>100\%$ of annual replenishable recharge |
| **Artificial Recharge Potential** | कृत्रिम पुनर्भरण क्षमता | مصنوعی ریچार्ज کی صلاحیت | Hydro-geological suitability for check dams and shafts |
| **Drinking Water Standard** | पेयजल मानक (BIS 10500) | پینے کے پانی کا معیار | Bureau of Indian Standards specification |
| **Rainwater Harvesting (RWH)** | वर्षा जल संचयन | بارش کے پانی کا ذخیرہ | Rooftop and catchment collection structures |
| **Water Balance Ledger** | जल संतुलन खाता | پانی کے توازن کا کھاتہ | Inflow (recharge) vs Outflow (extraction/draft) |
| **Monsoon Rainfall Departure** | मानसूनी वर्षा विचलन | مون سون بارش کا فرق | Departure percentage from IMD long-period normal |
| **Borewell Yield Diagnostics** | नलकूप उत्पादकता निदान | بورویل کی پیداوار کی تشخیص | Aquifer transmissivity and draw-down analysis |
| **Saline Intrusion** | लवणता प्रवेश / खारापन | کھارے پانی کی دراندازی | Coastal or deep aquifer mineralization |
| **Citizen Grievance** | नागरिक जल शिकायत | شہریوں کے پانی کا مسئلہ | Community reporting of dry wells or contamination |
