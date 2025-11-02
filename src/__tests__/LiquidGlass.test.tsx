import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { LiquidGlass } from '../lib/LiquidGlass'

describe('LiquidGlass', () => {
  afterEach(() => {
    cleanup()
    document
      .querySelectorAll('svg[data-rlg-filter]')
      .forEach((node) => node.parentElement?.removeChild(node))
  })

  it('renders children content', () => {
    render(<LiquidGlass>Liquid surface</LiquidGlass>)

    expect(screen.getByText('Liquid surface')).toBeInTheDocument()
  })

  it('maps component props to CSS custom properties', () => {
    render(
      <LiquidGlass
        data-testid="glass"
        intensity={0.42}
        highlightStrength={0.23}
        ripple={0.15}
        blurRadius={48}
        tint="rgba(255, 200, 255, 0.2)"
      >
        Observability
      </LiquidGlass>,
    )

    const element = screen.getByTestId('glass')

    expect(element).toHaveAttribute('data-liquid-glass')
    expect(element.style.getPropertyValue('--rlg-intensity')).toBe('0.420')
    expect(element.style.getPropertyValue('--rlg-highlight-strength')).toBe('0.230')
    expect(element.style.getPropertyValue('--rlg-ripple-opacity')).toBe('0.150')
    expect(element.style.getPropertyValue('--rlg-blur-radius')).toBe('48px')
    expect(element.style.getPropertyValue('--rlg-tint')).toBe('rgba(255, 200, 255, 0.2)')
  })

  it('disables animated behaviour when requested', () => {
    render(
      <LiquidGlass data-testid="static-glass" animated={false}>
        Static panel
      </LiquidGlass>,
    )

    const element = screen.getByTestId('static-glass')

    expect(element).not.toHaveAttribute('data-liquid-glass-animated')
  })

  it('injects and links the distortion filter when enabled', () => {
    render(
      <LiquidGlass
        data-testid="distort"
        distortion
        distortionFilterId="test-distort-filter"
        distortionScale={42}
      >
        Distorted
      </LiquidGlass>,
    )

    const element = screen.getByTestId('distort')
    expect(element.dataset.liquidGlassDistortion).toBe('')
    expect(element.style.getPropertyValue('--rlg-backdrop-filter-prefix')).toBe('url(#test-distort-filter) ')

    const filter = document.getElementById('test-distort-filter')
    expect(filter).toBeTruthy()
    expect(filter?.querySelector('feDisplacementMap')?.getAttribute('scale')).toBe('42')
  })
})
