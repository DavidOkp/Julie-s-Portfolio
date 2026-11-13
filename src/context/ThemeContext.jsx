import { createContext, useContext, useEffect, useState, useMemo, useCallback, useRef } from 'react'

const ThemeContext = createContext(null)

const STORAGE_KEY = 'julie-portfolio-theme'

const getSystemTheme = () => {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const ThemeProvider = ({ children }) => {
  const transitionTimer = useRef(null)
  const [theme, setThemeState] = useState(() => {
    if (typeof window === 'undefined') return 'system'
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        return stored
      }
    } catch {
      // localStorage may be disabled or restricted
    }
    return 'system'
  })

  const [systemTheme, setSystemTheme] = useState(getSystemTheme)

  // Listen to OS system preference changes
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e) => {
      setSystemTheme(e.matches ? 'dark' : 'light')
    }

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
    } else {
      mediaQuery.addListener(handleChange)
    }
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange)
      } else {
        mediaQuery.removeListener(handleChange)
      }
    }
  }, [])

  useEffect(() => () => clearTimeout(transitionTimer.current), [])

  // Determine active theme
  const resolvedTheme = useMemo(() => {
    return theme === 'system' ? systemTheme : theme
  }, [theme, systemTheme])

  // Apply theme to <html> element
  useEffect(() => {
    if (typeof document === 'undefined') return
    const root = document.documentElement

    if (resolvedTheme === 'dark') {
      root.classList.add('dark')
      root.setAttribute('data-theme', 'dark')
      root.style.colorScheme = 'dark'
    } else {
      root.classList.remove('dark')
      root.setAttribute('data-theme', 'light')
      root.style.colorScheme = 'light'
    }
  }, [resolvedTheme])

  // Trigger smooth transition class during manual toggles
  const triggerTransition = useCallback(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const root = document.documentElement
    root.classList.add('theme-transition')

    clearTimeout(transitionTimer.current)
    transitionTimer.current = setTimeout(() => {
      root.classList.remove('theme-transition')
    }, 300)
  }, [])

  const setTheme = useCallback((newTheme) => {
    if (newTheme !== 'light' && newTheme !== 'dark' && newTheme !== 'system') return
    triggerTransition()
    setThemeState(newTheme)
    try {
      localStorage.setItem(STORAGE_KEY, newTheme)
    } catch {
      // ignore
    }
  }, [triggerTransition])

  const toggleTheme = useCallback(() => {
    triggerTransition()
    const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
    setThemeState(nextTheme)
    try {
      localStorage.setItem(STORAGE_KEY, nextTheme)
    } catch {
      // ignore
    }
  }, [resolvedTheme, triggerTransition])

  const value = useMemo(() => ({
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
  }), [theme, resolvedTheme, setTheme, toggleTheme])

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export default ThemeContext
