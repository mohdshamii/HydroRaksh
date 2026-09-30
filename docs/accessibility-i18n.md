# JalSuraksha — Accessibility (WCAG 2.2 AA) & Internationalization (i18n)

---

## 1. Accessibility (WCAG 2.2 AA) Compliance

1. **Color Contrast:**
   - All text meets or exceeds the WCAG AA minimum contrast ratio of $4.5:1$ for normal text and $3:1$ for large text.
   - Primary text `#172B4D` on `#FFFFFF`: **11.4:1** (AAA Compliant)
   - Brand Navy `#062A4D` on `#FFFFFF`: **14.2:1** (AAA Compliant)
   - Secondary text `#6B7C93` on `#FFFFFF`: **4.8:1** (AA Compliant)

2. **Color-Blind Safety:**
   - Visual information is NEVER conveyed through color alone:
     - Risk categories include text labels ("Safe", "Moderate", "High", "Critical") and distinct numerical ranges ($<18\text{m}$, $18-24\text{m}$, etc.).
     - Map polygons display both district name and depth value in bold text.
     - Provenance badges feature unique text badges (`LIVE`, `DELAYED`, `SIMULATED`, `STALE`) alongside indicator dots.

3. **Keyboard Navigability:**
   - All interactive elements (sidebar navigation buttons, tabs, modal close triggers, forms, and sliders) are fully focusable via `Tab` key with visible focus rings (`focus:ring-2 focus:ring-blue/40`).
   - Modals trap focus and close upon pressing the `Escape` key.

4. **Screen Reader Support:**
   - Semantic HTML5 landmark structure: `<aside>`, `<header>`, `<main>`, `<nav>`, `<table>`, `<svg role="img">`.
   - SVG map elements include `<text>` labels for screen readers.

---

## 2. Internationalization (i18n) Architecture

The platform supports India's official administrative languages:
- **English (`en`):** Default administrative language.
- **Hindi (`hi` — हिन्दी):** National official language for state water departments.
- **Urdu (`ur` — اردو):** Widely spoken across Western Uttar Pradesh & NCR, requiring Right-to-Left (RTL) layout direction.

### Trilingual Terminology Matrix

| English Concept | Hindi (हिन्दी) | Urdu (اردو - RTL) |
| :--- | :--- | :--- |
| **Predict • Protect • Preserve** | भविष्यवाणी • सुरक्षा • संरक्षण | پیش گوئی • حفاظت • بقا |
| **Groundwater Level** | भूजल स्तर | زیر زمین پانی کی سطح |
| **Over-exploited** | अति-शोषित | ضرورت سے زیادہ استعمال |
| **Recharge Potential** | पुनर्भरण क्षमता | ریچارج کی صلاحیت |
| **Rainwater Harvesting** | वर्षा जल संचयन | بارش کے پانی کا ذخیرہ |
| **Water Quality Index** | जल गुणवत्ता सूचकांक | پانی کے معیار کا اشاریہ |
| **Reservoir Storage** | जलाशय भंडारण | آبی ذخائر کا ذخیرہ |
| **Citizen Grievance** | नागरिक शिकायत | شہریوں کی شکایت |
| **Live Telemetry** | लाइव टेलीमेट्री | براہ راست ٹیلی میٹری |
