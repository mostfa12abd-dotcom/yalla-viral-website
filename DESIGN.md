# Yalla Viral — Design Guidelines

> **Last updated:** June 2026  
> **Stack:** Vite 5 + React 18 + TypeScript 6 + Tailwind v4 + shadcn/ui (New York)  
> **Status:** Dark-mode only (no light theme)

---

## 1. Brand Overview

Yalla Viral is an AI-powered business growth agency. The brand identity communicates **trust, performance, and modern AI capability** through a gold/amber-on-dark visual language.

- **Tone:** Direct, benefit-oriented, credibility-driven
- **Promise:** "No credit card required. 100% Free."
- **Phone:** +1 (650) 448 0892 — displayed prominently

---

## 2. Color System

### 2.1 Semantic Tokens

All colors are defined as HSL CSS custom properties in `:root` (no separate light theme).

| Token | HSL | Hex | Usage |
|---|---|---|---|
| `--background` | `0 0% 10%` | `#1a1a1a` | Page background |
| `--foreground` | `0 0% 100%` | `#ffffff` | Body text |
| `--card` | `0 0% 13%` | `#212121` | Card/panel surface |
| `--card-foreground` | `0 0% 100%` | `#ffffff` | Card text |
| `--border` | `0 0% 18%` | `#2e2e2e` | All borders |
| `--muted` | `0 0% 16%` | `#292929` | Muted surface |
| `--muted-foreground` | `0 0% 55%` | `#8c8c8c` | Secondary text |
| `--primary` | `42 96% 50%` | `#f59e0b` | CTAs, glows, active states |
| `--primary-foreground` | `0 0% 8%` | `#141414` | Text on primary bg |
| `--secondary` | `33 94% 44%` | `#d97706` | Accent variant |
| `--secondary-foreground` | `0 0% 100%` | `#ffffff` | Text on secondary bg |
| `--accent` | `42 96% 50%` | `#f59e0b` | Same as primary |
| `--ring` | `42 96% 50%` | `#f59e0b` | Focus rings |
| `--destructive` | `0 84% 60%` | `#e53e3e` | Errors/destructive |

### 2.2 Chart Colors

| Token | Value | | Token | Value |
|---|---|---|---|
| `--chart-1` | `42 96% 50%` (gold) | `--chart-4` | `42 96% 35%` (dark gold) |
| `--chart-2` | `33 94% 44%` (amber) | `--chart-5` | `25 95% 50%` (orange) |
| `--chart-3` | `0 0% 55%` (gray) |

### 2.3 Elevation Overlays

| Token | Value | Applied via |
|---|---|---|
| `--elevate-1` | `rgba(255,255,255,0.04)` | `hover-elevate` utility |
| `--elevate-2` | `rgba(255,255,255,0.09)` | `active-elevate-2` / `toggle-elevated` |

**DO NOT** hardcode hex values in components. Always use `hsl(var(--token))`.

---

## 3. Typography

### 3.1 Font Stack

| Role | Font | Weights | Fallback |
|---|---|---|---|
| Body | **Inter** | 400, 500, 600, 700 | `sans-serif` |
| Headings | **Plus Jakarta Sans** | 400, 500, 600, 700, 800 | `sans-serif` |
| Serif | Georgia | — | `serif` |
| Mono | Menlo | — | `monospace` |

### 3.2 Type Scale

Use Tailwind utility classes. Prefer fluid utilities for responsive text:

| Utility | Clamp Range | Use |
|---|---|---|
| `text-fluid-heading` | `clamp(1.5rem, 4vw, 3.5rem)` | Section headings |
| `text-fluid-body` | `clamp(0.875rem, 1.4vw, 1.15rem)` | Body paragraphs |
| Hero H1 | `clamp(2.5rem, 6vw, 4.5rem)` → `clamp(3rem, 5vw, 5rem)` on `md+` | Hero title |

### 3.3 Heading Rules

- All `h1`–`h6` automatically get `font-heading` (Plus Jakarta Sans)
- Section titles: `font-bold`
- Hero: `tracking-tight` + `leading-[1.1]`
- Body: `leading-relaxed`
- Muted text: `text-muted-foreground`

---

## 4. Spacing & Layout

### 4.1 Base Unit

`--spacing: 0.25rem` (4px) — standard Tailwind spacing scale.

### 4.2 Section Padding

```css
@utility section-py {
  padding-top: clamp(2.5rem, 12vh, 7rem);
  padding-bottom: clamp(2.5rem, 12vh, 7rem);
}
```

