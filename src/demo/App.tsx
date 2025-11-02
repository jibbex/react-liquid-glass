import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { LiquidGlass } from '..'
import type { LiquidGlassProps } from '..'
import './App.css'

const PRESETS = {
  daybreak: {
    label: 'Daybreak Mist',
    tint: 'rgba(255, 255, 255, 0.18)',
    highlightColor: 'rgba(248, 250, 255, 0.85)',
  },
  midnight: {
    label: 'Midnight Depths',
    tint: 'rgba(35, 40, 65, 0.35)',
    highlightColor: 'rgba(114, 208, 255, 0.75)',
  },
  aurora: {
    label: 'Aurora Veil',
    tint: 'rgba(120, 227, 255, 0.25)',
    highlightColor: 'rgba(255, 255, 255, 0.9)',
  },
  ember: {
    label: 'Ember Bloom',
    tint: 'rgba(255, 137, 94, 0.25)',
    highlightColor: 'rgba(255, 244, 230, 0.85)',
  },
} as const satisfies Record<string, { label: string; tint: string; highlightColor: string }>

type PresetKey = keyof typeof PRESETS

type GalleryTile = {
  id: string
  src: string
}

const IMAGE_BATCH_SIZE = 12

const createTileBatch = (startIndex: number, count: number): GalleryTile[] =>
  Array.from({ length: count }, (_, offset) => {
    const index = startIndex + offset
    const seed = `${index}-${Math.random().toString(36).slice(2, 10)}`
    const width = 960 + ((index % 4) + 1) * 80
    const height = 640 + ((index % 5) + 1) * 60

    return {
      id: `tile-${seed}`,
      src: `https://picsum.photos/seed/${seed}/${width}/${height}`,
    }
  })

const LazyGalleryTile = ({ src }: { src: string }) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const [shouldLoad, setShouldLoad] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const node = wrapperRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true)
            observerInstance.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin: '320px',
      },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={wrapperRef} className="demo-tile">
      {shouldLoad ? (
        <img
          src={src}
          alt=""
          loading="lazy"
          onLoad={() => setIsReady(true)}
          className={isReady ? 'demo-tile__img demo-tile__img--ready' : 'demo-tile__img'}
        />
      ) : (
        <div className="demo-tile__placeholder" />
      )}
    </div>
  )
}

