import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowRight, ArrowUp, Mail, MapPin, Sparkles, ChevronRight } from 'lucide-react'
import { navItems } from '../data/header.data'
import { socialLinks } from '../data/social.data'
import { SocialIcon } from './SocialIcon'

const focusAreas = [
  { name: 'Healthcare Financial Governance', path: '/expertise' },
  { name: 'Capital Allocation & Treasury Strategy', path: '/expertise' },
  { name: 'Institutional Pedigree & Rigor', path: '/credentials' },
  { name: 'SME Scaling & Female Leadership', path: '/impact' },
  { name: 'Executive Insights & Media', path: '/blog' },
]

const Footer = () => {
  const location = useLocation()

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <footer className="relative z-0 lg:sticky lg:bottom-0 border-t border-[#2E231F] bg-[#1A1412] text-[#FDFBF7] mt-auto">
      {/* Top Banner / Consultation Callout */}
      <div className="border-b border-[#2E231F]/80 bg-[#221B18]/60">
        <div className="max-w-7xl mx-auto px-6 py-8 sm:px-8 lg:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2E231F] border border-[#4A3B32] text-[#D9C7B0] text-[11px] font-bold tracking-widest uppercase mb-3">
              <Sparkles className="w-3 h-3 text-[#D9C7B0]" />
              <span>Executive Advisory</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#FDFBF7]">
              Ready to structure and scale your enterprise with institutional clarity?
            </h3>
            <p className="text-sm text-[#C2B2A3] mt-1">
              Available for board advisory, healthcare financial governance, and strategic consultations.
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#FDFBF7] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#1A1412] shadow-lg transition-all hover:bg-[#EADFCF] shrink-0"
          >
            <span>Book Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-14 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Brand Profile & Social Media Column */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <Link to="/" className="flex items-center gap-3 shrink-0 group w-fit">
              <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#2C221E] border border-[#4A3B32] text-lg font-extrabold tracking-tight text-[#FDFBF7] shadow-md group-hover:border-[#8C6D58] transition-colors">
                J
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-base font-extrabold leading-none tracking-wide text-[#FDFBF7]">
                  JULIANA E. ONUH
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#D9C7B0]">
                  Executive Portfolio & Advisory
                </span>
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-[#C2B2A3] max-w-sm">
              Co-Founder, CFO and Admin Director at Deda Hospital Ltd. FCCA Fellow bridging global accounting rigor with high-growth healthcare and enterprise leadership.
            </p>

            <div className="flex flex-col gap-2.5 text-xs text-[#C2B2A3]">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#D9C7B0] shrink-0" />
                <span>Deda Hospital Ltd, Abuja, Nigeria</span>
              </div>
              <Link
                to="/contact"
                className="flex items-center gap-2.5 hover:text-[#FDFBF7] transition-colors group w-fit"
              >
                <Mail className="w-4 h-4 text-[#D9C7B0] shrink-0" />
                <span>Executive Office & Advisory Inquiries</span>
                <ArrowRight className="w-3 h-3 text-[#D9C7B0] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
            </div>

            {/* Social Media Links */}
            <div className="pt-2">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#D9C7B0] mb-3">
                Connect & Follow
              </p>
              <div className="flex items-center gap-2.5 flex-wrap">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit Juliana on ${social.name}`}
                    title={`${social.name} (${social.handle})`}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#221B18] border border-[#382C27] text-[#C2B2A3] transition-all hover:bg-[#8C6D58] hover:text-[#FDFBF7] hover:border-[#D9C7B0] hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <SocialIcon name={social.icon} className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Menu Column */}
          <div className="lg:col-span-3 flex flex-col">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D9C7B0] mb-5">
              Navigation Menu
            </p>
            <ul className="flex flex-col space-y-2.5">
              {navItems.map((item) => {
                const isActive =
                  location.pathname === item.path ||
                  (item.path === '/about' && location.pathname === '/')

                return (
                  <li key={item.name}>
                    <NavLink
                      to={item.path}
                      className={`group flex items-center justify-between text-sm py-1 transition-all ${
                        isActive
                          ? 'text-[#FDFBF7] font-semibold pl-1'
                          : 'text-[#C2B2A3] hover:text-[#FDFBF7] hover:translate-x-1'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className={`h-1.5 w-1.5 rounded-full transition-all ${
                            isActive
                              ? 'bg-[#D9C7B0] ring-4 ring-[#D9C7B0]/20'
                              : 'bg-transparent group-hover:bg-[#8C6D58]'
                          }`}
                        />
                        {item.name}
                      </span>
                      <ChevronRight
                        className={`w-3.5 h-3.5 transition-all ${
                          isActive
                            ? 'text-[#D9C7B0] opacity-100'
                            : 'text-[#8C6D58] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5'
                        }`}
                      />
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Strategic Focus Areas Column */}
          <div className="lg:col-span-3 flex flex-col">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D9C7B0] mb-5">
              Strategic Focus
            </p>
            <ul className="flex flex-col space-y-2.5">
              {focusAreas.map((area, idx) => (
                <li key={idx}>
                  <Link
                    to={area.path}
                    className="text-sm py-1 text-[#C2B2A3] hover:text-[#FDFBF7] hover:translate-x-1 inline-flex items-center gap-1.5 transition-all group"
                  >
                    <span className="text-[#8C6D58] text-xs">/</span>
                    <span>{area.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Actions Column */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D9C7B0] mb-5">
                Quick Access
              </p>
              <div className="flex flex-col gap-3">
                <Link
                  to="/contact"
                  className="w-full text-center rounded-xl bg-[#2C221E] hover:bg-[#382C27] border border-[#4A3B32] hover:border-[#8C6D58] py-2.5 px-3 text-xs font-medium text-[#FDFBF7] transition-all"
                >
                  Contact Juliana
                </Link>
                <Link
                  to="/credentials"
                  className="w-full text-center rounded-xl bg-[#2C221E] hover:bg-[#382C27] border border-[#4A3B32] hover:border-[#8C6D58] py-2.5 px-3 text-xs font-medium text-[#FDFBF7] transition-all"
                >
                  View Credentials
                </Link>
                <Link
                  to="/blog"
                  className="w-full text-center rounded-xl bg-[#2C221E] hover:bg-[#382C27] border border-[#4A3B32] hover:border-[#8C6D58] py-2.5 px-3 text-xs font-medium text-[#FDFBF7] transition-all"
                >
                  Read Articles
                </Link>
              </div>
            </div>

            <button
              onClick={scrollToTop}
              type="button"
              className="mt-8 lg:mt-0 inline-flex items-center justify-center gap-2 rounded-xl bg-[#221B18] hover:bg-[#2C221E] border border-[#382C27] py-2 px-3 text-xs text-[#C2B2A3] hover:text-[#FDFBF7] transition-all cursor-pointer"
              aria-label="Scroll back to top of page"
            >
              <ArrowUp className="w-3.5 h-3.5 text-[#D9C7B0]" />
              <span>Back to top</span>
            </button>
          </div>

        </div>
      </div>

      {/* Bottom Bar: Copyright, Social badges & Attribution */}
      <div className="border-t border-[#2E231F] bg-[#140F0D]">
        <div className="max-w-7xl mx-auto px-6 py-6 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C6D58]">
          <p>
            &copy; {new Date().getFullYear()} Juliana Ede Onuh, FCCA. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-[11px] text-[#A69282]">
            <span>Stanford Seed Transformation Alumna</span>
            <span>•</span>
            <span>FCCA Fellow</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
