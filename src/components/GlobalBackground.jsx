import globalBg from '../assets/global.bg.jpeg'

/**
 * GlobalBackground
 * 
 * Sophisticated, subtle background image treatment across website pages.
 * 
 * Treatment Highlights:
 * 1. Grayscale & Contrast: Pure monochromatic appearance with balanced contrast.
 * 2. Understated Opacity: Calibrated between 5% and 6.5% for an editorial watermark feel.
 * 3. Soft Multiply Blending: Multiplies into the warm background palette (#FDFBF7, #F5EFE6, #F4EFE6).
 * 4. Radial Vignette Mask: Feathers boundaries to prevent visible edge lines.
 * 5. Non-Intrusive: Fixed positioning with pointer-events-none and zero layout shift.
 */
const GlobalBackground = () => {
  return (
    <div
      data-global-bg="true"
      aria-hidden="true"
      role="presentation"
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden select-none"
    >
      <img
        src={globalBg}
        alt=""
        className="h-full w-full object-cover object-center grayscale contrast-[1.12] opacity-[0.05] sm:opacity-[0.06] mix-blend-multiply"
        style={{
          maskImage: 'radial-gradient(ellipse at 50% 45%, black 45%, rgba(0,0,0,0.5) 75%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 45%, black 45%, rgba(0,0,0,0.5) 75%, transparent 100%)',
        }}
      />
    </div>
  )
}

export default GlobalBackground