All major sections: `<section className="min-h-dvh section-py">`.

### 4.3 Container

```css
@utility container-fluid {
  max-width: min(100%, 1440px);
  padding-left: clamp(1rem, 4vw, 4rem);
  padding-right: clamp(1rem, 4vw, 4rem);
}
```

Always wrap section content in `<div className="container-fluid">`.

### 4.4 Common Grid Patterns

| Section | Grid |
|---|---|
| Services | `md:grid-cols-2 xl:grid-cols-3 gap-6` |
| How It Works | `md:grid-cols-3 gap-12` |
| Hero split | `lg:grid-cols-2 gap-8 lg:gap-16` |
| Footer | `md:grid-cols-3 gap-8 md:gap-12` |
| Stats | `grid-cols-2 md:grid-cols-4 gap-8` |

---

## 5. Border Radius

| Token | Value | Common Use |
|---|---|---|
| `--radius-sm` | 4px | Fine details, chart bars |
| `--radius-md` | 6px | Small inputs |
| `--radius-lg` | 8px (base) | Cards, accordion, inputs |
| `--radius-xl` | 12px | Icon containers, larger panels |
| `rounded-full` | 9999px | Buttons, pills, badges, popovers |

---

## 6. Shadows

### 6.1 Base Shadows (Tailwind `shadow-*`)

All shadow tokens have a transparent gold base layer + standard Tailwind offsets. Use standard `shadow-sm`, `shadow-md`, etc.

### 6.2 Glow Shadows (Primary)

Always inline — never define as tokens:

- **Buttons:** `shadow-[0_0_30px_-5px_hsl(var(--primary))]`
- **Button hover:** `shadow-[0_0_50px_-5px_hsl(var(--primary))]`
- **Card hover:** `shadow-[0_0_30px_-8px_hsl(var(--primary))]`
- **Modal:** `box-shadow: 0 0 80px -20px hsl(42 96% 50% / 0.35)`
- **Popover:** `box-shadow: 0 0 60px -15px hsl(42 96% 50% / 0.3)`
- **Number circles:** `shadow-[0_0_24px_-5px_hsl(var(--primary))]`

---

## 7. Animation

### 7.1 CSS Keyframes (in `index.css`)

| Name | Duration | Use |
|---|---|---|
| `beam` | 8s, ease-in-out, infinite | Demo card sweep overlay |
| `grain` | 0.65s, steps(1), infinite | Film grain texture overlay (`.grain-layer`) |

### 7.2 Framer Motion Standards

#### Entry Animation (all sections)

```tsx
initial={{ opacity: 0, y: 24 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-40px" }}
transition={{ duration: 0.5, ease: "easeOut" }}
```

- **y offset range:** 20–40px depending on distance
- **Margin:** `-40px` (default) or `-60px` (hero sections)
- **`once: true`** — never repeat animations

#### Spring Physics

| Property | Range |
|---|---|
| `stiffness` | 220–280 |
| `damping` | 22–28 |
| `type` | `"spring"` |

#### Staggered Lists

```ts
container: { show: { transition: { staggerChildren: 0.11 } } }
child: { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } }
```

#### Hero Parallax (scroll-linked)

```ts
const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
const rawY = useTransform(scrollYProgress, [0, 1], [0, -180]);
const y = useSpring(rawY, { stiffness: 80, damping: 20 });
```

### 7.3 Animation Principles

- **Only** animate `transform` and `opacity` (GPU-accelerated)
- **200–300ms** for micro-interactions, **600–800ms** for entry reveals
- Exit animations are ~75% of enter duration
- Always respect user choice — no reduced-motion query implemented yet (future)
- One to two animated elements per view max

---

## 8. Glass / Frosted Glass

Applied via Tailwind classes:

```tsx
className="backdrop-blur-xl bg-background/50"   // navbar
className="backdrop-blur-2xl bg-card/40"         // cards
className="backdrop-blur-2xl bg-[rgba(14,12,22,0.88)]" // modals/popovers
```

Consistent pattern: `backdrop-blur-xl` or `backdrop-blur-2xl` + semi-transparent surface.

---

## 9. Custom Components

### 9.1 MagneticButton

Wraps children. Applies magnetic mouse-follow effect via `data-magnetic` attribute.

```tsx
<MagneticButton>
  <Button>Click me</Button>
</MagneticButton>
```

**Physics:** `stiffness: 180, damping: 18, mass: 0.6`, `strength: 0.38`

### 9.2 CircuitBackground

