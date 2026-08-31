# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/leeer/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Leeer
**Generated:** 2026-08-30
**Category:** Notes & Writing App (products.csv #93) + Diary/Journal (#100)
**Design Dials:** Variance 3/10 (Centered / Minimal) | Motion 2/10 (Subtle) | Density 4/10 (Standard)
**Fuente:** catálogo ui-ux-pro-max leído a mano (Python no disponible en la máquina). Paleta de producto sustituida por los colores Claude que el usuario eligió.

---

## Global Rules

### Product

Herramienta de escritura de manuscritos (web + móvil). El cromo de UI cede al texto. El modo escritura sin distracciones y el editor ambientado son features, no la base visual de toda la app.

### Color Palette

Primitivos Claude (no tocar):

| Nombre | Hex | Uso |
|--------|-----|-----|
| Paper | `#f4f0e7` | Fondo claro |
| Ink | `#1e1b18` | Texto |
| Accent | `#a9362c` | CTA, marca, énfasis |

Semántica (capa que sí cambia en dark):

| Role | Hex light | Hex dark | CSS Variable |
|------|-----------|----------|--------------|
| Primary / Accent / CTA | `#a9362c` | `#c94a3f` | `--color-primary` / `--color-accent` |
| On Primary | `#faf8f3` | `#faf8f3` | `--color-primary-foreground` |
| Secondary | `#e8e0d0` | `#2a2622` | `--color-secondary` |
| On Secondary | `#1e1b18` | `#f4f0e7` | `--color-secondary-foreground` |
| Background | `#f4f0e7` | `#1e1b18` | `--color-background` |
| Foreground | `#1e1b18` | `#f4f0e7` | `--color-foreground` |
| Card | `#faf8f3` | `#2a2622` | `--color-card` |
| Card Foreground | `#1e1b18` | `#f4f0e7` | `--color-card-foreground` |
| Muted | `#e8e0d0` | `#2a2622` | `--color-muted` |
| Muted Foreground | `#5c564e` | `#b8b0a4` | `--color-muted-foreground` |
| Border | `#d4cbb8` | `#3d3731` | `--color-border` |
| Destructive | `#a9362c` | `#c94a3f` | `--color-destructive` |
| On Destructive | `#faf8f3` | `#faf8f3` | `--color-destructive-foreground` |
| Ring | `#a9362c` | `#c94a3f` | `--color-ring` |

**Color Notes:** Paleta de catálogo *Notes & Writing* (`#FFFBEB` + amber) descartada. Claude paper/ink/accent es más literario y coincide con *E-Ink / Paper* + *Nature Distilled* (terracota). Un solo rojo: accent = destructive. Contraste texto normal ≥ 4.5:1 en ambos temas. Nunca hex crudo en componentes: `bg-background`, `text-foreground`, `bg-primary`.

### Typography

- **Heading / manuscrito:** Newsreader (serif, long-form)
- **Body / UI:** Source Sans 3 (sans humanista)
- **Mood:** editorial, bookish, readable — no display fashion
- **Override vs catálogo:** *News Editorial* propone Newsreader + Roboto. Roboto se cambia por Source Sans 3 (mismo CSV, mejor UI para herramienta).
- **Google Fonts:** [Newsreader + Source Sans 3](https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;0,6..72,700;1,6..72,400&family=Source+Sans+3:ital,wght@0,400;0,600;0,700;1,400&display=swap)

**Web:** `next/font/google` en el layout (stack Next.js). **Mobile:** stacks de sistema (`ui-sans-serif` / Georgia) hasta que haga falta pixel-match. No añadir `@expo-google-fonts` sin pedirlo.

### Spacing Variables

*Density: 4/10 — Standard*

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `16px` / `1rem` | Standard padding |
| `--space-lg` | `24px` / `1.5rem` | Section padding |
| `--space-xl` | `32px` / `2rem` | Large gaps |
| `--space-2xl` | `48px` / `3rem` | Section margins |
| `--space-3xl` | `64px` / `4rem` | Hero padding |

Ritmo 4/8. Tailwind default scale cubre esto: no reinventar spacing en config.

### Shadow Depths

Estilo plano + e-ink: sombras mínimas. Editor: ninguna.

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgb(30 27 24 / 0.06)` | Subtle lift |
| `--shadow-md` | `0 4px 6px rgb(30 27 24 / 0.08)` | Cards, dropdowns |
| `--shadow-lg` | none until a modal needs isolation | — |

---

## Component Specs

Clases Tailwind, no CSS de componente. Tokens, no hex.

### Buttons

| Variant | Classes |
|---------|---------|
| primary | `bg-primary text-primary-foreground hover:bg-primary/90` |
| secondary | `border-2 border-primary text-primary hover:bg-secondary` |
| ghost | `text-foreground hover:bg-muted` |
| destructive | igual que primary (mismo rojo) |

Tamaño default: `min-h-11 px-6 py-3 rounded-md text-sm font-semibold`. Transición `duration-200`. Focus: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background`. Disabled: `opacity-50 pointer-events-none`. Touch: ≥44px iOS / ≥48dp Android.

### Cards

`bg-card text-card-foreground border border-border rounded-lg p-6`. Hover: borde, no `translateY` (anti layout-shift).

### Inputs

`h-11 w-full rounded-md border border-input bg-background px-3 text-base`. Focus: `ring-2 ring-ring`. Error: `border-destructive` + texto, no solo color.

### Modals

Overlay `bg-ink/50`. Panel `bg-card rounded-lg p-8 shadow-md max-w-lg`.

---

## Style Guidelines

**Style:** Minimalism & Swiss Style + Flat Design. Secondary: E-Ink / Paper, Swiss Modernism 2.0.

**Keywords:** clean, spacious, functional, typography-first, cream paper, single accent, grid, essential.

**Best For:** writing tools, reading surfaces, documentation, professional tools.

**Key Effects:** hover 200ms opacity/color. Sin glass, neo, gradients, parallax. `prefers-reduced-motion: reduce` anula motion. Ambient typewriter = feature opt-in, no default.

### Page Pattern

**Pattern Name:** Minimal Single Column (`minimal-single-column`)

- **Conversion Strategy:** un CTA primario, copy corto, whitespace
- **CTA Placement:** bajo el hero, no sticky
- **Section Order:** Hero headline > Short description > Benefit cards (3 max) > CTA > Footer
- **Content max:** ~680px para prosa; landing hero puede ir a `max-w-3xl`

### Stack

- **Web:** Next.js 16 + Tailwind CSS v4 (`@theme` en `apps/web/app/globals.css`)
- **Mobile:** Expo + NativeWind 4 + Tailwind v3 (`theme.extend` en `apps/mobile/tailwind.config.js`)
- **Iconos:** Phosphor outline/regular cuando se necesiten. No emoji como icono. No instalar hasta el primer icono real.
- **Dark mode:** clase `.dark` (web). Móvil: mismo hex light de momento; dark cuando exista toggle.

---

## Anti-Patterns (Do NOT Use)

- ❌ Glassmorphism / neumorphism / brutalism / bento showcase en el editor
- ❌ Claymorphism, maximalism, kinetic type, parallax
- ❌ Paleta SaaS azul / amber de catálogo *Notes & Writing*
- ❌ Emojis as icons — SVG (Phosphor)
- ❌ Missing cursor:pointer en clickable web
- ❌ Layout-shifting hovers (scale/translateY en cards)
- ❌ Low contrast text — 4.5:1 mínimo
- ❌ Instant state changes — 150–300ms (salvo e-ink page-turn opt-in)
- ❌ Invisible focus states
- ❌ Hex crudo en JSX (`bg-[#f4f0e7]`, `bg-stone-900`, `text-red-800`)

---

## Pre-Delivery Checklist

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon set (Phosphor)
- [ ] `cursor-pointer` on all clickable elements (web)
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Dark mode: same, independently checked
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars / safe areas
- [ ] No horizontal scroll on mobile
- [ ] Touch targets ≥44pt / ≥48dp
- [ ] Semantic tokens only (`bg-background`, not `bg-stone-100`)
