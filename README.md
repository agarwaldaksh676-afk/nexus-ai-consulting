# 🌐 Nexus AI Consulting — Official Website

> **Accelerating High-Growth Teams with Applied AI & Scalable Cloud Systems.**

A modern, high-converting, accessible, and fully responsive web landing page built for **Nexus AI Consulting**. Engineered with vanilla web technologies, fluid typography, a sleek dark/light mode system, and an interactive real-time project scope and budget calculator.

---

## 🌟 Key Features

* **🌓 Seamless Dark & Light Mode:**
  * Clean slate light theme (`#F8FAFC`) with emerald accents.
  * Sleek obsidian dark theme (`#090D16`) with an ambient dot-matrix infrastructure grid.
  * Persists user preference via `localStorage` and automatically syncs with system OS preferences (`prefers-color-scheme`).

* **🎛️ Interactive Scope & Budget Estimator:**
  * Real-time calculation of ballpark investment ranges, timeline delivery schedules, and squad compositions.
  * Custom dynamic slider with live gradient track fill and tactile glowing indicator thumb.
  * Seamless handoff to the consultation form with a dynamic *"Applied Blueprint Chip"* and form highlight pulse.

* **📱 Mobile-First Responsive Design:**
  * Accessible full-screen mobile menu drawer with frosted glass blur (`backdrop-filter: blur(20px)`) and background body scroll-lock.
  * Mobile live price mirror badge directly above the slider for thumb-friendly interaction without vertical scrolling.
  * Floating quick-action consultation button with modern iPhone safe-area padding (`env(safe-area-inset-bottom)`).

* **📈 High-Conversion Architecture:**
  * Flagship service card highlighting *"🔥 Most Requested"* applied AI capabilities.
  * Interactive portfolio category filter pills (*All*, *AI/ML*, *Cloud*, *Fintech*).
  * 3-tier engagement model pricing table with a 15% quarterly retainer discount switcher.
  * Click-to-expand FAQ accordion with single-open neatness.
  * Instant-validation contact inquiry form with a 3-point reassurance trust strip.

* **♿ WCAG 2.1 Level AA Accessibility:**
  * High-contrast typography scale (contrast ratios > 4.6:1 on all text).
  * Accessible skip-to-content keyboard link (`Tab` navigation).
  * Explicit ARIA semantics (`role="switch"`, `aria-checked`, `aria-pressed`, `aria-expanded`, `aria-controls`, `aria-live="polite"`).

---

## 🛠️ Technology Stack

* **Structure:** Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<dialog>`).
* **Styling:** Modern Vanilla CSS3:
  * Centralized design tokens (CSS custom properties / variables).
  * Fluid typography using `clamp()` for responsive text scaling without viewport jumps.
  * Layered elevations and micro-interactions (hover lifts, active depression, button shimmer sweeps).
* **Interactivity:** Vanilla JavaScript (ES6+):
  * DOM manipulation, event delegation, and real-time state calculation.
  * Animated metric counters powered by `IntersectionObserver`.
  * Zero external JavaScript libraries or heavy framework dependencies (lightning-fast load times).

---

## 📂 Project Directory Structure

```text
my-first-website/
├── index.html        # Semantic markup, Google Fonts, inline SVG icons & favicon
├── styles.css        # Design tokens, dark/light themes, custom slider & responsive CSS
├── script.js         # Interactive Estimator logic, theme toggle & validation scripts
├── .gitignore        # Clean rules excluding OS junk, IDE configs & temp files
└── README.md         # Comprehensive project documentation
```

---

## 🚀 How to Run Locally

You can run this project locally using any of the following lightweight methods:

### Option 1: Direct File Open (Instant)
Simply double-click `index.html` in your file explorer or open it directly in any browser (Chrome, Edge, Firefox, Safari, Brave).

### Option 2: Python Local Server (Recommended)
If you have Python installed, open your terminal in the project directory and run:
```bash
# Python 3.x
python -m http.server 8000
```
Then navigate to: **`http://localhost:8000`**

### Option 3: Node / NPX Serve
If you have Node.js installed:
```bash
npx serve .
```

---

## ☁️ Deployment Guide

Because this project is built with clean vanilla HTML, CSS, and JavaScript, it can be deployed for free in seconds to any modern static hosting provider:

* **GitHub Pages:**
  1. Push this repository to GitHub.
  2. In your GitHub repository, go to **Settings** ➔ **Pages**.
  3. Under **Source**, select the `main` branch and `/ (root)` folder, then click **Save**.
  4. Your website will be live at `https://<your-username>.github.io/<repo-name>/`.

* **Vercel / Netlify / Cloudflare Pages:**
  1. Connect your GitHub repository.
  2. Leave the build command and output directory empty (or root).
  3. Click **Deploy**.

---

## 📄 License & Attribution

Designed and engineered for **Nexus AI Consulting**.  
© 2026 Nexus AI Consulting. All rights reserved.
