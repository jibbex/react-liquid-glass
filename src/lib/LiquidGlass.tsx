import { forwardRef, useEffect, useMemo } from 'react'
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'
import '../styles.css'

export type LiquidGlassRef = HTMLDivElement

export interface LiquidGlassProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children?: ReactNode
  /**
   * Strength of the diffusion layer between 0 (disabled) and 1 (maximum).
   */
  intensity?: number
  /**
   * Base tint used for the glass surface. Accepts any valid CSS color value.
   */
  tint?: string
  /**
   * Highlight color blended into the glass sheen.
   */
  highlightColor?: string
  /**
   * Strength of the highlight between 0 (hidden) and 1 (fully visible).
   */
  highlightStrength?: number
  /**
   * Blur radius applied to the glass pane in pixels.
   */
  blurRadius?: number
  /**
   * Opacity of the organic distortion noise between 0 and 1.
   */
  ripple?: number
  /**
   * Enables subtle motion cues for the highlight and noise layers.
   */
  animated?: boolean
  /**
   * Enables the SVG displacement filter beneath the surface.
   */
  distortion?: boolean
  /**
   * Identifier of the SVG filter that should be used for displacement.
   */
  distortionFilterId?: string
  /**
   * Intensity scale forwarded to the displacement filter.
   */
  distortionScale?: number
}

type LiquidGlassCSSVariables = CSSProperties & {
  '--rlg-intensity'?: string
  '--rlg-tint'?: string
  '--rlg-highlight-color'?: string
  '--rlg-highlight-strength'?: string
  '--rlg-blur-radius'?: string
  '--rlg-ripple-opacity'?: string
  '--rlg-backdrop-filter-prefix'?: string
}

const clamp = (value: number, min: number, max: number) => {
  if (Number.isNaN(value)) return min
  return Math.min(Math.max(value, min), max)
}

const mergeClassNames = (...values: Array<string | undefined>) =>
  values.filter(Boolean).join(' ')

const injectDistortionFilter = (
  filterId: string,
  distortionScale: number,
) => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return
  }

  const normalizedScale = Math.min(Math.max(Math.abs(distortionScale), 0), 120)

  const existing = document.getElementById(filterId) as SVGFilterElement | null
  if (existing) {
    const displacementNode = existing.querySelector('feDisplacementMap')
    if (displacementNode) {
      displacementNode.setAttribute('scale', normalizedScale.toString())
    }
    return
  }

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('aria-hidden', 'true')
  svg.setAttribute('focusable', 'false')
  svg.style.position = 'absolute'
  svg.style.width = '0'
  svg.style.height = '0'
  svg.style.visibility = 'hidden'

  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
  const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter')
  filter.id = filterId
  svg.setAttribute('data-rlg-filter', filterId)

  const turbulence = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'feTurbulence',
  )
  turbulence.setAttribute('type', 'fractalNoise')
  turbulence.setAttribute('baseFrequency', '0.004 0.0055')
  turbulence.setAttribute('numOctaves', '2')
  turbulence.setAttribute('seed', '7')
  turbulence.setAttribute('result', 'distortNoise')

  const blur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur')
  blur.setAttribute('in', 'distortNoise')
  blur.setAttribute('stdDeviation', '6.5')
  blur.setAttribute('result', 'softNoise')

  const displacement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'feDisplacementMap',
  )
  displacement.setAttribute('in', 'SourceGraphic')
  displacement.setAttribute('in2', 'softNoise')
  displacement.setAttribute('scale', normalizedScale.toString())
  displacement.setAttribute('xChannelSelector', 'R')
  displacement.setAttribute('yChannelSelector', 'G')

  filter.appendChild(turbulence)
  filter.appendChild(blur)
  filter.appendChild(displacement)
  defs.appendChild(filter)
  svg.appendChild(defs)
  document.body.appendChild(svg)
}

export const LiquidGlass = forwardRef<LiquidGlassRef, LiquidGlassProps>(
  (
    {
      children,
      className,
      style,
      intensity = 0.65,
      ripple = 0.35,
      blurRadius = 36,
      tint = 'rgba(255, 255, 255, 0.16)',
      highlightColor = 'rgba(255, 255, 255, 0.6)',
      highlightStrength = 0.55,
      animated = true,
      distortion = false,
      distortionFilterId = 'rlg-distort-filter',
      distortionScale = 36,
      ...rest
    },
    ref,
  ) => {
    const variables = useMemo<LiquidGlassCSSVariables>(() => {
      const cssVariables: LiquidGlassCSSVariables = {}

      cssVariables['--rlg-intensity'] = clamp(intensity, 0, 1).toFixed(3)
      cssVariables['--rlg-ripple-opacity'] = clamp(ripple, 0, 1).toFixed(3)
      cssVariables['--rlg-highlight-strength'] = clamp(
        highlightStrength,
        0,
        1,
      ).toFixed(3)
      cssVariables['--rlg-blur-radius'] = `${clamp(blurRadius, 0, 120).toFixed(
        0,
      )}px`
      cssVariables['--rlg-highlight-color'] = highlightColor
      cssVariables['--rlg-tint'] = tint
      cssVariables['--rlg-backdrop-filter-prefix'] = distortion
        ? `url(#${distortionFilterId}) `
        : ''

      return cssVariables
    }, [
      intensity,
      ripple,
      blurRadius,
      tint,
      highlightColor,
      highlightStrength,
      distortion,
      distortionFilterId,
    ])

    const composedStyle: CSSProperties = {
      ...variables,
      ...style,
    }

    useEffect(() => {
      if (!distortion) {
        return
      }

      const normalized = clamp(distortionScale, -120, 120)
      injectDistortionFilter(distortionFilterId, normalized)
    }, [distortion, distortionFilterId, distortionScale])

    return (
      <div
        ref={ref}
        data-liquid-glass=""
        data-liquid-glass-animated={animated ? '' : undefined}
        data-liquid-glass-distortion={distortion ? '' : undefined}
        className={mergeClassNames('rlg-surface', className)}
        style={composedStyle}
        {...rest}
      >
        {children}
      </div>
    )
  }
)

LiquidGlass.displayName = 'LiquidGlass'

export default LiquidGlass
