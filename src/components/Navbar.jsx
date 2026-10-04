import React, { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowRight, Menu, X } from 'lucide-react'
import { navItems } from '../utils/utility'

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
      {/* Top Banner */}
      <div className="bg-[#1A1412] text-[#E8DFD5] text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest py-2.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span>Juliana Ede Onuh • Executive Portfolio</span>
          <span className="hidden sm:inline">Co-Founder & CFO @ Deda Hospital Ltd</span>
        </div>
      </div>

      {/* Main Navigation Header */}
      <nav className="border-b border-[#EADFCF] bg-[#FDFBF7]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-full bg-[#1A1412] text-[#FDFBF7] flex items-center justify-center text-lg font-extrabold tracking-tighter">
              J
            </div>
            <div className="flex flex-col">
              <span className="text-base font-extrabold tracking-tight text-[#1A1412] leading-none">
                Juliana Ede Onuh
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold text-[#8C6D58] tracking-widest uppercase mt-1">
                FCCA • Stanford STP • LBS MEMBA
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-wider">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? 'text-[#8C6D58] border-b-2 border-[#8C6D58] pb-1 transition-all'
                    : 'text-[#5C4A3E] hover:text-[#1A1412] transition-colors'
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden sm:flex items-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#1A1412] hover:bg-[#382C27] text-[#FDFBF7] font-semibold px-6 py-2.5 rounded-full text-xs uppercase tracking-wider transition-all shadow-sm"
            >
              <span>Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-[#F4EFE6] border border-[#EADFCF] text-[#1A1412] hover:bg-[#EADFCF] transition-colors focus:outline-none"
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
        className={`fixed inset-0 bg-[#1A1412]/60 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-[#FDFBF7] z-50 shadow-2xl border-l border-[#EADFCF] flex flex-col justify-between transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#EADFCF] flex items-center justify-between bg-[#F4EFE6]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#1A1412] text-[#FDFBF7] flex items-center justify-center text-sm font-extrabold">
              J
            </div>
            <div>
              <p className="text-sm font-bold text-[#1A1412]">Juliana Ede Onuh</p>
              <p className="text-[10px] font-semibold text-[#8C6D58] uppercase">Executive Menu</p>
            </div>
          </div>

          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-lg bg-[#EADFCF]/60 text-[#1A1412] hover:bg-[#EADFCF] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Navigation Links */}
        <div className="px-6 py-8 flex flex-col gap-2 overflow-y-auto flex-grow">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `p-4 rounded-xl text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-between ${
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
        <div className="p-6 border-t border-[#EADFCF] bg-[#F4EFE6]">
          <Link
            to="/contact"
            className="w-full inline-flex items-center justify-center gap-2 bg-[#1A1412] hover:bg-[#382C27] text-[#FDFBF7] font-semibold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md"
          >
            <span>Book Consultation</span>
            <ArrowRight className="w-4 h-4 text-[#D9C7B0]" />
          </Link>
          <p className="text-[10px] text-center text-[#8C6D58] mt-4 font-semibold uppercase tracking-wider">
            Co-Founder & CFO @ Deda Hospital Ltd
          </p>
        </div>

      </div>
    </>
  )
}

export default Navbar