# Color Tokens — Yalla Viral Website

> Generated: 2026-06-09
> Purpose: Snapshot of the old amber/orange theme before switching to teal/green brand.

## Old Theme (Amber/Orange — Warm)

### Semantic Colors (CSS Variables in `:root`)

| Token | HSL | Hex Equivalent | Usage |
|-------|-----|---------------|-------|
| `--primary` | `42 96% 50%` | `#f59e0b` | Primary buttons, orbs, chart highlight, service icons |
| `--secondary` | `33 94% 44%` | `#d97706` | Secondary orbs, chart-2, service icons |
| `--accent` | `42 96% 50%` | `#f59e0b` | Same as primary |
| `--chart-1` | `42 96% 50%` | `#f59e0b` | Chart primary |
| `--chart-2` | `33 94% 44%` | `#d97706` | Chart secondary |
| `--sidebar-primary` | `42 96% 50%` | `#f59e0b` | Sidebar |
| `--sidebar-ring` | `42 96% 50%` | `#f59e0b` | Sidebar ring |
| `--ring` | `42 96% 50%` | `#f59e0b` | Focus ring |

### Particle System (Hero.tsx)
```ts
hue: Math.random() > 0.55 ? 42 : 33   // amber hues
```

### Hardcoded Colors

| File | Code | Color |
|------|------|-------|
| Hero.tsx | `text-cyan-400` | AI badge text |
| Hero.tsx | `bg-cyan-400/500` | AI badge ping dot |
| Hero.tsx | `gradient: from-primary to-secondary` | Heading gradient |
| Hero.tsx | `rgba(124,58,237,0.13) / rgba(80,140,255,0.06) / rgba(6,182,212,0.03)` | Glow effect (purple/blue/cyan) |
| Footer.tsx | `bg-primary/20` | Footer glow |
| Services.tsx | `service.color: "text-primary" / "text-secondary"` | Service icon colors |
| Portfolio (data.ts) | `from-primary/30 to-primary/5` / `border-primary/30` | Portfolio card colors |

### Logo Files (Old)
| File | Backup Path |
|------|------------|
| logo.svg | `public/logo.svg.OLD` |
| logo-navbar.png | `public/logo-navbar.png.OLD` |
| logo.png | `public/logo.png.OLD` |

### Restore Instructions
```powershell
cd C:\yallaviral\yalla-viral-website
copy src\index.css.OLD-THEME.bak src\index.css
copy public\logo.svg.OLD public\logo.svg
copy public\logo-navbar.png.OLD public\logo-navbar.png
copy public\logo.png.OLD public\logo.png
```

## New Colors (Applied)

```css
--color-brand-primary: #1d6770;    /* Teal dark */
--color-brand-secondary: #008375;  /* Teal green */
--color-brand-accent: #51e088;     /* Light green */
--color-brand-green: #04aa62;      /* Logo green */
--color-brand-blue: #0101c3;       /* Deep blue */
--color-brand-dark: #035762;       /* Dark teal */
```

| New Semantic Token | Value |
|--------------------|-------|
| `--primary` | #1d6770 (teal dark) |
| `--secondary` | #008375 (teal green) |
| `--accent` | #51e088 (light green) |
| `--chart-1` | #04aa62 (logo green) |
| `--chart-2` | #0101c3 (deep blue) |
