import { useState } from 'react'
import { Hologram, Shader } from 'shaders/react'

const logoUrl = `${import.meta.env.BASE_URL}Logo.svg`
const logoShape = { type: 'svgSDF' }
const hologramSettings = {
  brightness: 1.3,
  edgeSoftness: 0.1,
  fill: 0.3,
  edgeGlow: 1.0,
  depthLines: 0.01,
  depthScale: 70,
  scanlines: 0.5,
  scanlineScale: 125,
  sweep: 0.45,
  flicker: 0.15,
  distortion: 0.5,
  grain: 0.5,
  speed: 0.7,
}

type LogoProps = {
  /** Width and height in pixels, capped by the available width. */
  size?: number
}

export function Logo({ size = 320 }: LogoProps) {
  const [status, setStatus] = useState<'loading' | 'ready' | 'unavailable'>('loading')

  return (
    <div
      style={{
        position: 'relative',
        width: size,
        maxWidth: '100%',
        aspectRatio: 1,
        margin: '0 auto',
      }}
      role='img'
      aria-label="Navinn's logo"
      data-effect='Hologram'
      data-status={status}
    >
      {status !== 'ready' && (
        <img
          src={logoUrl}
          alt=''
          style={{
            position: 'absolute',
            left: '14.0625%',
            top: '12.5%',
            width: '71.875%',
            height: '75%',
            objectFit: 'contain',
          }}
        />
      )}
      {status !== 'unavailable' && (
        <Shader
          style={{ position: 'absolute', inset: 0 }}
          onReady={() => setStatus('ready')}
          onUnavailable={() => setStatus('unavailable')}
        >
          <Hologram
            {...hologramSettings}
            shape={logoShape}
            shapeType='svgSDF'
            shapeSdfUrl={`${import.meta.env.BASE_URL}Logo.sdf.bin`}
          />
        </Shader>
      )}
    </div>
  )
}
