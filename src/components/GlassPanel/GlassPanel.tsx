import { useId, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { DiffuseBlur, ImageTexture } from 'shaders/react'
import styles from './GlassPanel.module.css'

const emptyMask =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVR4nGNgAAIAAAUAAXpeqz8AAAAASUVORK5CYII='

function createPanelOutline(width: number, height: number, curvature: number) {
  const radius = Math.min(40, Math.min(width, height) * 0.08)
  const points: string[] = []
  const addPoint = (x: number, y: number) => {
    const nx = (2 * x) / width - 1
    const ny = (2 * y) / height - 1
    const amount = curvature * 0.25 * (nx * nx + ny * ny)
    let scale = 1

    // Invert the reference's sampling curve to locate the visible screen edge.
    for (let i = 0; i < 6; i++) {
      scale -= (scale + amount * scale ** 3 - 1) / (1 + 3 * amount * scale ** 2)
    }

    points.push(
      `${((width * (nx * scale + 1)) / 2).toFixed(3)},${((height * (ny * scale + 1)) / 2).toFixed(3)}`,
    )
  }
  const corners = [
    [width - radius, radius, -Math.PI / 2],
    [width - radius, height - radius, 0],
    [radius, height - radius, Math.PI / 2],
    [radius, radius, Math.PI],
  ]

  for (let corner = 0; corner < corners.length; corner++) {
    const [cx, cy, start] = corners[corner]
    for (let step = 0; step <= 16; step++) {
      const angle = start + (step * Math.PI) / 32
      addPoint(cx + radius * Math.cos(angle), cy + radius * Math.sin(angle))
    }

    const end = start + Math.PI / 2
    const x = cx + radius * Math.cos(end)
    const y = cy + radius * Math.sin(end)
    const [nextX, nextY, nextStart] = corners[(corner + 1) % corners.length]
    const targetX = nextX + radius * Math.cos(nextStart)
    const targetY = nextY + radius * Math.sin(nextStart)
    for (let step = 1; step <= 32; step++) {
      addPoint(x + ((targetX - x) * step) / 32, y + ((targetY - y) * step) / 32)
    }
  }

  return `M ${points.join(' L ')} Z`
}

function createDisplacementMap(width: number, height: number) {
  const size = 256
  const extent = Math.max(width, height)
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const context = canvas.getContext('2d')!
  const image = context.createImageData(size, size)

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const nx = (2 * x) / (size - 1) - 1
      const ny = (2 * y) / (size - 1) - 1
      const radiusSquared = (nx * nx + ny * ny) / 2
      const offset = (y * size + x) * 4

      // Both channels share one pixel scale. Encode each axis's actual size so
      // vertical displacement follows height even when the viewport is tall.
      image.data[offset] = Math.round(127.5 + (127.5 * nx * radiusSquared * width) / extent)
      image.data[offset + 1] = Math.round(127.5 + (127.5 * ny * radiusSquared * height) / extent)
      image.data[offset + 2] = 128
      image.data[offset + 3] = 255
    }
  }

  context.putImageData(image, 0, 0)
  return canvas.toDataURL()
}

export function GlassPanel({
  children,
  curvature = 0.2,
}: {
  children: ReactNode
  curvature?: number
}) {
  const distortionId = useId()
  const outlineId = `${distortionId}-outline`
  const maskId = `${distortionId}-blur-mask`
  const borderGradientId = `${distortionId}-border-gradient`
  const frameRef = useRef<HTMLDivElement>(null)
  const [geometry, setGeometry] = useState({
    width: 0,
    height: 0,
    outline: '',
    displacementMap: '',
    mask: '',
  })

  useLayoutEffect(() => {
    const frame = frameRef.current!
    let previousBounds = ''
    const updateGeometry = () => {
      const { x, y, width, height } = frame.getBoundingClientRect()
      const viewportWidth = document.documentElement.clientWidth
      const viewportHeight = window.innerHeight
      const bounds = `${x},${y},${width},${height},${viewportWidth},${viewportHeight}`
      if (!width || !height || bounds === previousBounds) return
      previousBounds = bounds
      const outline = createPanelOutline(width, height, curvature)
      // Use the same outline for the shader's blur region and the HTML panel.
      const mask = document.createElement('canvas')
      mask.width = viewportWidth
      mask.height = viewportHeight
      const context = mask.getContext('2d')!
      context.fillStyle = '#fff'
      context.translate(x, y)
      context.fill(new Path2D(outline))
      setGeometry({
        width,
        height,
        outline,
        displacementMap: createDisplacementMap(width, height),
        mask: mask.toDataURL(),
      })
    }
    updateGeometry()
    const observer = new ResizeObserver(updateGeometry)
    observer.observe(frame)
    window.addEventListener('resize', updateGeometry)
    window.addEventListener('scroll', updateGeometry, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateGeometry)
      window.removeEventListener('scroll', updateGeometry)
    }
  }, [curvature])

  return (
    <>
      <ImageTexture id={maskId} url={geometry.mask || emptyMask} objectFit='fill' visible={false} />
      <DiffuseBlur
        intensity={{
          type: 'map',
          source: maskId,
          channel: 'alpha',
          inputMin: 0,
          inputMax: 1,
          outputMin: 0,
          outputMax: 50,
        }}
        edges='mirror'
      />
      <div
        className={styles.container}
        style={
          {
            '--panel-distortion': `url(#${distortionId})`,
            '--panel-outline': `url(#${outlineId})`,
          } as CSSProperties
        }
      >
        <svg className={styles.definitions} aria-hidden='true' focusable='false'>
          <defs>
            <filter
              id={distortionId}
              filterUnits='userSpaceOnUse'
              primitiveUnits='userSpaceOnUse'
              x='0'
              y='0'
              width={geometry.width}
              height={geometry.height}
              colorInterpolationFilters='sRGB'
            >
              <feImage
                href={geometry.displacementMap || undefined}
                x='0'
                y='0'
                width={geometry.width}
                height={geometry.height}
                preserveAspectRatio='none'
                result='displacement'
              />
              <feDisplacementMap
                in='SourceGraphic'
                in2='displacement'
                // Match the reference in pixels, using one scale for both axes.
                scale={(curvature * Math.max(geometry.width, geometry.height)) / 2}
                xChannelSelector='R'
                yChannelSelector='G'
              />
            </filter>
            <clipPath id={outlineId} clipPathUnits='userSpaceOnUse'>
              <path d={geometry.outline} />
            </clipPath>
          </defs>
        </svg>
        <div className={styles.surround}>
          <div ref={frameRef} className={styles.frame}>
            <div className={styles.surface}>
              <div className={styles.content}>{children}</div>
            </div>
          </div>
          {geometry.width > 0 && geometry.height > 0 && (
            <svg
              className={styles.border}
              viewBox={`0 0 ${geometry.width} ${geometry.height}`}
              aria-hidden='true'
              focusable='false'
            >
              <defs>
                <linearGradient id={borderGradientId} x1='0%' y1='0%' x2='100%' y2='100%'>
                  <stop offset='20%' stopColor='#e34c26' />
                  <stop offset='80%' stopColor='#3261ae' />
                </linearGradient>
              </defs>
              <path
                className={styles.borderGlow}
                d={geometry.outline}
                fill='none'
                stroke={`url(#${borderGradientId})`}
                strokeWidth='4.5'
              />
              <path
                d={geometry.outline}
                fill='none'
                stroke={`url(#${borderGradientId})`}
                strokeWidth='3.75'
                opacity='0.75'
              />
            </svg>
          )}
        </div>
      </div>
    </>
  )
}
