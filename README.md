# React Liquid Glass

> A React component library that encapsulates the wiring for a liquid-glass UI panel. Bring your own shader, gradients, or motion – this package only lays the groundwork.

## Highlights

- 🎛️ **Composable API** – tune intensity, tint, ripple, highlight, and distortion controls via props.
- 🎨 **Style scaffolding** – ships with opinionated CSS variables and pseudo-elements so you can plug in your visual effect quickly.
- 🧪 **Ready for CI** – Vitest, ESLint, and GitHub Actions are preconfigured for continuous verification.
- 🧱 **Library-first build** – Vite library mode with TypeScript declarations for painless distribution.

## Installation

```bash
npm install react-liquid-glass
# or
yarn add react-liquid-glass
```

The library declares `react` and `react-dom` as peer dependencies. Ensure your project provides React 18 or newer.

## Usage

```tsx
import { LiquidGlass } from 'react-liquid-glass'
import 'react-liquid-glass/styles.css'

export const HeroPane = () => (
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
```

### Component props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `intensity` | `number` | `0.65` | Overall strength of the diffusion layer (`0` – `1`). |
| `tint` | `string` | `rgba(255, 255, 255, 0.16)` | Base tint applied to the pane background. |
| `highlightColor` | `string` | `rgba(255, 255, 255, 0.6)` | Color used for the sheen overlay. |
| `highlightStrength` | `number` | `0.55` | Amplifies the highlight overlay (`0` – `1`). |
| `blurRadius` | `number` | `36` | Blur radius in pixels for the glass surface. |
| `ripple` | `number` | `0.35` | Opacity applied to the organic noise texture (`0` – `1`). |
| `animated` | `boolean` | `true` | Toggles the preset shimmer animation. |
| `distortion` | `boolean` | `false` | Enables the SVG displacement filter that subtly warps the pane. |
| `distortionFilterId` | `string` | `'rlg-distort-filter'` | Identifier used when registering the shared SVG filter definition. |
| `distortionScale` | `number` | `36` | Strength passed to the filter’s displacement map (`0` – `120`). |
| `className`, `style`, `...rest` | inherited from `HTMLDivElement` | — | Standard DOM element props forwarded to the container. |

## Local development

- `npm run dev` – launches the interactive playground inspired by [Mich Michaels’ Liquid Glass demo](https://michm.de/liquid-glass/).
- `npm run build` – emits the bundled library (`dist/react-liquid-glass.*`) and TypeScript declarations (`dist/types`).
- `npm run test` / `npm run test:watch` – runs the Vitest suite under JSDOM.
- `npm run lint` – lints all TypeScript sources with ESLint and the React Compiler plugin.

## Continuous integration

The repository includes a GitHub Actions workflow (`.github/workflows/ci.yml`) that runs linting, unit tests, and the production build on every push and pull request.

## Project layout

- `src/lib` – library source code shipped to consumers.
- `src/demo` – bundled playground showcasing the component in action.
- `src/__tests__` – Vitest unit tests covering the component contract.
- `vitest.setup.ts` – shared testing utilities.

## Next steps

Replace the placeholder styling in `src/styles.css` with your production liquid glass effect. The component already exposes the core CSS variables and data attributes you'll need to hook in bespoke shaders, WebGL canvases, or animated gradients.
