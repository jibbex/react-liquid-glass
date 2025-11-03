import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import LiquidGlass from '..'
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

const isFirefox = navigator.userAgent.includes('Firefox');

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
  distortion: boolean
  onDistortionChange: (value: boolean) => void
  distortionScale: number
  onDistortionScaleChange: (value: number) => void
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
  distortion,
  onDistortionChange,
  distortionScale,
  onDistortionScaleChange,
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


          <label className="demo-control" aria-disabled={!distortion}>
            <span className="demo-control__label">Distortion scale</span>
            <input
              type="range"
              min="0"
              max="120"
              step="1"
              value={distortionScale}
              onChange={(event) =>
                onDistortionScaleChange(Number(event.currentTarget.value))
              }
              disabled={!distortion || isFirefox}
            />
            <output>{distortionScale.toFixed(0)}</output>
          </label>
        </div>

        <div className="demo-toggle-group">
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

          <div className="demo-toggle">
            <input
              id="demo-distortion-toggle"
              type="checkbox"
              checked={distortion && !isFirefox}
              disabled={isFirefox}
              onChange={(event) => onDistortionChange(event.currentTarget.checked)}
            />
            <label htmlFor="demo-distortion-toggle">
              {distortion ? 'Distortion enabled' : 'Distortion disabled'}
            </label>
          </div>
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
  const [distortion, setDistortion] = useState(!isFirefox)
  const [distortionScale, setDistortionScale] = useState(48)
  const preset = PRESETS[presetId]

  const glassProps = useMemo<Partial<LiquidGlassProps>>(
    () => ({
      tint: preset.tint,
      highlightColor: preset.highlightColor,
      intensity,
      highlightStrength,
      ripple,
      animated,
      distortion,
      distortionScale,
    }),
    [
      preset.tint,
      preset.highlightColor,
      intensity,
      highlightStrength,
      ripple,
      animated,
      distortion,
      distortionScale,
    ],
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
            <LiquidGlass className="demo-liquid" {...glassProps}>
              <h1>React Liquid Glass</h1>
              <p>
                Fix the showcase to the viewport and let the world shimmer behind it.
                Tweak the parameters and watch the surface react while new scenes
                slide by.
              </p>
            </LiquidGlass>
          </header>

          <section className="demo-hero" aria-label="Liquid glass preview">
            <LiquidGlass className="demo-liquid" {...glassProps}>
              <span className="rlg-badge">Preview</span>
              <h2>Immersive glassmorphism, distilled.</h2>
              <p>
                A React 18+ component that renders a liquid-glass surface with configurable blur, tint, 
                highlight, and optional SVG distortion. The package ships the React component, the CSS 
                that powers the effect, and a demo playground for quick exploration.
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
            <LiquidGlass className="demo-liquid" style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}} {...glassProps}>
              <a href="https://github.com/jibbex/react-liquid-glass" target="_blank" rel="noreferrer">
                <div style={{ width: '42px', height: '42px' }}>
                  <svg 
                    fill="currentColor" 
                    viewBox="0 -0.5 25 25" 
                    xmlns="http://www.w3.org/2000/svg">
                      <path 
                        d="m12.301 0h.093c2.242 0 4.34.613 6.137 1.68l-.055-.031c1.871 1.094 3.386 2.609 4.449 4.422l.031.058c1.04 1.769 1.654 3.896 1.654 6.166 0 5.406-3.483 10-8.327 11.658l-.087.026c-.063.02-.135.031-.209.031-.162 0-.312-.054-.433-.144l.002.001c-.128-.115-.208-.281-.208-.466 0-.005 0-.01 0-.014v.001q0-.048.008-1.226t.008-2.154c.007-.075.011-.161.011-.249 0-.792-.323-1.508-.844-2.025.618-.061 1.176-.163 1.718-.305l-.076.017c.573-.16 1.073-.373 1.537-.642l-.031.017c.508-.28.938-.636 1.292-1.058l.006-.007c.372-.476.663-1.036.84-1.645l.009-.035c.209-.683.329-1.468.329-2.281 0-.045 0-.091-.001-.136v.007c0-.022.001-.047.001-.072 0-1.248-.482-2.383-1.269-3.23l.003.003c.168-.44.265-.948.265-1.479 0-.649-.145-1.263-.404-1.814l.011.026c-.115-.022-.246-.035-.381-.035-.334 0-.649.078-.929.216l.012-.005c-.568.21-1.054.448-1.512.726l.038-.022-.609.384c-.922-.264-1.981-.416-3.075-.416s-2.153.152-3.157.436l.081-.02q-.256-.176-.681-.433c-.373-.214-.814-.421-1.272-.595l-.066-.022c-.293-.154-.64-.244-1.009-.244-.124 0-.246.01-.364.03l.013-.002c-.248.524-.393 1.139-.393 1.788 0 .531.097 1.04.275 1.509l-.01-.029c-.785.844-1.266 1.979-1.266 3.227 0 .025 0 .051.001.076v-.004c-.001.039-.001.084-.001.13 0 .809.12 1.591.344 2.327l-.015-.057c.189.643.476 1.202.85 1.693l-.009-.013c.354.435.782.793 1.267 1.062l.022.011c.432.252.933.465 1.46.614l.046.011c.466.125 1.024.227 1.595.284l.046.004c-.431.428-.718 1-.784 1.638l-.001.012c-.207.101-.448.183-.699.236l-.021.004c-.256.051-.549.08-.85.08-.022 0-.044 0-.066 0h.003c-.394-.008-.756-.136-1.055-.348l.006.004c-.371-.259-.671-.595-.881-.986l-.007-.015c-.198-.336-.459-.614-.768-.827l-.009-.006c-.225-.169-.49-.301-.776-.38l-.016-.004-.32-.048c-.023-.002-.05-.003-.077-.003-.14 0-.273.028-.394.077l.007-.003q-.128.072-.08.184c.039.086.087.16.145.225l-.001-.001c.061.072.13.135.205.19l.003.002.112.08c.283.148.516.354.693.603l.004.006c.191.237.359.505.494.792l.01.024.16.368c.135.402.38.738.7.981l.005.004c.3.234.662.402 1.057.478l.016.002c.33.064.714.104 1.106.112h.007c.045.002.097.002.15.002.261 0 .517-.021.767-.062l-.027.004.368-.064q0 .609.008 1.418t.008.873v.014c0 .185-.08.351-.208.466h-.001c-.119.089-.268.143-.431.143-.075 0-.147-.011-.214-.032l.005.001c-4.929-1.689-8.409-6.283-8.409-11.69 0-2.268.612-4.393 1.681-6.219l-.032.058c1.094-1.871 2.609-3.386 4.422-4.449l.058-.031c1.739-1.034 3.835-1.645 6.073-1.645h.098-.005zm-7.64 17.666q.048-.112-.112-.192-.16-.048-.208.032-.048.112.112.192.144.096.208-.032zm.497.545q.112-.08-.032-.256-.16-.144-.256-.048-.112.08.032.256.159.157.256.047zm.48.72q.144-.112 0-.304-.128-.208-.272-.096-.144.08 0 .288t.272.112zm.672.673q.128-.128-.064-.304-.192-.192-.32-.048-.144.128.064.304.192.192.32.044zm.913.4q.048-.176-.208-.256-.24-.064-.304.112t.208.24q.24.097.304-.096zm1.009.08q0-.208-.272-.176-.256 0-.256.176 0 .208.272.176.256.001.256-.175zm.929-.16q-.032-.176-.288-.144-.256.048-.224.24t.288.128.225-.224z" 
                      />
                  </svg>
                </div>
              </a>
              <small>
                React Liquid Glass
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
        distortion={distortion}
        onDistortionChange={setDistortion}
        distortionScale={distortionScale}
        onDistortionScaleChange={setDistortionScale}
      />
    </div>
  )
}

export default App