Full-section canvas with procedural PCB traces in gold palette.

```tsx
<section>
  <CircuitBackground />
  {/* content */}
</section>
```

### 9.3 CountUp

```tsx
<CountUp end={500} suffix="+" />
```

**Defaults:** duration `2.2s`, triggers on `useInView` with `once: true`.

### 9.4 CardStack

```tsx
<CardStack
  items={items}
  cardWidth={480}
  cardHeight={300}
  overlap={0.55}
  activeScale={1.12}
  inactiveScale={0.85}
  loop={true}
  autoAdvance={false}
  renderCard={(item, { active }) => <YourCard />}
/>
```

**Physics:** `stiffness: 280, damping: 28`, drag threshold `160px` or velocity `>650`.

### 9.5 CallOrBookPopover

```tsx
<CallOrBookPopover onBook={openModal} phone="+1 (650) 448 0892">
  <Button>Get Started</Button>
</CallOrBookPopover>
```

### 9.6 ScrollProgressBar

Placed at the top of the page. Fixed `h-[3px]` bar in primary color.

---

## 10. shadcn/ui Components

66 components installed. **New York** style with `neutral` base color. All defined in `src/components/ui/`.

**Key patterns:**
- `Button`: `rounded-full` for primary CTAs, `rounded-lg` for secondary
- `Card`: `bg-card` + `border-white/5` for default; `hover:border-primary/50` for interactive
- `Accordion`: Single collapsible mode in FAQ, `rounded-lg` items
- `Dialog` / `Sheet`: Used for modals/booking flows

---

## 11. Background Effects

### 11.1 Hero Section Layers

| Layer | Z-index | Behavior |
|---|---|---|
| Particle canvas | `z-2` | Fixed, interactive mouse-repelling dots (spring physics) |
| Mouse-follow glow | `z-8` | Fixed, radial gradient tracks cursor with lerp `0.07` |
| Grid pattern | — | CSS background, parallax scroll |
| Orb 1 (340px) | — | `bg-primary`, `blur-[110px]`, parallax |
| Orb 2 (260px) | — | `bg-secondary`, `blur-[100px]`, parallax |
| Orb 3 (180px) | — | `bg-primary/30`, `blur-[90px]`, `animate-pulse` |

### 11.2 Particles

- Density: `(width × height) / 6500` particles
- Hue: 42 (gold) and 33 (amber)
- Push radius: 110px, visibility radius: 170px
- Spring: `SPRING=0.018`, `DAMP=0.90`, `PUSH_F=1.6`

### 11.3 Grain Overlay

Applied globally via `.grain-layer` class. SVG fractal noise, `opacity: 0.038`, animated with `steps(1)`.

---

## 12. Content Data (`src/lib/data.ts`)

All site content lives in `src/lib/data.ts`. Structure of key exports:

```
navLinks     → { href, label }[]             (5 items)
services     → { icon, title, desc, color, showLogin }[]  (6 items)
stats        → { icon, value, suffix, label, decimals }[]  (4 items)
faqItems     → { q, a }[]                     (5 items)
howItWorksSteps → { num, title, desc }[]       (3 items)
socialLinks  → { icon, label }[]               (3 items)
webDemoItems → CardStackItem[]                 (5 items)
```

---

## 13. Code Conventions

### Naming
- Section files: `src/pages/home/sections/<Name>.tsx`
- Custom components: `src/components/custom/<Name>.tsx`
- UI components: `src/components/ui/<name>.tsx` (shadcn convention)

### Imports
```ts
// UI components (shadcn)
import { Button } from "@/components/ui/button";
// Custom components
import { MagneticButton } from "@/components/custom/MagneticButton";
// Data
import { services } from "@/lib/data";
// Animation
import { motion } from "framer-motion";
```

### Styling
- Never hardcode hex colors — use semantic HSL variables
- Use `@utility` for reusable fluid patterns (see `index.css`)
- Inline shadow values for glows (not globals)

---

## 14. Accessibility Checklist

- [ ] All interactive elements have visible focus rings (`--ring: 42 96% 50%`)
- [ ] Canvas backgrounds have `aria-hidden="true"`
- [ ] All icons in buttons have `aria-label` when icon-only
- [ ] Touch targets are `h-12` (48px) minimum for mobile
- [ ] `prefers-reduced-motion` support — **not yet implemented** (todo)
- [ ] Skip-to-content link — **not yet implemented** (todo)
- [ ] Color contrast: primary gold on dark surfaces exceeds 4.5:1