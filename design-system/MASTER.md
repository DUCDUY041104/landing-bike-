# LTP Bike Design System: "Eco-Sky & Green Hills"

This document serves as the **Global Source of Truth (MASTER)** for the design tokens, typography, spacing structures, and component layout configurations for the LTP Bike light-themed, eco-style website.

---

## 1. Color Palette

The color palette represents a light, modern, clean-tech aesthetic inspired by bright blue skies and rolling green hills. Raw colors are mapped to semantic design tokens to ensure consistent context-driven styling.

### Base Colors & Swatches

| Name | Hex Code | Visual Reference | Primary Use |
| :--- | :--- | :--- | :--- |
| **Emerald Green (Hill Base)** | `#10b981` | Green Hills, Accents, Branding | Primary Brand Color |
| **Green Dark (Text Contrast)** | `#047857` | High-contrast green text/borders | Muted Brand Text, AA Buttons |
| **Green Light (Glow/Accent)** | `#34d399` | Soft backgrounds, progress bars | Accent Highlights |
| **Sky Blue (Bright Sky)** | `#0ea5e9` | Sky Visual, Secondary actions | Secondary Actions / Alerts |
| **Sky Deep (Sky Contrast)** | `#0369a1` | High-contrast blue typography | Muted Blue Text |
| **Sky Light (Mist)** | `#e0f2fe` | Subtle page sections, card fills | Light Background Fills |
| **Sky Mist (Canvas base)** | `#f0f9ff` | Overall layout transition layers | Canvas Overlay |
| **Slate Gray (Text base)** | `#0f172a` | Headers, body text base | Main Typography |
| **Off-White (Surface)** | `#fafafa` | Card container fills | Container Surfaces |

### Semantic Token Mapping & Contrast Verification

> [!IMPORTANT]
> **WCAG Contrast Compliance Requirement**: All text elements on background layers must maintain at least a **4.5:1** contrast ratio. For text overlays on the primary green background, use `#ffffff` (White) strictly on `#047857` (Green Dark, Contrast 4.7:1) or `#059669` (Green-600, Contrast 4.5:1). Do not place white text on the raw `#10b981` (Emerald-500, Contrast 2.8:1) without proper darkening.

```mermaid
graph TD
    classDef token fill:#e0f2fe,stroke:#0369a1,stroke-width:1px;
    classDef color fill:#f0fdf4,stroke:#10b981,stroke-width:1px;

    T_BG[bg-canvas: #ffffff]:::token -->|contrast 19.3:1| T_Txt[text-primary: #0f172a]:::token
    T_BG -->|contrast 6.9:1| T_Sub[text-secondary: #475569]:::token
    T_BG -->|contrast 5.3:1| T_GreenText[text-green: #047857]:::token
    
    T_Btn[btn-primary-bg: #047857]:::token -->|contrast 4.7:1| T_BtnTxt[btn-primary-text: #ffffff]:::token
    T_Card[card-bg: #fafafa]:::token -->|contrast 1.1:1| T_Border[border-subtle: rgba(15,23,42,0.05)]:::token
```

---

## 2. Typography

We pair **Lexend** (modern, clean, display headings) with **Be Vietnam Pro** (highly legible, optimized body copy) to create an interface that feels clean and professional.

### Sizing and Hierarchy Scale

```css
:root {
  --font-display: 'Lexend', sans-serif;
  --font-body: 'Be Vietnam Pro', sans-serif;
}
```

| Token | Desktop Size | Mobile Size | Line Height | Weight | Ideal Use Case |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `display-lg` | `48px` | `32px` | `1.15` | `800` (ExtraBold) | Hero landing headlines (Max 2 lines) |
| `display-md` | `36px` | `28px` | `1.2` | `700` (Bold) | Major section title headers |
| `heading-lg` | `24px` | `20px` | `1.3` | `600` (SemiBold) | Feature and pricing card titles |
| `heading-md` | `20px` | `18px` | `1.3` | `600` (SemiBold) | Nested items, settings subheadings |
| `body-lg` | `16px` | `15px` | `1.6` | `400` (Regular) | Lead paragraph, editorial summaries |
| `body-md` | `14px` | `14px` | `1.5` | `400` / `500` | Standard body copy / form inputs |
| `body-sm` | `12px` | `12px` | `1.5` | `500` (Medium) | UI tags, metadata, helper/error label |

---

## 3. Spacing System

Built strictly on a **4px/8px base increment** to maintain visual rhythm, consistent alignments, and clean visual margins.

| Token | Value | Target Applications |
| :--- | :--- | :--- |
| `space-xxs` | `4px` | Tag padding, small badge spacing, border adjustments |
| `space-xs` | `8px` | Gap between icon and text, input label to input field |
| `space-sm` | `12px` | Internal metadata gap, tight items list |
| `space-md` | `16px` | Standard button padding, small card internal layout padding |
| `space-lg` | `24px` | Main content card padding, grid gap for secondary blocks |
| `space-xl` | `32px` | Main column gap, pricing grid columns separation |
| `space-2xl` | `48px` | Section margins, top-level layout block spacing |
| `space-3xl` | `64px` | Hero bottom spacing, section block gaps |
| `space-4xl` | `96px` | Vertical spacing for sections (`py-24`) |

