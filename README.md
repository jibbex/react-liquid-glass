# React Liquid Glass

A React 18+ component that renders a liquid-glass surface with configurable blur, tint, highlight, and optional SVG distortion. The package ships the React component, the CSS that powers the effect, and a demo playground for quick exploration.

## Features

- Component API exposes intensity, tint, ripple, highlight, and distortion controls via props.
- Styling is driven by CSS custom properties so you can override visuals without rebuilding.
- Automatic SVG filter injection when distortion is enabled (no manual defs required).
- TypeScript-first Vite build that emits ESM, CJS, and type declarations in a single step.
- Demo site checked into `demo-dist/` and published through GitHub Pages for reference.

## Installation

```bash
npm install react-liquid-glass

# Peer dependencies if you do not already have them
npm install react react-dom
```

The library declares React 18+ as a peer dependency. Import the stylesheet that ships with the package or replace it with your own.

## Quick start

```tsx
import { LiquidGlass } from 'react-liquid-glass'
import 'react-liquid-glass/styles.css'

export function HeroPane() {
  return (
    <LiquidGlass
      intensity={0.72}
      highlightStrength={0.45}
      ripple={0.3}
      tint="rgba(120, 227, 255, 0.22)"
      highlightColor="rgba(255, 255, 255, 0.85)"
      distortion
      distortionScale={48}
    >
      <span className="rlg-badge">Prototype</span>
      <h2>Liquid interaction surfaces</h2>
      <p>Swap the styles with your production-ready effect implementation.</p>
    </LiquidGlass>
  )
}
```

Importing `react-liquid-glass/styles.css` pulls in the default styling. Copy the rules from `src/styles.css` if you want to customize the gradients, radii, or animation profile.

## Component props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `intensity` | `number` | `0.65` | Overall strength of the diffusion layer (`0` – `1`). |
| `tint` | `string` | `rgba(255, 255, 255, 0.16)` | Base tint applied to the pane background. |
| `highlightColor` | `string` | `rgba(255, 255, 255, 0.6)` | Color used for the sheen overlay. |
| `highlightStrength` | `number` | `0.55` | Amplifies the highlight overlay (`0` – `1`). |
| `blurRadius` | `number` | `36` | Blur radius in pixels for the glass surface. |
| `ripple` | `number` | `0.35` | Opacity applied to the organic noise texture (`0` – `1`). |
| `animated` | `boolean` | `true` | Toggles the preset shimmer animation on the pseudo-elements. |
| `distortion` | `boolean` | `false` | Enables the SVG displacement filter that subtly warps the pane. |
| `distortionFilterId` | `string` | "rlg-distort-filter" | Identifier used when registering the shared SVG filter definition. |
| `distortionScale` | `number` | `36` | Intensity forwarded to the displacement filter (`0` – `120`). |
| `className`, `style`, `children`, `...rest` | HTML `div` props | — | Standard DOM element props forwarded to the container. |

## Styling reference

| Variable | Purpose |
| --- | --- |
| `--rlg-intensity` | Controls blur brightness and shadow strength. |
| `--rlg-tint` | Background tint color for the pane. |
| `--rlg-highlight-strength` | Scales highlight opacity and animation cues. |
| `--rlg-highlight-color` | Color applied to the highlight gradient. |
| `--rlg-blur-radius` | Backdrop blur radius applied to the surface. |
| `--rlg-ripple-opacity` | Visibility of the organic texture overlay. |
| `--rlg-backdrop-filter-prefix` | Internal hook used when distortion is enabled. |
| `--rlg-radius` | Corner radius of the surface container. |
| `--rlg-border-color` | Border color applied to the host element. |
| `--rlg-shadow` | Shadow color used for the drop shadow. |

## Scripts

- `npm run dev` – start the Vite playground served from `src/demo`.
- `npm run build` – type-check and compile the library into `dist/` (ESM, CJS, styles, declarations).
- `npm run build:demo` – bundle the playground into `demo-dist/` for static hosting.
- `npm run preview` – preview the latest playground build locally.
- `npm run test` / `npm run test:watch` – run the Vitest suite against the component.
- `npm run lint` – lint the project with ESLint.
- `npm run typecheck` – run TypeScript against the library configuration.

## Project layout

- `src/lib` – library source distributed on npm (`LiquidGlass.tsx`).
- `src/styles.css` – default styling imported by the component entrypoint.
- `src/demo` – Vite app used to experiment with props and theming.
- `src/__tests__` – Vitest assertions covering prop contracts and CSS variables.
- `demo-dist` – checked-in static demo published via GitHub Pages.
- `vitest.setup.ts` – shared test configuration.

## Deployment

The repository publishes `demo-dist/` to GitHub Pages through `.github/workflows/static.yml` whenever the `main` branch is updated.