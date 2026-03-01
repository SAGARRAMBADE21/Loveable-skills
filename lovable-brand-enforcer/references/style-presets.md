# Brand Style Presets Reference

## Corporate

**Visual Identity**: Professional, trustworthy, structured.

```css
:root {
  --brand-primary: 213 65% 25%;     /* #1e3a5f — Deep navy */
  --brand-secondary: 218 11% 35%;   /* #4a5568 — Slate gray */
  --brand-accent: 212 72% 49%;      /* #3182ce — Blue */
  --brand-neutral: 210 40% 98%;     /* #f7fafc — Near white */

  --font-heading: 'Inter', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --radius: 4px;
  --space-unit: 8px;
}
```

**Characteristics**:
- Restrained color usage — primary dominates, accent for CTAs only
- System font stack acceptable (Inter is a safe default)
- Small border radius (4px) for structured feel
- Dense but organized layouts
- Conservative animations (subtle or none)

---

## Startup

**Visual Identity**: Modern, energetic, approachable.

```css
:root {
  --brand-primary: 239 84% 67%;     /* #6366f1 — Indigo */
  --brand-secondary: 210 40% 96%;   /* #f1f5f9 — Light slate */
  --brand-accent: 38 92% 50%;       /* #f59e0b — Amber */
  --brand-neutral: 0 0% 100%;       /* #ffffff — White */

  --font-heading: 'Satoshi', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --radius: 8px;
  --space-unit: 8px;
}
```

**Characteristics**:
- Vibrant primary with energetic accent
- Modern sans-serif fonts (Satoshi for character, Inter for readability)
- Medium radius (8px) for friendly feel
- Generous whitespace and large hero sections
- Bouncy or smooth animations

---

## Creative

**Visual Identity**: Expressive, bold, artistic.

```css
:root {
  --brand-primary: 263 70% 50%;     /* #7c3aed — Purple */
  --brand-secondary: 330 81% 71%;   /* #f472b6 — Pink */
  --brand-accent: 45 93% 56%;       /* #fbbf24 — Yellow */
  --brand-neutral: 0 0% 98%;        /* #fafafa — Near white */

  --font-heading: 'Clash Display', system-ui, sans-serif;
  --font-body: 'Satoshi', system-ui, sans-serif;
  --radius: 16px;
  --space-unit: 8px;
}
```

**Characteristics**:
- Multi-color palette, multiple accent colors acceptable
- Display/decorative heading fonts
- Large radius (16px) for rounded, soft feel
- Asymmetric layouts, overlapping elements
- Expressive animations (bouncy, cinematic)

---

## Editorial

**Visual Identity**: Classic, authoritative, content-first.

```css
:root {
  --brand-primary: 0 0% 10%;        /* #1a1a1a — Near black */
  --brand-secondary: 220 9% 46%;    /* #6b7280 — Gray */
  --brand-accent: 28 83% 37%;       /* #b45309 — Warm brown */
  --brand-neutral: 210 20% 98%;     /* #f9fafb — Off white */

  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body: 'Source Serif Pro', Georgia, serif;
  --radius: 0px;
  --space-unit: 4px;
}
```

**Characteristics**:
- Restrained, near-monochrome palette
- Serif fonts for authority and readability
- Zero radius for sharp, editorial feel
- Heavy emphasis on typography and whitespace
- Minimal or no animations
- Horizontal rules instead of card borders

---

## Technical

**Visual Identity**: Precise, developer-facing, data-oriented.

```css
:root {
  --brand-primary: 222 47% 11%;     /* #0f172a — Dark slate */
  --brand-secondary: 215 19% 26%;   /* #334155 — Slate */
  --brand-accent: 189 94% 43%;      /* #06b6d4 — Cyan */
  --brand-neutral: 210 40% 98%;     /* #f8fafc — Near white */

  --font-heading: 'Geist Sans', system-ui, sans-serif;
  --font-body: 'Geist Mono', 'JetBrains Mono', monospace;
  --radius: 6px;
  --space-unit: 8px;
}
```

**Characteristics**:
- Dark primary with bright accent (cyan/electric blue)
- Monospace body font for technical content
- Medium-small radius (6px)
- Grid-based, structured layouts
- Code blocks and data visualizations prominent
- Snappy animations

## Google Fonts Import Snippets

```html
<!-- Corporate / Startup -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

<!-- Startup heading -->
<link href="https://api.fontshare.com/v2/css?f[]=satoshi@400;500;600;700&display=swap" rel="stylesheet">

<!-- Creative heading -->
<link href="https://api.fontshare.com/v2/css?f[]=clash-display@400;500;600;700&display=swap" rel="stylesheet">

<!-- Editorial -->
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Serif+Pro:wght@400;600&display=swap" rel="stylesheet">

<!-- Technical -->
<link href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&family=Geist+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
```

## HSL Conversion Guide

shadcn/ui uses HSL values without the `hsl()` wrapper. Format: `H S% L%`

To convert hex to shadcn HSL format:
1. Convert hex to HSL
2. Write as `{H} {S}% {L}%` (space-separated, no hsl() wrapper)

Example: `#6366f1` → `239 84% 67%`

This format is used in `tailwind.config.ts` and CSS custom properties for shadcn theming.
