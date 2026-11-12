import { useEffect, useRef, useMemo, useState } from 'react'

/**
 * TypewriterHeadline
 * 
 * Ultra-smooth, high-performance character-by-character typewriter animation
 * for hero section headlines.
 * 
 * Architectural Highlights:
 * 1. Zero React Re-Renders: Rendered once by React. Character reveals and cursor
 *    tracking are executed directly on the DOM via requestAnimationFrame.
 * 2. Premium Editorial Cadence: Deliberate 36–42ms per character rhythm conforming to the
 *    35–50ms specification, with deliberate pacing for the highlighted serif italic
 *    phrase, and subtle human breathing at punctuation.
 * 3. Zero Layout Shift (CLS = 0): Words are pre-rendered into inline-block containers so
 *    natural line wraps are locked from the very first frame across all viewports.
 * 4. Coordinate-Anchored Refined Bronze Cursor (#8C6D58): GPU-accelerated absolute cursor
 *    tracked directly to the bounding rect of the active character. Guaranteed zero premature
 *    line drops, zero React DOM reconciliation conflicts, and silky-smooth 60/120fps motion.
 * 5. Full Carousel & State Integration: Waits for initial full-screen splash loader to clear
 *    so visitor sees the animation from the first frame. Instant start on active slide,
 *    immediate reset on slide change, fluid pause/resume handling via ref-based time accumulation.
 * 6. Accessibility: Full sentence immediately accessible to screen readers via sr-only;
 *    visual layer isolated via aria-hidden; respects prefers-reduced-motion.
 */
