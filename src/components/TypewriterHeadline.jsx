import { useState, useEffect } from 'react'
import { TypeAnimation } from 'react-type-animation'

const TypewriterHeadline = ({
  titleStart = '',
  titleHighlight = '',
  titleEnd = '',
  isActive = false,
  resetKey = 0,
}) => {

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = (e) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const [isSplashActive, setIsSplashActive] = useState(() => {
    if (typeof document === 'undefined') return false
    return !!document.querySelector('div[role="status"].fixed.inset-0')
  })

  useEffect(() => {
    if (!isSplashActive) return
    const observer = new MutationObserver(() => {
      if (!document.querySelector('div[role="status"].fixed.inset-0')) {
        setIsSplashActive(false)
        observer.disconnect()
      }
    })
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [isSplashActive])

  const [prevSlideKey, setPrevSlideKey] = useState(`${isActive}-${resetKey}`)
  const [step, setStep] = useState(0)

  if (prevSlideKey !== `${isActive}-${resetKey}`) {
    setPrevSlideKey(`${isActive}-${resetKey}`)
    setStep(0)
  }

  // Derive active step, automatically skipping empty segments
  let activeStep = step
  if (activeStep === 0 && !titleStart) activeStep = 1
  if (activeStep === 1 && !titleHighlight) activeStep = 2
  if (activeStep === 2 && !titleEnd) activeStep = 3

  const fullText = `${titleStart}${titleHighlight}${titleEnd}`
  const shouldAnimate = isActive && !isSplashActive

  // Reduced motion: immediate full text display without animation
  if (prefersReducedMotion) {
    return (
      <>
        <span className="sr-only">{fullText}</span>
        <span aria-hidden="true" className="whitespace-pre-wrap">
          <span>{titleStart}</span>
          <span className="font-serif italic font-light text-[#8C6D58]">{titleHighlight}</span>
          <span>{titleEnd}</span>
        </span>
      </>
    )
  }

  return (
    <>
      {/* Screen reader complete immediate text for accessibility */}
      <span className="sr-only">{fullText}</span>

      {/* Visual representation with locked layout reservation to prevent CLS */}
      <span aria-hidden="true" className="inline-grid grid-cols-1 grid-rows-1 whitespace-pre-wrap">
        {/* Invisible layout reservation layer: matches full text dimensions exactly */}
        <span className="col-start-1 row-start-1 invisible select-none pointer-events-none" aria-hidden="true">
          <span>{titleStart}</span>
          <span className="font-serif italic font-light text-[#8C6D58]">{titleHighlight}</span>
          <span>{titleEnd}</span>
        </span>

        {/* Visible animated typing layer */}
        <span className="col-start-1 row-start-1">
          {shouldAnimate && (
            <>
              {activeStep === 0 && titleStart ? (
                <TypeAnimation
                  key={`start-${resetKey}`}
                  sequence={[
                    titleStart,
                    () => setStep(1),
                  ]}
                  speed={{ type: 'keyStrokeDelayInMs', value: 40 }}
                  cursor={true}
                  wrapper="span"
                  className="typewriter-cursor"
                />
              ) : activeStep > 0 && titleStart ? (
                <span>{titleStart}</span>
              ) : null}

              {/* Segment 2: titleHighlight */}
              {activeStep === 1 && titleHighlight ? (
                <TypeAnimation
                  key={`highlight-${resetKey}`}
                  sequence={[
                    titleHighlight,
                    () => setStep(2),
                  ]}
                  speed={{ type: 'keyStrokeDelayInMs', value: 40 }}
                  cursor={true}
                  wrapper="span"
                  className="font-serif italic font-light text-[#8C6D58] typewriter-cursor"
                />
              ) : activeStep > 1 && titleHighlight ? (
                <span className="font-serif italic font-light text-[#8C6D58]">{titleHighlight}</span>
              ) : null}

              {activeStep === 2 && titleEnd ? (
                <TypeAnimation
                  key={`end-${resetKey}`}
                  sequence={[
                    titleEnd,
                    750, // cursor blinks briefly after sentence completes
                    () => setStep(3),
                  ]}
                  speed={{ type: 'keyStrokeDelayInMs', value: 40 }}
                  cursor={true}
                  wrapper="span"
                  className="typewriter-cursor"
                />
              ) : activeStep >= 3 && titleEnd ? (
                <span>{titleEnd}</span>
              ) : null}
            </>
          )}
        </span>
      </span>
    </>
  )
}

export default TypewriterHeadline
