import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowRight, Menu, X } from 'lucide-react'
import { navItems } from '../data/header.data'
import { socialLinks } from '../data/social.data'
import { SocialIcon } from './SocialIcon'
import { ThemeToggle } from './ThemeToggle'
import brandImage from '../assets/red-head-shot.png'

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  // Close mobile drawer whenever user navigates to a new page
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  return (
    <>
      {/* Main Navigation Header */}
      <nav className="sticky top-0 z-40 border-b border-[#EADFCF] bg-[#FDFBF7]/95 backdrop-blur-md dark:border-white/10 dark:bg-[#11100F]/95">
        <div className="mx-auto grid h-24 max-w-[1680px] grid-cols-[1fr_auto] items-center px-5 sm:px-8 lg:h-20 lg:grid-cols-[1fr_auto_1fr] lg:px-12">

          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 justify-self-start shrink-0">
            <img
              src={brandImage}
              alt="Juliana Onuh"
              className="h-11 w-11 rounded-[14px] object-cover object-[center_28%] shadow-[0_8px_20px_rgba(26,20,18,0.12)] dark:border dark:border-white/10 dark:shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
            />
            <div className="flex flex-col gap-1">
              <span className="text-sm font-extrabold leading-none tracking-wide text-[#1A1412] sm:text-base dark:text-[#F5F0E9]">
                JULIANA ONUH
              </span>
              <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#8C6D58] sm:text-[10px] dark:text-[#B18B70]">
                Executive Portfolio
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden items-center gap-1 rounded-full border border-white/70 bg-white/75 p-1.5 shadow-[0_12px_35px_rgba(26,20,18,0.08)] dark:border-white/10 dark:bg-[#191715]/80 dark:shadow-[0_12px_35px_rgba(0,0,0,0.4)] xl:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `nav-underline whitespace-nowrap rounded-full px-4 py-3 text-[13px] font-medium transition-all ${
                    isActive || (item.path === '/about' && location.pathname === '/')
                      ? 'bg-white text-[#1A1412] shadow-[0_4px_14px_rgba(26,20,18,0.08)] dark:bg-[#211E1B] dark:text-[#F5F0E9] dark:shadow-[0_4px_14px_rgba(0,0,0,0.4)]'
                      : 'text-[#5C4A3E] hover:bg-[#F4EFE6] hover:text-[#1A1412] dark:text-[#B8ADA1] dark:hover:bg-[#211E1B]/60 dark:hover:text-[#F5F0E9]'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Desktop CTA & Theme Toggle */}
          <div className="hidden justify-self-end xl:flex items-center gap-3.5">
            <ThemeToggle />
            <Link
              to="/contact"
              className="motion-arrow inline-flex items-center gap-2 rounded-full bg-[#1A1412] px-6 py-3.5 text-[13px] font-semibold text-[#FDFBF7] shadow-[0_8px_20px_rgba(26,20,18,0.12)] transition-colors hover:bg-[#382C27] dark:bg-[#F5F0E9] dark:text-[#11100F] dark:hover:bg-[#EADFCF]"
            >
              <span>Let’s talk</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Mobile Actions: Theme Toggle + Hamburger */}
          <div className="flex items-center gap-2 justify-self-end xl:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-full border border-[#EADFCF] bg-[#F4EFE6] p-2.5 text-[#1A1412] transition-colors hover:bg-[#EADFCF] focus:outline-none dark:border-white/10 dark:bg-[#191715] dark:text-[#F5F0E9] dark:hover:bg-[#211E1B]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#1A1412] dark:text-[#F5F0E9]" />
              ) : (
                <Menu className="w-6 h-6 text-[#1A1412] dark:text-[#F5F0E9]" />
              )}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#1A1412]/60 backdrop-blur-sm transition-opacity duration-300 xl:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-[85%] max-w-sm flex-col justify-between border-l border-[#EADFCF] bg-[#FDFBF7] shadow-2xl transition-transform duration-300 ease-in-out dark:border-white/10 dark:bg-[#11100F] xl:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-[#EADFCF] bg-[#F4EFE6] p-6 dark:border-white/10 dark:bg-[#191715]">
          <div className="flex items-center gap-3">
            <img
              src={brandImage}
              alt="Juliana Onuh"
              className="h-9 w-9 rounded-xl object-cover object-[center_28%] dark:border dark:border-white/10"
            />
            <div>
              <p className="text-sm font-bold text-[#1A1412] dark:text-[#F5F0E9]">Juliana Onuh</p>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8C6D58] dark:text-[#B18B70]">Executive Menu</p>
            </div>
          </div>

          <button
            onClick={() => setMobileMenuOpen(false)}
            className="rounded-full bg-[#EADFCF]/60 p-2 text-[#1A1412] transition-colors hover:bg-[#EADFCF] dark:bg-[#211E1B] dark:text-[#F5F0E9] dark:hover:bg-white/10"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Navigation Links */}
        <div className="flex flex-grow flex-col gap-2 overflow-y-auto px-6 py-6">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between rounded-2xl p-4 text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-[#1A1412] text-[#FDFBF7] shadow-md dark:bg-[#211E1B] dark:text-[#F5F0E9] dark:border dark:border-white/10'
                    : 'text-[#5C4A3E] hover:bg-[#F4EFE6] hover:text-[#1A1412] dark:text-[#B8ADA1] dark:hover:bg-[#191715] dark:hover:text-[#F5F0E9]'
                }`
              }
            >
              <span>{item.name}</span>
              <ArrowRight className="w-4 h-4 opacity-70" />
            </NavLink>
          ))}

          {/* Dedicated Theme Preference Selector inside Mobile Drawer */}
          <div className="mt-4 border-t border-[#EADFCF] pt-4 dark:border-white/10">
            <span className="mb-2.5 block text-[10px] font-bold uppercase tracking-widest text-[#8C6D58] dark:text-[#B18B70]">
              Theme Preference
            </span>
            <ThemeToggle variant="segmented" className="w-full justify-between" />
          </div>
        </div>

        {/* Drawer Footer CTA & Social Links */}
        <div className="border-t border-[#EADFCF] bg-[#F4EFE6] p-6 dark:border-white/10 dark:bg-[#191715]">
          <Link
            to="/contact"
              className="motion-arrow inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1A1412] py-3.5 text-sm font-semibold text-[#FDFBF7] shadow-md transition-colors hover:bg-[#382C27] dark:bg-[#F5F0E9] dark:text-[#11100F] dark:hover:bg-[#EADFCF]"
          >
            <span>Book Consultation</span>
            <ArrowRight className="h-4 w-4 text-[#D9C7B0] dark:text-[#8C6D58]" />
          </Link>

          <div className="mt-5 flex items-center justify-center gap-2.5">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit Juliana on ${social.name}`}
                title={social.name}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-[#EADFCF] text-[#5C4A3E] transition-all hover:bg-[#1A1412] hover:text-[#FDFBF7] hover:border-[#1A1412] dark:bg-[#211E1B] dark:border-white/10 dark:text-[#B8ADA1] hover:dark:bg-[#8C6D58] hover:dark:text-[#FDFBF7] hover:dark:border-[#8C6D58]"
              >
                <SocialIcon name={social.icon} className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>

          <p className="mt-4 text-center text-[10px] font-semibold uppercase tracking-wider text-[#8C6D58] dark:text-[#B18B70]">
            Co-Founder & CFO @ Deda Hospital Ltd
          </p>
        </div>

      </div>
    </>
  )
}

export default Navbar