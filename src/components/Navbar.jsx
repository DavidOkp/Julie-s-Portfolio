import React, { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowRight, Menu, X } from 'lucide-react'
import { navItems } from '../data/header.data'

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
      <nav className="sticky top-0 z-40 border-b border-[#EADFCF] bg-[#FDFBF7]/95 backdrop-blur-md">
        <div className="mx-auto grid h-24 max-w-[1680px] grid-cols-[1fr_auto] items-center px-5 sm:px-8 lg:h-20 lg:grid-cols-[1fr_auto_1fr] lg:px-12">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 justify-self-start shrink-0">
            <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#1A1412] text-lg font-extrabold tracking-tight text-[#FDFBF7] shadow-[0_8px_20px_rgba(26,20,18,0.12)]">
              J
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-extrabold leading-none tracking-wide text-[#1A1412] sm:text-base">
                JULIANA E. ONUH
              </span>
              <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#8C6D58] sm:text-[10px]">
                Executive Portfolio
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden items-center gap-1 rounded-full border border-white/70 bg-white/75 p-1.5 shadow-[0_12px_35px_rgba(26,20,18,0.08)] xl:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `whitespace-nowrap rounded-full px-4 py-3 text-[13px] font-medium transition-all ${
                    isActive || (item.path === '/about' && location.pathname === '/')
                      ? 'bg-white text-[#1A1412] shadow-[0_4px_14px_rgba(26,20,18,0.08)]'
                      : 'text-[#5C4A3E] hover:bg-[#F4EFE6] hover:text-[#1A1412]'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden justify-self-end xl:flex items-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#1A1412] px-6 py-3.5 text-[13px] font-semibold text-[#FDFBF7] shadow-[0_8px_20px_rgba(26,20,18,0.12)] transition-colors hover:bg-[#382C27]"
            >
              <span>Let’s talk</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <div className="flex items-center gap-2 justify-self-end xl:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-full border border-[#EADFCF] bg-[#F4EFE6] p-2.5 text-[#1A1412] transition-colors hover:bg-[#EADFCF] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#1A1412]" />
              ) : (
                <Menu className="w-6 h-6 text-[#1A1412]" />
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
        className={`fixed right-0 top-0 z-50 flex h-full w-[85%] max-w-sm flex-col justify-between border-l border-[#EADFCF] bg-[#FDFBF7] shadow-2xl transition-transform duration-300 ease-in-out xl:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-[#EADFCF] bg-[#F4EFE6] p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1A1412] text-sm font-extrabold text-[#FDFBF7]">
              J
            </div>
            <div>
              <p className="text-sm font-bold text-[#1A1412]">Juliana Ede Onuh</p>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8C6D58]">Executive Menu</p>
            </div>
          </div>

          <button
            onClick={() => setMobileMenuOpen(false)}
            className="rounded-full bg-[#EADFCF]/60 p-2 text-[#1A1412] transition-colors hover:bg-[#EADFCF]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Navigation Links */}
        <div className="flex flex-grow flex-col gap-2 overflow-y-auto px-6 py-8">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between rounded-2xl p-4 text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-[#1A1412] text-[#FDFBF7] shadow-md'
                    : 'text-[#5C4A3E] hover:bg-[#F4EFE6] hover:text-[#1A1412]'
                }`
              }
            >
              <span>{item.name}</span>
              <ArrowRight className="w-4 h-4 opacity-70" />
            </NavLink>
          ))}
        </div>

        {/* Drawer Footer CTA */}
        <div className="border-t border-[#EADFCF] bg-[#F4EFE6] p-6">
          <Link
            to="/contact"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1A1412] py-3.5 text-sm font-semibold text-[#FDFBF7] shadow-md transition-colors hover:bg-[#382C27]"
          >
            <span>Book Consultation</span>
            <ArrowRight className="h-4 w-4 text-[#D9C7B0]" />
          </Link>
          <p className="mt-4 text-center text-[10px] font-semibold uppercase tracking-wider text-[#8C6D58]">
            Co-Founder & CFO @ Deda Hospital Ltd
          </p>
        </div>

      </div>
    </>
  )
}

export default Navbar