---

## 4. Component Styles

### A. Buttons (Touch Targets $\ge$ 44x44px)

```mermaid
stateDiagram-v2
    [*] --> Default
    Default --> Hover : Cursor Enters
    Hover --> Active : User Clicks / Taps
    Active --> Default : Mouse Releases
    Default --> Disabled : State = Locked
```

1.  **Primary Button (Solid Emerald-Sky)**:
    *   **Structure**: Height `48px`. Padding: `12px 24px` (`space-md` / `space-lg`). Border Radius: `12px` (`radius-lg`).
    *   **Visuals**: Linear gradient `to-right` from `#10b981` (Emerald-500) to `#059669` (Emerald-600). Text `#ffffff`, weight `600`, size `14px` (`body-md`).
    *   **Shadow**: Subtle green-tinted drop-shadow (`0 4px 14px rgba(16, 185, 129, 0.2)`).
    *   **Hover Interaction (150ms transition)**: Scale to `1.02`. Gradient shifts to slightly darker `#059669` and `#047857` (Emerald-700) for contrast. Shadow extends to `0 6px 18px rgba(16, 185, 129, 0.3)`.
    *   **Active Press**: Scale to `0.98`. Shadow collapses.
    *   **Disabled**: Background `#e2e8f0` (Slate-200), text `#94a3b8` (Slate-400), shadow none, `cursor-not-allowed`.
2.  **Secondary Button (Outline)**:
    *   **Structure**: Height `48px`. Border `1px solid rgba(15, 23, 42, 0.08)`. Border Radius: `12px`.
    *   **Visuals**: Transparent background, text `#0f172a` (`text-primary`), size `14px`.
    *   **Hover**: Background `#f0f9ff` (Sky-50). Border color transitions to `#0ea5e9` (Sky-500). Text shifts to `#0369a1` (Sky-700).

### B. Cards (Showcase & Data Container)

1.  **Container Surface**:
    *   **Structure**: Border Radius `16px` (`radius-xl`). Padding `24px` (`space-lg`).
    *   **Visuals**: Background `#ffffff` (`bg-canvas`). Border `1px solid rgba(15, 23, 42, 0.05)`.
    *   **Shadow**: `0 4px 20px rgba(15, 23, 42, 0.03), 0 1px 3px rgba(0, 0, 0, 0.02)`.
2.  **Hover Lift Card (`.eco-card-hover`)**:
    *   **Transition**: `all 300ms cubic-bezier(0.4, 0, 0.2, 1)`.
    *   **Hover Action**: Translate Y `-4px`. Shadow shifts to `0 12px 28px rgba(16, 185, 129, 0.08), 0 2px 8px rgba(0, 0, 0, 0.02)`.
3.  **Eco-Highlight Variant**:
    *   Adds a structural `3px solid #10b981` (Emerald) top border.
    *   Applies a faint radial gradient background highlight: `radial-gradient(circle at top right, rgba(16, 185, 129, 0.02) 0%, transparent 60%)`.

### C. Layout Sections

1.  **Landscape Visual Canopy (Sky-to-Hill Gradient flow)**:
    *   Transitions page colors down the viewport:
        *   **Hero (Top)**: Background `#f0f9ff` (Sky-50) leading into a soft linear gradient fading to `#e0f2fe` (Sky-100) and white.
        *   **Body Sections (Middle)**: Clean white backgrounds with subtle gridlines (`.bg-tech-grid`) to emphasize structure.
        *   **Transition Sections (e.g. Booking Form/Services)**: Mapped linear gradient fading from `#ffffff` (0%) to `#f0fdf4` (Emerald-50, 100%) to ground the interface in the "green hills" theme.
2.  **Standard Content Spacing**:
    *   Vertical padding: `96px` (`space-4xl`) above and below to give text and visual elements room to breathe.
    *   Responsive columns: Mapped using standard CSS grid layout:
        *   Mobile: 1 column (`grid-cols-1`).
        *   Tablet: 2 columns (`grid-cols-2`).
        *   Desktop: 4 columns (`grid-cols-4`) with a maximum wrapper width of `1280px` (`max-w-7xl`).

---

## 5. Anti-Patterns to Avoid

> [!WARNING]
> 1. **Do not use emojis for functional controls**. Use Lucide SVG vector glyphs.
> 2. **Do not hardcode hex codes in components**. Use semantic Tailwind tokens (`primary`, `border`, `card-foreground`) mapped to theme classes.
> 3. **Avoid sharp corners** ($r \le 4px$) unless required for tiny inputs. Keep button and card corners rounded ($r \ge 12px$) to maintain the soft organic "hill" feel.
> 4. **Avoid nested scrolling areas** that conflict with main viewport scrolling.
