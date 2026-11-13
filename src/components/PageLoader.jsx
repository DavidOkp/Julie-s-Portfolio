import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import brandImage from '../assets/red-head-shot.png'

const statusStages = [
  { threshold: 25, label: 'Initializing portfolio...' },
  { threshold: 60, label: 'Loading executive frameworks...' },
  { threshold: 90, label: 'Structuring strategic insights...' },
  { threshold: 100, label: 'Welcome' },
]

export const PageLoader = () => {
  const [initialLoading, setInitialLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [isFadingOut, setIsFadingOut] = useState(false)
  
  // Route change transition state
  const location = useLocation()
  const [isNavigating, setIsNavigating] = useState(false)
  const [navProgress, setNavProgress] = useState(0)

  // 1. Initial Page Entrance Loader (Runs on every full page visit/refresh)
  useEffect(() => {
    setProgress(0)
    setIsFadingOut(false)
    setInitialLoading(true)

    const duration = 1200 // ms
    const intervalTime = 20
    const step = 100 / (duration / intervalTime)

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step + Math.random() * 2
        if (next >= 100) {
          clearInterval(timer)
          setTimeout(() => {
            setIsFadingOut(true)
            setTimeout(() => {
              setInitialLoading(false)
            }, 600)
          }, 150)
          return 100
        }
        return next
      })
    }, intervalTime)

    return () => clearInterval(timer)
  }, [])

  // 2. Route Transition Loader (Triggers whenever pathname changes)
  useEffect(() => {
    // Skip if initial splash is active
    if (initialLoading) return

    setIsNavigating(true)
    setNavProgress(25)

    const t1 = setTimeout(() => setNavProgress(70), 80)
    const t2 = setTimeout(() => setNavProgress(95), 180)
    const t3 = setTimeout(() => setNavProgress(100), 280)
    const t4 = setTimeout(() => {
      setIsNavigating(false)
      setNavProgress(0)
    }, 450)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [location.pathname, initialLoading])

  const currentStatus =
    statusStages.find((stage) => progress <= stage.threshold)?.label || 'Welcome'

  return (
    <>
      {/* Route Change Modern Transition: Glowing Top Bar + Glassmorphic Center Badge */}
      {isNavigating && (
        <>
          {/* Top glowing progress line */}
          <div
            className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-transparent pointer-events-none"
            aria-hidden="true"
          >
            <div
              className="h-full bg-gradient-to-r from-[#8C6D58] via-[#D9C7B0] to-[#FDFBF7] shadow-[0_0_16px_rgba(217,199,176,0.9)] transition-all ease-out"
              style={{
                width: `${navProgress}%`,
                transitionDuration: '200ms',
                opacity: navProgress === 100 ? 0 : 1,
              }}
            />
          </div>

          {/* Frosted Modern Floating Pill Badge */}
          <div className="fixed inset-0 z-[99] pointer-events-none flex items-center justify-center bg-[#1A1412]/15 backdrop-blur-[2px] transition-all duration-300">
            <div className="flex items-center gap-3 rounded-2xl border border-[#D9C7B0]/30 bg-[#1A1412]/90 px-5 py-3 shadow-[0_12px_36px_rgba(0,0,0,0.5)] backdrop-blur-md">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-[#2C221E] border border-[#8C6D58]">
                <img
                  src={brandImage}
                  alt="Juliana Onuh"
                  className="h-full w-full rounded-xl object-cover object-[center_28%]"
                />
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D9C7B0] opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D9C7B0]"></span>
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold tracking-wide text-[#FDFBF7]">
                  Loading Page...
                </span>
                <span className="text-[10px] font-medium uppercase tracking-widest text-[#D9C7B0]">
                  Executive Advisory
                </span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Modern Initial Splash Loader */}
      {initialLoading && (
        <div
          className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#140F0D] text-[#FDFBF7] transition-all duration-600 ease-out ${
            isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
          }`}
          role="status"
          aria-live="polite"
        >
          {/* Ambient Warm Radial Background Glow */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(217, 199, 176, 0.16) 0%, rgba(140, 109, 88, 0.05) 50%, transparent 70%)',
            }}
          />

          <div className="relative flex flex-col items-center text-center px-6 max-w-sm w-full">
            
            {/* Portrait Emblem with Pulsing Ring */}
            <div className="relative mb-8 flex items-center justify-center">
              <div className="absolute -inset-3 rounded-2xl border border-[#D9C7B0]/20 animate-ping opacity-30" />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1F1714] border border-[#5C4A3E]/70 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
                <img
                  src={brandImage}
                  alt="Juliana Onuh"
                  className="h-full w-full rounded-full object-cover object-[center_28%]"
                />
              </div>
            </div>

            {/* Brand Title & Subtitle */}
            <div className="flex flex-col items-center gap-1.5 mb-8">
              <span className="text-base sm:text-lg font-extrabold tracking-[0.24em] text-[#FDFBF7] uppercase">
                Juliana Onuh
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8C6D58]">
                Executive Portfolio & Advisory
              </span>
            </div>

            {/* Modern Minimalist Progress Bar */}
            <div className="w-56 sm:w-64">
              <div className="h-[2px] w-full rounded-full bg-[#2C221E] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#8C6D58] via-[#D9C7B0] to-[#FDFBF7] shadow-[0_0_10px_rgba(217,199,176,0.7)] transition-all duration-75 ease-out"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>

              {/* Status and Percentage Display */}
              <div className="mt-3 flex items-center justify-between text-[11px] font-mono tracking-wider text-[#A69282]">
                <span className="tracking-widest uppercase text-[10px] text-[#8C6D58]">
                  {currentStatus}
                </span>
                <span>{Math.floor(progress)}%</span>
              </div>
            </div>

          </div>

          {/* Bottom Accreditation Badge */}
          <div className="absolute bottom-10 flex items-center gap-3 text-[10px] font-medium tracking-widest uppercase text-[#5C4A3E]">
            <span>FCCA</span>
            <span>•</span>
            <span>Stanford Seed</span>
            <span>•</span>
            <span>Executive CFO</span>
          </div>

        </div>
      )}
    </>
  )
}

export default PageLoader