const TypewriterHeadline = ({
  titleStart = '',
  titleHighlight = '',
  titleEnd = '',
  isActive = false,
  isPaused = false,
  resetKey = 0,
}) => {
  const containerRef = useRef(null)
  const cursorRef = useRef(null)
  const animFrameRef = useRef(null)
  const fadeTimerRef = useRef(null)
  const splashWaitTimerRef = useRef(null)
  const isMountedRef = useRef(true)

  const isActiveRef = useRef(isActive)
  const isPausedRef = useRef(isPaused)

  // Lazily detect prefers-reduced-motion
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = (e) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', update)
    return () => mediaQuery.removeEventListener('change', update)
  }, [])

  // Full accessible headline string
  const fullText = useMemo(
    () => `${titleStart}${titleHighlight}${titleEnd}`,
    [titleStart, titleHighlight, titleEnd]
  )

  // Parse segments into word tokens and characters
  const { startTokens, highlightTokens, endTokens, totalChars, charTimeline, allChars } = useMemo(() => {
    let globalIndex = 0

    const parseSegment = (text, isHighlight) => {
      const tokens = []
      // Split preserving whitespace
      const rawTokens = text.split(/(\s+)/)

      rawTokens.forEach((rawToken) => {
        if (!rawToken) return
        const isSpace = /^\s+$/.test(rawToken)
        const chars = []
        for (let i = 0; i < rawToken.length; i++) {
          chars.push({
            char: rawToken[i],
            index: globalIndex++,
            isHighlight,
            isSpace,
          })
        }
        tokens.push({
          isSpace,
          chars,
        })
      })

      return tokens
    }

    const startTokens = parseSegment(titleStart, false)
    const highlightTokens = parseSegment(titleHighlight, true)
    const endTokens = parseSegment(titleEnd, false)
    const totalChars = globalIndex

    // Flatten all characters to calculate individual cadence and punctuation breathing
    const allChars = []
    ;[...startTokens, ...highlightTokens, ...endTokens].forEach((token) => {
      token.chars.forEach((c) => allChars.push(c))
    })

    // Editorial typing rhythm conforming to the 35–50ms guideline
    // High-end deliberate pacing adjusted dynamically to headline length
    const baseCadence = Math.max(36, Math.min(44, 2550 / Math.max(totalChars, 1)))
    const charTimeline = new Float32Array(totalChars)
    let cumulative = 0

    for (let i = 0; i < totalChars; i++) {
      charTimeline[i] = cumulative
      const item = allChars[i]
      const ch = item ? item.char : ''
      let delay = baseCadence

      // Slightly slower and more deliberate pacing for the highlighted serif italic text
      if (item && item.isHighlight) {
        delay += 6
      }

      // Organic human breathing at punctuation (no artificial stalls)
      if (ch === ',' || ch === ';') {
        delay += 30
      } else if (ch === '.' || ch === '?' || ch === '!') {
        delay += 45
      }

      cumulative += delay
    }

    return {
      startTokens,
      highlightTokens,
      endTokens,
      totalChars,
      charTimeline,
      allChars,
    }
  }, [titleStart, titleHighlight, titleEnd])

  // Sync refs without triggering effect re-runs
  useEffect(() => {
    isActiveRef.current = isActive
  }, [isActive])

  useEffect(() => {
    isPausedRef.current = isPaused
  }, [isPaused])

  // Main animation orchestrator
  useEffect(() => {
    isMountedRef.current = true

    const clearTimers = () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
        animFrameRef.current = null
      }
      if (fadeTimerRef.current) {
        clearTimeout(fadeTimerRef.current)
        fadeTimerRef.current = null
      }
      if (splashWaitTimerRef.current) {
        clearInterval(splashWaitTimerRef.current)
        splashWaitTimerRef.current = null
      }
    }

    clearTimers()

    const container = containerRef.current
    const cursor = cursorRef.current
    if (!container || !cursor) return

    const charNodes = container.querySelectorAll('[data-char-idx]')

    // If reduced motion is requested, reveal all text immediately without typing
    if (prefersReducedMotion) {
      charNodes.forEach((node) => {
        node.style.opacity = '1'
      })
      cursor.style.opacity = '0'
      cursor.style.display = 'none'
      return
    }

    // Inactive slide: hide all characters and cursor immediately
    if (!isActive) {
      charNodes.forEach((node) => {
        node.style.opacity = '0'
      })
      cursor.style.transition = 'none'
      cursor.style.opacity = '0'
      return
    }

    // Position cursor relative to container using bounding rects
    const positionCursor = (targetIndex) => {
      if (!charNodes || charNodes.length === 0 || !container || !cursor) return
      const cRect = container.getBoundingClientRect()
      if (cRect.width === 0 && cRect.height === 0) return

      if (targetIndex === 0) {
        const firstNode = charNodes[0]
        const nRect = firstNode.getBoundingClientRect()
        const x = Math.round(nRect.left - cRect.left)
        const ch = Math.round(nRect.height * 0.78)
        const y = Math.round(nRect.top - cRect.top + (nRect.height - ch) / 2)
        cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`
        cursor.style.height = `${ch}px`
        return
      }

      // Anchor node determination: if a trailing space wrapped to a new line,
      // anchor cursor to the preceding word character to avoid hanging alone on a new line
      let nodeIdx = Math.min(targetIndex - 1, totalChars - 1)
      while (
        nodeIdx > 0 &&
        allChars[nodeIdx]?.isSpace &&
        charNodes[nodeIdx] &&
        charNodes[nodeIdx - 1] &&
        charNodes[nodeIdx].getBoundingClientRect().top > charNodes[nodeIdx - 1].getBoundingClientRect().top
      ) {
        nodeIdx--
      }

      const activeNode = charNodes[nodeIdx]
      if (!activeNode) return
      const nRect = activeNode.getBoundingClientRect()
      const x = Math.round(nRect.right - cRect.left)
      const ch = Math.round(nRect.height * 0.78)
      const y = Math.round(nRect.top - cRect.top + (nRect.height - ch) / 2)

      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`
      cursor.style.height = `${ch}px`
    }

    // Active slide setup: reset characters to hidden
    charNodes.forEach((node) => {
      node.style.opacity = '0'
    })

    cursor.style.transition = 'none'
    cursor.style.opacity = '1'
    cursor.style.display = 'block'
    positionCursor(0)

    const startTyping = () => {
      if (!isMountedRef.current || !isActiveRef.current) return
      positionCursor(0)

      let lastTime = performance.now()
      let accumulatedTime = 0
      let lastRevealedIndex = 0

      const step = (now) => {
        if (!isMountedRef.current || !isActiveRef.current) return

        // Measure time delta between frames
        const delta = now - lastTime
        lastTime = now

        // Accumulate time only while not paused
        if (!isPausedRef.current) {
          accumulatedTime += delta
        }

        // Determine target character index from precomputed timeline
        let targetIndex = lastRevealedIndex
        while (
          targetIndex < totalChars &&
          charTimeline[targetIndex] <= accumulatedTime
        ) {
          targetIndex++
        }

        if (targetIndex > lastRevealedIndex) {
          for (let i = lastRevealedIndex; i < targetIndex; i++) {
            if (charNodes[i]) {
              charNodes[i].style.opacity = '1'
            }
          }
          lastRevealedIndex = targetIndex
          positionCursor(lastRevealedIndex)
        }

        if (targetIndex < totalChars) {
          animFrameRef.current = requestAnimationFrame(step)
        } else {
          // Typing complete: hold cursor steady, then fade out gracefully
          fadeTimerRef.current = setTimeout(() => {
            if (!isMountedRef.current || !isActiveRef.current) return
            cursor.style.transition = 'opacity 600ms cubic-bezier(0.4, 0, 0.2, 1)'
            cursor.style.opacity = '0'
          }, 650)
        }
      }

      animFrameRef.current = requestAnimationFrame(step)
    }

    // If an initial full-screen splash loader is active, wait for it to clear so
    // the user experiences the full typing animation from frame 1
    const splashLoader = document.querySelector('div[role="status"].fixed.inset-0')
    if (splashLoader) {
      splashWaitTimerRef.current = setInterval(() => {
        if (!document.querySelector('div[role="status"].fixed.inset-0')) {
          clearInterval(splashWaitTimerRef.current)
          splashWaitTimerRef.current = null
          if (isMountedRef.current && isActiveRef.current) {
            startTyping()
          }
        }
      }, 50)
    } else {
      startTyping()
    }

    return () => {
      clearTimers()
      if (cursor) {
        cursor.style.transition = 'none'
        cursor.style.opacity = '0'
      }
    }
  }, [isActive, resetKey, prefersReducedMotion, totalChars, charTimeline, allChars])

  // Helper to render tokens
  const renderTokens = (tokens) => {
    return tokens.map((token, tIdx) => {
      if (token.isSpace) {
        return token.chars.map((c) => (
          <span
            key={`space-${c.index}`}
            data-char-idx={c.index}
            className="inline whitespace-pre transition-opacity duration-75 select-none"
            style={{ opacity: prefersReducedMotion ? 1 : 0 }}
          >
            {c.char}
          </span>
        ))
      }

      return (
        <span
          key={`word-${tIdx}`}
          className="inline-block whitespace-nowrap"
        >
          {token.chars.map((c) => (
            <span
              key={`char-${c.index}`}
              data-char-idx={c.index}
              className="inline transition-opacity duration-75"
              style={{ opacity: prefersReducedMotion ? 1 : 0 }}
            >
              {c.char}
            </span>
          ))}
        </span>
      )
    })
  }

  return (
    <>
      {/* Screen reader complete immediate text for accessibility */}
      <span className="sr-only">{fullText}</span>

      {/* Visual character-by-character presentation with locked zero-CLS layout */}
      <span ref={containerRef} aria-hidden="true" className="relative inline-block">
        {/* Title Start Segment */}
        <span>{renderTokens(startTokens)}</span>

        {/* Highlighted Serif Italic Segment */}
        <span className="font-serif italic font-light text-[#8C6D58]">
          {renderTokens(highlightTokens)}
        </span>

        {/* Title End Segment */}
        <span>{renderTokens(endTokens)}</span>

        {/* Synchronized Refined Bronze Cursor */}
        <span
          ref={cursorRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 select-none will-change-transform z-10"
          style={{ opacity: 0 }}
        >
          <span className="block w-[2.5px] sm:w-[3px] rounded-[0.5px] bg-[#8C6D58] shadow-[0_0_8px_rgba(140,109,88,0.35)] h-full" />
        </span>
      </span>
    </>
  )
}

export default TypewriterHeadline