const BackgroundGallery = () => {
  const requestRef = useRef(false)
  const [tiles, setTiles] = useState<GalleryTile[]>(() =>
    createTileBatch(0, IMAGE_BATCH_SIZE * 3),
  )

  const appendTiles = useCallback(() => {
    if (requestRef.current) return
    requestRef.current = true

    setTiles((current) => {
      const next = [
        ...current,
        ...createTileBatch(current.length, IMAGE_BATCH_SIZE),
      ]
      requestRef.current = false
      return next
    })
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollBuffer = 1200
      const scrollPosition = window.scrollY + window.innerHeight
      const remaining = document.documentElement.scrollHeight - scrollPosition

      if (remaining < scrollBuffer) {
        appendTiles()
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [appendTiles])

  return (
    <div className="demo-background" aria-hidden="true">
      {tiles.map((tile) => (
        <LazyGalleryTile key={tile.id} src={tile.src} />
      ))}
    </div>
  )
}

interface ControlsDrawerProps {
  open: boolean
  onClose: () => void
  presetId: PresetKey
  onPresetChange: (value: PresetKey) => void
  intensity: number
  onIntensityChange: (value: number) => void
  highlightStrength: number
  onHighlightStrengthChange: (value: number) => void
  ripple: number
  onRippleChange: (value: number) => void
  animated: boolean
  onAnimatedChange: (value: boolean) => void
}

const ControlsDrawer = ({
  open,
  onClose,
  presetId,
  onPresetChange,
  intensity,
  onIntensityChange,
  highlightStrength,
  onHighlightStrengthChange,
  ripple,
  onRippleChange,
  animated,
  onAnimatedChange,
}: ControlsDrawerProps) => {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  useEffect(() => {
    if (open) {
      closeButtonRef.current?.focus()
    }
  }, [open])

  return (
    <aside
      id="demo-controls-drawer"
      className={open ? 'demo-drawer demo-drawer--open' : 'demo-drawer'}
      aria-hidden={!open}
      aria-live="polite"
      role="complementary"
    >
      <div className="demo-drawer__header">
        <h2>Interactive controls</h2>
        <button
          ref={closeButtonRef}
          type="button"
          className="demo-drawer__close"
          onClick={onClose}
        >
          <span className="sr-only">Close controls</span>
          ×
        </button>
      </div>

      <div className="demo-drawer__body">
        <div className="demo-slider">
          <label className="demo-control">
            <span className="demo-control__label">Intensity</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={intensity}
              onChange={(event) => onIntensityChange(Number(event.currentTarget.value))}
            />
            <output>{intensity.toFixed(2)}</output>
          </label>

          <label className="demo-control">
            <span className="demo-control__label">Highlight strength</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={highlightStrength}
              onChange={(event) =>
                onHighlightStrengthChange(Number(event.currentTarget.value))
              }
            />
            <output>{highlightStrength.toFixed(2)}</output>
          </label>

          <label className="demo-control">
            <span className="demo-control__label">Ripple texture</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={ripple}
              onChange={(event) => onRippleChange(Number(event.currentTarget.value))}
            />
            <output>{ripple.toFixed(2)}</output>
          </label>
        </div>

        <div className="demo-toggle">
          <input
            id="demo-motion-toggle"
            type="checkbox"
            checked={animated}
            onChange={(event) => onAnimatedChange(event.currentTarget.checked)}
          />
          <label htmlFor="demo-motion-toggle">
            {animated ? 'Animated surface' : 'Static surface'}
          </label>
        </div>

        <div className="demo-presets" role="list">
          {(Object.keys(PRESETS) as PresetKey[]).map((key) => {
            const option = PRESETS[key]
            const selected = key === presetId

            return (
              <button
                key={key}
                type="button"
                role="listitem"
                className={selected ? 'demo-preset demo-preset--active' : 'demo-preset'}
                onClick={() => onPresetChange(key)}
              >
                <span>{option.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </aside>
  )
}

const App = () => {
  const [controlsOpen, setControlsOpen] = useState(false)
  const [presetId, setPresetId] = useState<PresetKey>('daybreak')
  const [intensity, setIntensity] = useState(0.65)
  const [highlightStrength, setHighlightStrength] = useState(0.55)
  const [ripple, setRipple] = useState(0.35)
  const [animated, setAnimated] = useState(true)

  const preset = PRESETS[presetId]

  const glassProps = useMemo<Partial<LiquidGlassProps>>(
    () => ({
      tint: preset.tint,
      highlightColor: preset.highlightColor,
      intensity,
      highlightStrength,
      ripple,
      animated,
    }),
    [preset.tint, preset.highlightColor, intensity, highlightStrength, ripple, animated],
  )

  const toggleControls = () => setControlsOpen((current) => !current)
  const closeControls = () => setControlsOpen(false)

  return (
    <div className="demo-shell">
      <BackgroundGallery />

      <button
        type="button"
        className="demo-controls-toggle"
        onClick={toggleControls}
        aria-expanded={controlsOpen}
        aria-controls="demo-controls-drawer"
      >
        <span className="demo-controls-toggle__indicator" aria-hidden="true" />
        Surface parameters
      </button>

      <div className="demo-overlay">
        <div className="demo-overlay__frame">
          <header style={{ width: 'clamp(300px, 50vw, 600px)', justifySelf: 'end' }}>
            <LiquidGlass distortion distortionScale={48} className="demo-liquid" {...glassProps}>
              <h1>React Liquid Glass</h1>
              <p>
                Fix the showcase to the viewport and let the world shimmer behind it.
                Tweak the parameters and watch the surface react while new scenes
                slide by.
              </p>
            </LiquidGlass>
          </header>

          <section className="demo-hero" aria-label="Liquid glass preview">
            <LiquidGlass distortion distortionScale={48} className="demo-liquid" {...glassProps}>
              <span className="rlg-badge">Preview</span>
              <h2>Immersive glassmorphism, distilled.</h2>
              <p>
                Layer fluid reflections, subtle shimmer, and accent lighting to
                craft tactile interfaces. The component handles the heavy lifting
                so you can swap in your own effect implementation.
              </p>
              <div className="demo-actions">
                <a
                  className="demo-button demo-button--primary"
                  href="https://github.com/your-org/react-liquid-glass"
                  target="_blank"
                  rel="noreferrer"
                >
                  View Repository
                </a>
                <a
                  className="demo-button"
                  href="https://michm.de/liquid-glass/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Inspiration
                </a>
              </div>
            </LiquidGlass>
          </section>

          <footer style={{ width: 'clamp(300px, 50vw, 600px)', justifySelf: 'start' }}>
            <LiquidGlass distortion distortionScale={48} className="demo-liquid" {...glassProps}>
              <small>
                Built for internal QA. Replace the component implementation with your
                production effect before release.
              </small>
            </LiquidGlass>
          </footer>
        </div>
      </div>

      <ControlsDrawer
        open={controlsOpen}
        onClose={closeControls}
        presetId={presetId}
        onPresetChange={setPresetId}
        intensity={intensity}
        onIntensityChange={setIntensity}
        highlightStrength={highlightStrength}
        onHighlightStrengthChange={setHighlightStrength}
        ripple={ripple}
        onRippleChange={setRipple}
        animated={animated}
        onAnimatedChange={setAnimated}
      />
    </div>
  )
}

export default App
