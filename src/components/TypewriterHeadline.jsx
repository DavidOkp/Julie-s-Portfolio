import { memo, useState, useEffect, useRef } from 'react'

const DEFAULT_TYPING_SPEED_MS = 40
const DEFAULT_PAUSE_DURATION_MS = 1300
const DEFAULT_ERASING_SPEED_MS = 22
const DEFAULT_SETTLE_DELAY_MS = 120
const MAX_FRAME_DELTA_MS = 100

const TypewriterHeadline = memo(({
  titleStart = '',
  titleHighlight = '',
  titleEnd = '',
  isActive = false,
  isPaused = false,
  resetKey = 0,
  typingSpeed = DEFAULT_TYPING_SPEED_MS,
  pauseDuration = DEFAULT_PAUSE_DURATION_MS,
  erasingSpeed = DEFAULT_ERASING_SPEED_MS,
  settleDelay = DEFAULT_SETTLE_DELAY_MS,
  prefersReducedMotion: prefersReducedMotionProp,
  isSplashActive: isSplashActiveProp,
  onComplete,
}) => {
  const hasExternalReducedMotion = typeof prefersReducedMotionProp === 'boolean'
  const hasExternalSplash = typeof isSplashActiveProp === 'boolean'

  const [internalReducedMotion, setInternalReducedMotion] = useState(() => {
    if (hasExternalReducedMotion || typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    if (hasExternalReducedMotion || typeof window === 'undefined') return
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = (e) => setInternalReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [hasExternalReducedMotion])

  const [internalSplashActive, setInternalSplashActive] = useState(!hasExternalSplash)

  useEffect(() => {
    if (hasExternalSplash || !isActive || typeof document === 'undefined') return

    let observer = null
    const rafId = requestAnimationFrame(() => {
      const splashEl = document.querySelector('div[role="status"].fixed.inset-0')
      if (!splashEl) {
        setInternalSplashActive(false)
        return
      }
      const observeTarget = splashEl.parentNode || document.body
      observer = new MutationObserver(() => {
        if (!splashEl.isConnected) {
          setInternalSplashActive(false)
          observer?.disconnect()
        }
      })
      observer.observe(observeTarget, { childList: true })
    })

    return () => {
      cancelAnimationFrame(rafId)
      observer?.disconnect()
    }
  }, [hasExternalSplash, isActive])

  const prefersReducedMotion = hasExternalReducedMotion
    ? prefersReducedMotionProp
    : internalReducedMotion
  const isSplashActive = hasExternalSplash
    ? isSplashActiveProp
    : internalSplashActive

  const safeStart = typeof titleStart === 'string' ? titleStart : ''
  const safeHighlight = typeof titleHighlight === 'string' ? titleHighlight : ''
  const safeEnd = typeof titleEnd === 'string' ? titleEnd : ''

  const startLen = safeStart.length
  const highlightLen = safeHighlight.length
  const totalLen = startLen + highlightLen + safeEnd.length
  const fullText = `${safeStart}${safeHighlight}${safeEnd}`

  const cursorWrapperRef = useRef(null)
  const startSpanRef = useRef(null)
  const highlightSpanRef = useRef(null)
  const endSpanRef = useRef(null)

  const onCompleteRef = useRef(onComplete)
  const isPausedRef = useRef(isPaused)
  const completedCycleRef = useRef(null)
  const wakeLoopRef = useRef(null)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    isPausedRef.current = isPaused
    wakeLoopRef.current?.()
  }, [isPaused])

  const shouldAnimate = isActive && !isSplashActive && !prefersReducedMotion
  const cycleKey = `${isActive}-${resetKey}-${fullText}`

  useEffect(() => {
    const cursorEl = cursorWrapperRef.current
    const startEl = startSpanRef.current
    const highlightEl = highlightSpanRef.current
    const endEl = endSpanRef.current

    if (!cursorEl || !startEl || !highlightEl || !endEl) return

    const clearVisualText = () => {
      if (startEl.textContent !== '') startEl.textContent = ''
      if (highlightEl.textContent !== '') highlightEl.textContent = ''
      if (endEl.textContent !== '') endEl.textContent = ''
      cursorEl.classList.remove('typewriter-cursor')
    }

    if (!shouldAnimate) {
      wakeLoopRef.current = null
      clearVisualText()
      return
    }

    let rafId = null
    let lastTimestamp = null
    let accumulator = 0
    let visibleCount = 0
    let phase = 'typing' // 'typing' | 'pausing' | 'erasing' | 'done'
    let renderedStart = ''
    let renderedHighlight = ''
    let renderedEnd = ''
    let cursorVisible = false
    let disposed = false

    const setCursorVisible = (visible) => {
      if (visible !== cursorVisible) {
        cursorEl.classList.toggle('typewriter-cursor', visible)
        cursorVisible = visible
      }
    }

    const renderCount = (count) => {
      const nextStart = safeStart.slice(0, Math.min(count, startLen))
      const nextHighlight = safeHighlight.slice(
        0,
        Math.max(0, Math.min(count - startLen, highlightLen))
      )
      const nextEnd = safeEnd.slice(0, Math.max(0, count - startLen - highlightLen))

      if (nextStart !== renderedStart) {
        startEl.textContent = nextStart
        renderedStart = nextStart
      }
      if (nextHighlight !== renderedHighlight) {
        highlightEl.textContent = nextHighlight
        renderedHighlight = nextHighlight
      }
      if (nextEnd !== renderedEnd) {
        endEl.textContent = nextEnd
        renderedEnd = nextEnd
      }
    }

    // Initialize clean empty state and visible cursor for this cycle
    clearVisualText()
    setCursorVisible(true)

    const tick = (now) => {
      if (disposed) return

      if (lastTimestamp === null) {
        lastTimestamp = now
      }
      const dt = Math.min(Math.max(now - lastTimestamp, 0), MAX_FRAME_DELTA_MS)
      lastTimestamp = now

      const paused = isPausedRef.current

      if (phase === 'typing') {
        if (visibleCount < totalLen) {
          accumulator += dt
          const steps = Math.floor(accumulator / typingSpeed)
          if (steps > 0) {
            visibleCount = Math.min(visibleCount + steps, totalLen)
            accumulator -= steps * typingSpeed
            renderCount(visibleCount)
          }
        }
        if (visibleCount >= totalLen) {
          phase = 'pausing'
          accumulator = 0
        }
      } else if (phase === 'pausing') {
        if (paused) {
          // Suspend rAF while paused on the complete headline to avoid idle CPU usage
          rafId = null
          lastTimestamp = null
          return
        }
        accumulator += dt
        if (accumulator >= pauseDuration) {
          phase = totalLen > 0 ? 'erasing' : 'done'
          accumulator = 0
          if (phase === 'done') {
            setCursorVisible(false)
          }
        }
      } else if (phase === 'erasing') {
        if (paused) {
          // Restore the complete headline smoothly if the user hovers/pauses mid-erase
          phase = 'typing'
          accumulator = 0
        } else {
          accumulator += dt
          const steps = Math.floor(accumulator / erasingSpeed)
          if (steps > 0) {
            visibleCount = Math.max(visibleCount - steps, 0)
            accumulator -= steps * erasingSpeed
            renderCount(visibleCount)
          }
          if (visibleCount <= 0) {
            phase = 'done'
            accumulator = 0
            setCursorVisible(false)
          }
        }
      } else if (phase === 'done') {
        if (paused) {
          phase = 'typing'
          accumulator = 0
          setCursorVisible(true)
        } else {
          accumulator += dt
          if (accumulator >= settleDelay) {
            rafId = null
            if (completedCycleRef.current !== cycleKey) {
              completedCycleRef.current = cycleKey
              onCompleteRef.current?.(resetKey)
            }
            return
          }
        }
      }

      rafId = requestAnimationFrame(tick)
    }

    const startLoop = () => {
      if (disposed || rafId !== null) return
      lastTimestamp = null
      rafId = requestAnimationFrame(tick)
    }

    wakeLoopRef.current = startLoop
    startLoop()

    return () => {
      disposed = true
      wakeLoopRef.current = null
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
      clearVisualText()
    }
  }, [
    shouldAnimate,
    cycleKey,
    resetKey,
    safeStart,
    safeHighlight,
    safeEnd,
    startLen,
    highlightLen,
    totalLen,
    typingSpeed,
    pauseDuration,
    erasingSpeed,
    settleDelay,
  ])

  // Reduced motion: immediate full text display without animation
  if (prefersReducedMotion) {
    return (
      <>
        <span className="sr-only">{fullText}</span>
        <span aria-hidden="true" className="whitespace-pre-wrap">
          {safeStart ? <span>{safeStart}</span> : null}
          {safeHighlight ? (
            <span className="font-serif italic font-light text-[#8C6D58]">{safeHighlight}</span>
          ) : null}
          {safeEnd ? <span>{safeEnd}</span> : null}
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
          {safeStart ? <span>{safeStart}</span> : null}
          {safeHighlight ? (
            <span className="font-serif italic font-light text-[#8C6D58]">{safeHighlight}</span>
          ) : null}
          {safeEnd ? <span>{safeEnd}</span> : null}
        </span>

        {/* Visible animated typing and erasing layer (updated via rAF without per-char React re-renders) */}
        <span className="col-start-1 row-start-1">
          <span ref={cursorWrapperRef}>
            <span ref={startSpanRef} />
            <span ref={highlightSpanRef} className="font-serif italic font-light text-[#8C6D58]" />
            <span ref={endSpanRef} />
          </span>
        </span>
      </span>
    </>
  )
})

TypewriterHeadline.displayName = 'TypewriterHeadline'

export default TypewriterHeadline
