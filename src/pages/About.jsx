import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Award,
  Sparkles,
  Target,
  ShieldCheck,
  Briefcase,
  Quote,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import headshotImage from '../assets/red-head-shot.png'
import profileImage from '../assets/juliee-onuh.jpeg'
import image2 from '../assets/black-pose2.png'
import image3 from '../assets/image-seating.jpeg'
import Insights from '../components/Insights'
import { heroSlides } from '../utils/data'


const About = () => {
  const [heroSlide, setHeroSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)

  const carouselImages = [
    { src: profileImage, alt: "Juliana Ede Onuh - Executive Portrait" },
    { src: image2, alt: "Juliana Ede Onuh - Strategic Consultation" },
    { src: image3, alt: "Juliana Ede Onuh - Advisory & Leadership" },
  ]

  useEffect(() => {
    if (isPaused) return

    const intervalTime = 50 
    const totalDuration = 5000
    const step = (intervalTime / totalDuration) * 100

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setHeroSlide((current) => (current + 1) % heroSlides.length)
          return 0
        }
        return prev + step
      })
    }, intervalTime)

    return () => clearInterval(timer)
  }, [isPaused])

  const nextHeroSlide = () => {
    setHeroSlide((prev) => (prev + 1) % heroSlides.length)
    setProgress(0)
  }

  const prevHeroSlide = () => {
    setHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    setProgress(0)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [carouselImages.length])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)

  return (
    <div className="bg-[#FDFBF7] text-[#1A1412]">
      <section
        aria-labelledby="about-hero-title"
        className="relative isolate flex min-h-[960px] lg:min-h-[820px] items-center overflow-hidden bg-[#FDFBF7]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_18%_45%,#fffefa_0%,#FDFBF7_58%,#F4EFE6_100%)]" />

        {/* Micro-grid overlay */}
        <div
          className="absolute inset-0 z-0 opacity-[0.035] pointer-events-none mix-blend-multiply"
          style={{
            backgroundImage: `linear-gradient(#1A1412 1px, transparent 1px), linear-gradient(to right, #1A1412 1px, transparent 1px)`,
            backgroundSize: '48px 48px'
          }}
        />

        {/* Ethereal ambient light spheres */}
        <div className="absolute -top-24 -left-24 z-0 h-[520px] w-[520px] rounded-full bg-[#D9C7B0]/25 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-32 right-1/3 z-0 h-[480px] w-[480px] rounded-full bg-[#8C6D58]/12 blur-[140px] pointer-events-none" />
        <div className="absolute -top-32 right-[-5%] z-0 h-[680px] w-[680px] rounded-full border border-[#8C6D58]/10 pointer-events-none shadow-[0_0_80px_rgba(140,109,88,0.03)]" />

        {/* Dynamic Watermark that changes per slide */}
        <div className="absolute left-6 top-1/2 z-0 -translate-y-1/2 select-none pointer-events-none font-serif text-[12vw] font-bold tracking-tighter text-[#1A1412] whitespace-nowrap overflow-hidden">
          {heroSlides.map((slide, index) => (
            <span
              key={slide.id}
              className={`block transition-all duration-1000 ease-in-out ${index === heroSlide ? 'opacity-[0.03] scale-100' : 'opacity-0 scale-95 pointer-events-none hidden'
                }`}
            >
              {slide.watermark}
            </span>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 sm:py-24 lg:py-28">
          <div className="max-w-4xl lg:max-w-[58%]">

            {/* Carousel Text Slides with smooth fade & translate */}
            <div className="relative min-h-[460px] sm:min-h-[420px] lg:min-h-[430px] flex flex-col justify-center">
              {heroSlides.map((slide, index) => {
                const isActive = index === heroSlide
                return (
                  <div
                    key={slide.id}
                    className={`transition-all duration-700 ease-out ${isActive
                        ? 'opacity-100 translate-y-0 relative z-10'
                        : 'opacity-0 translate-y-6 pointer-events-none absolute inset-0 z-0'
                      }`}
                  >
                    {/* Eyebrow / Tag */}
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D9C7B0]/80 bg-[#FDFBF7]/90 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#5C4A3E] shadow-[0_8px_24px_rgba(26,20,18,0.04)] backdrop-blur-sm sm:text-[11px]">
                      <Sparkles className="h-3.5 w-3.5 text-[#8C6D58]" />
                      <span>{slide.tag}</span>
                      <span className="hidden sm:inline text-[#8C6D58]/60">•</span>
                      <span className="hidden sm:inline text-[#8C6D58] font-semibold">{slide.badge}</span>
                    </div>

                    {/* Headline */}
                    <h1 id="about-hero-title" className="mb-6 max-w-[15ch] text-[2.7rem] font-extrabold leading-[1.04] text-[#1A1412] sm:text-6xl lg:text-[4.5rem]">
                      {slide.titleStart}
                      <span className="font-serif italic font-light text-[#8C6D58]">
                        {slide.titleHighlight}
                      </span>
                      {slide.titleEnd}
                    </h1>

                    {/* Narrative Description */}
                    <p className="max-w-2xl text-base font-normal leading-8 text-[#5C4A3E] sm:text-lg sm:leading-8 mb-4">
                      {slide.description}
                    </p>

                    {/* Italic Accent Quote */}
                    <p className="text-sm font-serif italic text-[#8C6D58] mb-8 font-normal">
                      &ldquo;{slide.accentQuote}&rdquo;
                    </p>

                    {/* Action Link & Credential Metric */}
                    <div className="flex flex-wrap items-center gap-5 sm:gap-8">
                      <Link
                        to={slide.ctaLink}
                        className="group inline-flex items-center gap-3 rounded-2xl border border-[#382C27] bg-[#1A1412] px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#FDFBF7] shadow-xl transition-all duration-300 hover:bg-[#2C221E] hover:border-[#8C6D58]/60 hover:shadow-2xl"
                      >
                        <span>{slide.ctaText}</span>
                        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#382C27] text-[#D9C7B0] transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-[#8C6D58] group-hover:text-white">
                          <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </Link>

                      <div className="flex items-center gap-3 pl-3 sm:pl-5 border-l border-[#D9C7B0]/80">
                        <div>
                          <p className="text-xl font-extrabold text-[#1A1412] leading-none">{slide.metric}</p>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-[#8C6D58] mt-1.5">{slide.metricLabel}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Editorial Timeline & Progress Controls */}
            <div className="mt-12 pt-8 border-t border-[#EADFCF]/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

              {/* Slide Tabs with Animated Progress Line */}
              <div className="flex items-center gap-3 sm:gap-6 w-full sm:w-auto">
                {heroSlides.map((slide, index) => {
                  const isActive = index === heroSlide
                  return (
                    <button
                      key={slide.id}
                      onClick={() => {
                        setHeroSlide(index)
                        setProgress(0)
                      }}
                      className="group flex flex-col text-left cursor-pointer transition-all focus:outline-none"
                      aria-label={`Jump to slide ${index + 1}`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-[10px] font-mono font-bold tracking-widest transition-colors ${isActive ? 'text-[#1A1412]' : 'text-[#8C6D58]/60 group-hover:text-[#8C6D58]'
                          }`}>
                          0{index + 1}
                        </span>
                        <span className={`text-xs font-semibold tracking-wide transition-colors ${isActive ? 'text-[#1A1412]' : 'text-[#8C6D58]/60 group-hover:text-[#8C6D58]'
                          }`}>
                          {index === 0 ? 'Scale & Clarity' : index === 1 ? 'Capital Rigor' : 'Board Counsel'}
                        </span>
                      </div>

                      {/* Animated Progress Bar */}
                      <div className="h-1 w-20 sm:w-28 md:w-36 rounded-full bg-[#EADFCF] overflow-hidden">
                        <div
                          className={`h-full bg-[#8C6D58] rounded-full transition-all ${isActive ? 'duration-100 ease-linear' : 'duration-300 w-0'
                            }`}
                          style={{ width: isActive ? `${progress}%` : '0%' }}
                        />
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Prev / Pause / Next Controls */}
              <div className="flex items-center gap-2.5 self-end sm:self-auto">
                <span className="text-[11px] font-mono tracking-widest text-[#8C6D58] mr-2">
                  <strong className="text-[#1A1412]">0{heroSlide + 1}</strong> / 0{heroSlides.length}
                </span>

                <button
                  onClick={() => setIsPaused((prev) => !prev)}
                  title={isPaused ? "Resume auto-play" : "Pause auto-play"}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D9C7B0] bg-[#FDFBF7] text-[#5C4A3E] shadow-sm transition-all hover:bg-[#F4EFE6] hover:text-[#1A1412] active:scale-95"
                >
                  {isPaused ? <Play className="h-3.5 w-3.5 fill-current" /> : <Pause className="h-3.5 w-3.5" />}
                </button>

                <button
                  onClick={prevHeroSlide}
                  aria-label="Previous slide"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D9C7B0] bg-[#FDFBF7] text-[#5C4A3E] shadow-sm transition-all hover:bg-[#F4EFE6] hover:text-[#1A1412] active:scale-95"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <button
                  onClick={nextHeroSlide}
                  aria-label="Next slide"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D9C7B0] bg-[#FDFBF7] text-[#5C4A3E] shadow-sm transition-all hover:bg-[#F4EFE6] hover:text-[#1A1412] active:scale-95"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Right-Hand Hero Image Carousel with Mask & Subtle Ken Burns */}
        <div
          className="pointer-events-none absolute right-0 top-0 z-10 h-full min-h-[900px] w-full select-none opacity-40 sm:w-2/3 sm:opacity-75 lg:min-h-0 lg:w-[56%] lg:opacity-100"
          style={{
            maskImage: 'radial-gradient(circle at 65% 50%, black 35%, rgba(0,0,0,0.5) 60%, transparent 88%), linear-gradient(to top, transparent 0%, black 25%), linear-gradient(to right, transparent 0%, black 20%)',
            maskComposite: 'intersect',
            WebkitMaskImage: 'radial-gradient(circle at 65% 50%, black 35%, rgba(0,0,0,0.5) 60%, transparent 88%), linear-gradient(to top, transparent 0%, black 25%), linear-gradient(to right, transparent 0%, black 20%)',
            WebkitMaskComposite: 'source-in',
          }}
        >
          {heroSlides.map((slide, index) => {
            const isActive = index === heroSlide
            return (
              <img
                key={slide.id}
                src={slide.image}
                alt={slide.tag}
                className={`absolute inset-0 h-full w-full object-contain object-right-bottom filter contrast-[1.02] transition-all duration-1000 ease-in-out ${isActive
                    ? 'opacity-100 scale-100 z-10'
                    : 'opacity-0 scale-105 pointer-events-none z-0'
                  }`}
              />
            )
          })}
        </div>

        {/* Floating Executive Tag on Bottom Right of the Hero */}
        <div className="pointer-events-none absolute bottom-8 right-8 z-20 hidden xl:flex items-center gap-3 rounded-2xl border border-[#382C27]/40 bg-[#1A1412]/80 px-4 py-2.5 text-[#FDFBF7] shadow-xl backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <p className="text-[11px] font-semibold tracking-wide">
            {heroSlides[heroSlide].badgePill} • <span className="text-[#D9C7B0]">Juliana Ede Onuh</span>
          </p>
        </div>

      </section>

      <section>
        <Insights />
      </section>

      <section
        aria-labelledby="vision-title"
        className="mx-auto max-auto px-6 py-20 sm:px-10 sm:pb-24 lg:px-40 bg-[radial-gradient(ellipse_at_18%_45%,#fffefa_0%,#FDFBF7_58%,#F4EFE6_100%)]"
      >
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12">

          <div className="group relative lg:col-span-7">
            <div className="relative h-full min-h-[540px] overflow-hidden rounded-3xl border border-[#EADFCF] bg-[#F4EFE6] p-2 shadow-xl">

              <div className="relative h-full min-h-[520px] w-full overflow-hidden rounded-2xl">
                {carouselImages.map((image, index) => {
                  const isActive = index === currentSlide
                  return (
                    <img
                      key={index}
                      src={image.src}
                      alt={image.alt}
                      className={`absolute inset-0 h-full w-full object-cover object-top transition-all duration-1000 ease-in-out ${isActive
                          ? 'opacity-100 scale-100 z-10'
                          : 'opacity-0 scale-105 pointer-events-none z-0'
                        }`}
                    />
                  )
                })}

                {/* Top-Right Modern Slide Indicators */}
                <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 backdrop-blur-md">
                  {carouselImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentSlide
                          ? 'w-6 bg-[#D9C7B0]'
                          : 'w-2 bg-white/40 hover:bg-white/70'
                        }`}
                    />
                  ))}
                </div>

                {/* Hover Navigation Arrows (Subtle & Elegant) */}
                <div className="absolute inset-y-0 left-3 right-3 z-20 flex items-center justify-between opacity-0 transition-opacity duration-300 group-hover:opacity-100
                  pointer-events-none">
                  <button
                    onClick={prevSlide}
                    aria-label="Previous Slide"
                    className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-md transition-all
                      hover:bg-black/70 hover:scale-105"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    aria-label="Next Slide"
                    className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-md transition-all
                      hover:bg-black/70 hover:scale-105"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>

                {/* Floating Profile Badge */}
                <div className="absolute bottom-6 left-6 right-6 z-20 flex items-center justify-between rounded-2xl border border-[#382C27]/60 bg-[#1A1412]/85 p-4 text-[#FDFBF7]
                  shadow-2xl backdrop-blur-md">
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#D9C7B0]">Executive Profile</p>
                    <p className="text-sm font-semibold text-[#FDFBF7]">Juliana Ede Onuh • FCCA</p>
                  </div>
                  <span className="h-2 w-2 rounded-full bg-emerald-400" aria-label="Available for advisory" />
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col justify-between gap-6 lg:col-span-5">
            <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-[#42342E]/70 bg-gradient-to-br from-[#1A1412] via-[#2A1E17]
              to-[#120D0B] p-8 text-[#FDFBF7] shadow-2xl sm:p-10">
              <div className="pointer-events-none absolute -right-24 -top-24 h-60 w-60 rounded-full bg-[#8C6D58]/25 blur-3xl transition-all duration-700 group-hover:bg-[#8C6D58]/35" />
              <div className="pointer-events-none absolute -bottom-24 -left-24 h-60 w-60 rounded-full bg-[#D9C7B0]/10 blur-3xl" />

              <div className="relative z-10">
                <div className="mb-6 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#524138] bg-[#382C27]/70 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest
                    text-[#D9C7B0]">
                    <Sparkles className="h-3 w-3 text-[#D9C7B0]" /> Vision & Leadership
                  </span>
                  <Quote className="h-8 w-8 text-[#8C6D58]/40" />
                </div>

                <h2 id="vision-title" className="mb-5 text-2xl font-light leading-snug tracking-tight text-[#FDFBF7] sm:text-3xl">
                  &ldquo;Liberating startups and establishing <span className="font-serif italic text-[#D9C7B0]">sustainable financial resilience</span>.&rdquo;
                </h2>
                <p className="mb-8 text-sm font-normal leading-relaxed text-[#C2B2A3]">
                  Combining institutional accounting rigor with Stanford Seed transformation strategies to unlock capital efficiency, mitigate risk, and scale enterprise growth.
                </p>
              </div>

              <Link
                to="/contact"
                className="relative z-10 inline-flex w-full items-center justify-between rounded-2xl border border-[#4A3B34] bg-[#2C221E]/90 p-4 text-xs font-bold uppercase
                  tracking-wider text-[#FDFBF7] shadow-md transition-all hover:bg-[#382C27] group-hover:border-[#8C6D58]/60"
              >
                <span>Schedule Strategic Audit</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#382C27] text-[#D9C7B0] transition-colors group-hover:bg-[#8C6D58] group-hover:text-[#FDFBF7]">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-[#EADFCF] bg-[#F4EFE6] p-6 shadow-sm transition-all hover:border-[#8C6D58]/40">
              <div>
                <p className="text-2xl font-extrabold text-[#1A1412]">14+ Years</p>
                <p className="text-xs font-bold uppercase tracking-wider text-[#8C6D58]">ACCA Fellow Credential</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#D9C7B0] bg-[#EADFCF]/60">
                <Award className="h-6 w-6 text-[#8C6D58]" />
              </div>
            </div>
          </div>

        </div>
      </section>

      <section aria-labelledby="expertise-title" className="mx-auto max-w-7xl px-6 pb-24">
        <div className="border-t border-[#EADFCF] pt-12">
          <div className="mb-8 max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#8C6D58]">Areas of focus</p>
            <h2 id="expertise-title" className="text-3xl font-bold tracking-tight text-[#1A1412] sm:text-4xl">Where strategy becomes action</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="p-8 rounded-3xl bg-[#F4EFE6] border border-[#EADFCF] hover:border-[#8C6D58]/50 transition-all shadow-sm">
              <Target className="w-8 h-8 text-[#8C6D58] mb-4" />
              <h3 className="text-lg font-bold text-[#1A1412] mb-2">Strategic Restructuring</h3>
              <p className="text-[#5C4A3E] text-sm leading-relaxed">
                Designing internal control systems and capital allocation strategies that ensure operational efficiency.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#F4EFE6] border border-[#EADFCF] hover:border-[#8C6D58]/50 transition-all shadow-sm">
              <Briefcase className="w-8 h-8 text-[#8C6D58] mb-4" />
              <h3 className="text-lg font-bold text-[#1A1412] mb-2">Healthcare Governance</h3>
              <p className="text-[#5C4A3E] text-sm leading-relaxed">
                Directing administrative and fiscal growth at Deda Hospital Ltd to align clinical services with corporate profitability.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#F4EFE6] border border-[#EADFCF] hover:border-[#8C6D58]/50 transition-all shadow-sm">
              <ShieldCheck className="w-8 h-8 text-[#8C6D58] mb-4" />
              <h3 className="text-lg font-bold text-[#1A1412] mb-2">Institutional Integrity</h3>
              <p className="text-[#5C4A3E] text-sm leading-relaxed">
                Upholding governance standards across compliance, internal audits, and risk assessment models.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About