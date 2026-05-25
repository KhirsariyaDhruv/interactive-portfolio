---
name: Kinetic Sentinel
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#d0c6ab'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#999077'
  outline-variant: '#4d4732'
  surface-tint: '#e9c400'
  primary: '#fff6df'
  on-primary: '#3a3000'
  primary-container: '#ffd700'
  on-primary-container: '#705e00'
  inverse-primary: '#705d00'
  secondary: '#ecffe3'
  on-secondary: '#003907'
  secondary-container: '#13ff43'
  on-secondary-container: '#007117'
  tertiary: '#fff4f2'
  on-tertiary: '#690003'
  tertiary-container: '#ffcfc8'
  on-tertiary-container: '#c2000a'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe16d'
  primary-fixed-dim: '#e9c400'
  on-primary-fixed: '#221b00'
  on-primary-fixed-variant: '#544600'
  secondary-fixed: '#72ff70'
  secondary-fixed-dim: '#00e639'
  on-secondary-fixed: '#002203'
  on-secondary-fixed-variant: '#00530e'
  tertiary-fixed: '#ffdad5'
  tertiary-fixed-dim: '#ffb4aa'
  on-tertiary-fixed: '#410001'
  on-tertiary-fixed-variant: '#930005'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Anton
    fontSize: 84px
    fontWeight: '400'
    lineHeight: 90px
    letterSpacing: 0.02em
  display-lg-mobile:
    fontFamily: Anton
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 52px
  headline-md:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
  data-lg:
    fontFamily: JetBrains Mono
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
spacing:
  grid-unit: 8px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  container-max: 1440px
---

## Brand & Style

The design system is engineered for the high-stakes world of cybersecurity, evoking a sense of absolute precision, real-time vigilance, and technical superiority. It targets security analysts, CTOs, and developers who require data-dense environments that remain legible under pressure.

The visual style is a sophisticated blend of **High-Contrast Modernism** and **Technical HUD (Heads-Up Display) aesthetics**. It leverages a deep, monochromatic base to allow vibrant functional accents to command attention. Key characteristics include:
- **Atmospheric Depth:** A dark-mode first approach using "true black" backgrounds to maximize the glow of data visualizations.
- **Precision Engineering:** Use of thin, technical borders, micro-grids, and monospaced accents to create a "code-inspired" feel.
- **Kinetic Energy:** Subtle glows and sharp transitions that suggest a living, breathing system of active protection.

## Colors

This design system utilizes a high-contrast, dark-centric palette optimized for OLED displays and low-light operations centers.

- **Primary (Cyber Gold):** `#FFD700`. Used for calls to action, critical branding, and primary data highlights. It should feel radiant against the black background.
- **Secondary (Terminal Green):** `#00FF41`. Reserved for "Safe" statuses, positive trends, and system health indicators.
- **Tertiary (Alert Red):** `#FF3B30`. Used sparingly for critical threats, destructive actions, and high-risk alerts.
- **Neutrals:** The base is a "Pitch Black" (`#000000`) for the background, with `#0A0A0A` and `#1A1A1A` used for container surfaces. Text neutrals scale from pure white for headings to a dimmed "Slate Gray" (`#888888`) for secondary metadata.

## Typography

Typography in this design system serves two purposes: impact and utility.

1.  **Display & Impact:** We use **Anton** for primary hero statements. Its condensed, bold nature mirrors the urgency of cybersecurity.
2.  **Interface & Readability:** **Inter** is the workhorse for body copy and general UI, providing a clean, neutral balance to the aggressive display type.
3.  **Data & Technical:** **JetBrains Mono** is mandatory for all numerical data, status logs, and technical labels. It reinforces the "code-inspired" aesthetic and ensures tabular data aligns perfectly.

Always use uppercase for `label-mono` to enhance the HUD-style appearance.

## Layout & Spacing

The layout follows a **Strict Fluid Grid** model based on an 8px square system. 

- **The HUD Framework:** Interfaces should feel modular. Use 12-column layouts for desktop, but visually define sections using thin (1px) borders rather than heavy background shifts.
- **Micro-Grids:** For data-heavy dashboards, implement a subtle dot-grid background (opacity 5-10%) to help the eye track horizontal and vertical alignments.
- **Density:** The design system favors a "High Density" layout. Padding within containers should be tight (16px - 24px) to allow for maximum data visualization.
- **Breakpoints:**
  - **Desktop:** 1440px+ (12 columns)
  - **Tablet:** 768px - 1024px (8 columns)
  - **Mobile:** <768px (4 columns, margins reduced to 20px)

## Elevation & Depth

Depth is conveyed through **Luminance and Outlines** rather than traditional shadows.

- **Tonal Layers:** Since the background is pure black, "Elevated" surfaces are represented by `#0A0A0A` or `#121212` with a 1px border of `#333333`.
- **Glow Effects:** Use "Cyber Gold" or "Terminal Green" drop shadows with high blur (20px+) and very low opacity (0.15) for active states or critical alerts to simulate a glowing monitor.
- **Glassmorphism:** Use sparingly for floating overlays or navigation bars. A background blur of 12px with a 10% white tint creates a "tactical glass" effect.
- **Ornaments:** Use 45-degree chamfered corners or "corner-only" borders to highlight specific data modules.

## Shapes

The shape language is **Strictly Geometric**. 

- **Zero Radius:** To maintain a professional, high-tech military feel, most UI elements (buttons, inputs, containers) should use a **0px border radius**. 
- **The "Cut" Corner:** For primary containers or "hero" modules, use a clipped-corner (chamfer) aesthetic rather than a curve.
- **Technical Accents:** Use thin lines, brackets `[ ]`, and double slashes `//` as structural ornaments for labels and titles.

## Components

- **Buttons:** 
  - *Primary:* Solid Cyber Gold background with black text. No rounding. Hover state includes a slight outer glow.
  - *Ghost:* 1px gold border, transparent background, gold text.
- **Data Cards:** Pitch black background, 1px `#222` border. Include a top-left label in `label-mono` typography.
- **Input Fields:** Bottom-border only or a full thin stroke. Active state changes the border to Primary Gold with a subtle glow. Use monospaced font for user input.
- **Status Indicators:** Small circular pips. Use secondary green for "Nominal," tertiary red for "Breach," and primary gold for "Warning."
- **Visualizations:** Line charts should use 2px strokes with a gradient area fill (opacity 0.2 to 0). All axes labels must use `label-mono`.
- **Navigation:** Top-aligned, thin 1px bottom border. Links are uppercase `label-mono` with a 2px gold underline on active/hover states.