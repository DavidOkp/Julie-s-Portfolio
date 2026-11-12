import { Sun, Moon, Laptop } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

/**
 * ThemeToggle
 * 
 * Refined, minimal Light/Dark Mode toggle component.
 * Features smooth icon rotation & opacity crossfade, full keyboard accessibility,
 * and support for both desktop navbar and mobile drawer layouts.
 */
export const ThemeToggle = ({ variant = 'button', className = '' }) => {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  // Segmented Pill Selector (Ideal for Mobile Drawer or Settings)
  if (variant === 'segmented') {
    return (
      <div
        role="group"
        aria-label="Theme selection"
        className={`inline-flex items-center rounded-full p-1 border border-[#EADFCF] bg-[#F4EFE6] dark:border-white/10 dark:bg-[#191715] shadow-inner ${className}`}
      >
        <button
          type="button"
          aria-pressed={theme === 'light'}
          onClick={() => setTheme('light')}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
            theme === 'light'
              ? 'bg-white text-[#1A1412] shadow-sm'
              : 'text-[#5C4A3E] hover:text-[#1A1412] dark:text-[#B8ADA1] dark:hover:text-[#F5F0E9]'
          }`}
        >
          <Sun className="h-3.5 w-3.5 text-[#8C6D58]" />
          <span>Light</span>
        </button>

        <button
          type="button"
          aria-pressed={theme === 'dark'}
          onClick={() => setTheme('dark')}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
            theme === 'dark'
              ? 'bg-[#211E1B] text-[#F5F0E9] shadow-sm border border-white/10'
              : 'text-[#5C4A3E] hover:text-[#1A1412] dark:text-[#B8ADA1] dark:hover:text-[#F5F0E9]'
          }`}
        >
          <Moon className="h-3.5 w-3.5 text-[#B18B70]" />
          <span>Dark</span>
        </button>

        <button
          type="button"
          aria-pressed={theme === 'system'}
          onClick={() => setTheme('system')}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
            theme === 'system'
              ? isDark
                ? 'bg-[#211E1B] text-[#F5F0E9] shadow-sm border border-white/10'
                : 'bg-white text-[#1A1412] shadow-sm'
              : 'text-[#5C4A3E] hover:text-[#1A1412] dark:text-[#B8ADA1] dark:hover:text-[#F5F0E9]'
          }`}
        >
          <Laptop className="h-3.5 w-3.5 text-[#8C6D58] dark:text-[#B18B70]" />
          <span>System</span>
        </button>
      </div>
    )
  }

  // Refined Minimalist Icon Button (Desktop Header & Mobile Bar)
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode (currently ${resolvedTheme} mode)`}
      title={`Active: ${resolvedTheme.charAt(0).toUpperCase() + resolvedTheme.slice(1)} Mode (Click to switch)`}
      className={`group relative flex h-10 w-10 items-center justify-center rounded-full border border-[#EADFCF] bg-white/80 text-[#1A1412] shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-[#8C6D58] hover:bg-[#F4EFE6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6D58] active:scale-95 dark:border-white/10 dark:bg-[#191715]/90 dark:text-[#F5F0E9] dark:hover:border-[#B18B70] dark:hover:bg-[#211E1B] dark:focus-visible:ring-[#B18B70] ${className}`}
    >
      <span className="sr-only">
        {isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      </span>

      {/* Sun Icon (Visible in Light Mode) */}
      <Sun
        className={`h-[18px] w-[18px] text-[#8C6D58] transition-all duration-300 ease-in-out ${
          isDark
            ? 'rotate-90 scale-0 opacity-0 absolute'
            : 'rotate-0 scale-100 opacity-100'
        }`}
      />

      {/* Moon Icon (Visible in Dark Mode) */}
      <Moon
        className={`h-[18px] w-[18px] text-[#B18B70] transition-all duration-300 ease-in-out ${
          isDark
            ? 'rotate-0 scale-100 opacity-100'
            : '-rotate-90 scale-0 opacity-0 absolute'
        }`}
      />
    </button>
  )
}

export default ThemeToggle
