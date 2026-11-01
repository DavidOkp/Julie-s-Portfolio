import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Award, Sparkles, Target, ShieldCheck, Briefcase, Quote, Play, ExternalLink } from 'lucide-react'
import headshotImage from '../assets/preview.png'
import profileImage from '../assets/juliee-onuh.jpeg'
import Insights from '../components/Insights'


const About = () => {
  return (
    <div className="bg-[#FDFBF7] text-[#1A1412]">
      <section 
        aria-labelledby="about-hero-title" 
        className="relative isolate flex min-h-[900px] items-center overflow-hidden bg-[#FDFBF7] lg:min-h-[700px]"
      >
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_18%_45%,#fffefa_0%,#FDFBF7_58%,#F4EFE6_100%)]" />

        <div 
          className="absolute inset-0 z-0 opacity-[0.035] pointer-events-none mix-blend-multiply"
          style={{
            backgroundImage: `linear-gradient(#1A1412 1px, transparent 1px), linear-gradient(to right, #1A1412 1px, transparent 1px)`,
            backgroundSize: '48px 48px'
          }}
        />
        <div className="absolute -top-24 -left-24 z-0 h-[500px] w-[500px] rounded-full bg-[#D9C7B0]/20 blur-[120px] pointer-events-none" />

        <div className="absolute -bottom-32 right-1/4 z-0 h-[450px] w-[450px] rounded-full bg-[#8C6D58]/10 blur-[140px] pointer-events-none" />

        <div className="absolute -top-32 right-[-5%] z-0 h-[650px] w-[650px] rounded-full border border-[#8C6D58]/10 pointer-events-none shadow-[0_0_80px_rgba(140,109,88,0.03)]" />

        <div className="absolute left-6 top-1/2 z-0 -translate-y-1/2 select-none pointer-events-none opacity-[0.025] font-serif text-[12vw] font-bold tracking-tighter text-[#1A1412] whitespace-nowrap">
          Strategic Vision
        </div>


        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 sm:py-24 lg:py-28">
          <div className="max-w-4xl lg:max-w-[56%]">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#D9C7B0]/80 bg-[#FDFBF7]/85 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#5C4A3E] shadow-[0_8px_24px_rgba(26,20,18,0.06)] backdrop-blur-sm sm:text-[11px]">
              <Sparkles className="h-3.5 w-3.5 text-[#8C6D58]" />
              <span>Executive Biography & Strategic Vision</span>
            </div>
            <h1 id="about-hero-title" className="mb-7 max-w-[13ch] text-[2.7rem] font-extrabold leading-[1.04] text-[#1A1412] sm:text-6xl lg:text-[5rem]">
              How do you <span className="font-light italic text-[#8C6D58]">scale and structure</span> your business with absolute clarity?
            </h1>
            <p className="max-w-2xl text-base font-normal leading-8 text-[#5C4A3E] sm:text-lg sm:leading-8">
              It begins where <strong className="text-theme-heading font-semibold">financial discipline meets operational courage</strong>. Guided by 14+ years as Co-Founder and CFO at Deda Hospital Ltd, I combine institutional governance with dedicated, hands-on advisory—helping visionaries turn complex financial architecture into clear roadmaps for resilient scale. <span className="text-theme-accent font-medium italic">Wherever you are on your growth journey, I am here to help you thrive.</span>
            </p>
          </div>
        </div>

        <div
          className="pointer-events-none absolute right-0 top-0 z-10 h-full min-h-[900px] w-full select-none opacity-40 sm:w-2/3 sm:opacity-75 lg:min-h-0 lg:w-[56%] lg:opacity-100"
          style={{
            maskImage: 'radial-gradient(circle at 65% 50%, black 35%, rgba(0,0,0,0.5) 60%, transparent 88%), linear-gradient(to top, transparent 0%, black 25%), linear-gradient(to right, transparent 0%, black 20%)',
            maskComposite: 'intersect',
            WebkitMaskImage: 'radial-gradient(circle at 65% 50%, black 35%, rgba(0,0,0,0.5) 60%, transparent 88%), linear-gradient(to top, transparent 0%, black 25%), linear-gradient(to right, transparent 0%, black 20%)',
            WebkitMaskComposite: 'source-in',
          }}
        >
          <img 
            src={headshotImage} 
            alt="" 
            className="h-full w-full object-contain object-right-bottom filter contrast-[1.02]" 
          />
        </div>

      </section>

      <section>
        <Insights />
     </section>

      <section aria-labelledby="vision-title" className="mx-auto px-40 py-40 pt- sm:pb-24 bg-[radial-gradient(ellipse_at_18%_45%,#fffefa_0%,#FDFBF7_58%,#F4EFE6_100%)]">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12">
          <div className="group relative lg:col-span-7">
            <div className="relative h-full min-h-[520px] overflow-hidden rounded-3xl border border-[#EADFCF] bg-[#F4EFE6] p-2 shadow-xl">
              <img
                src={profileImage}
                alt="Juliana Ede Onuh"
                className="h-full min-h-[520px] w-full rounded-2xl object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.01]"
              />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-2xl border border-[#382C27]/60 bg-[#1A1412]/85 p-4 text-[#FDFBF7] shadow-2xl backdrop-blur-md">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#D9C7B0]">Executive Profile</p>
                  <p className="text-sm font-semibold text-[#FDFBF7]">Juliana Ede Onuh • FCCA</p>
                </div>
                <span className="h-2 w-2 rounded-full bg-emerald-400" aria-label="Available for advisory" />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-6 lg:col-span-5">
            <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-[#42342E]/70 bg-gradient-to-br from-[#1A1412] via-[#2A1E17] to-[#120D0B] p-8 text-[#FDFBF7] shadow-2xl sm:p-10">
              <div className="pointer-events-none absolute -right-24 -top-24 h-60 w-60 rounded-full bg-[#8C6D58]/25 blur-3xl transition-all duration-700 group-hover:bg-[#8C6D58]/35" />
              <div className="pointer-events-none absolute -bottom-24 -left-24 h-60 w-60 rounded-full bg-[#D9C7B0]/10 blur-3xl" />

              <div className="relative z-10">
                <div className="mb-6 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#524138] bg-[#382C27]/70 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-[#D9C7B0]">
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
                className="relative z-10 inline-flex w-full items-center justify-between rounded-2xl border border-[#4A3B34] bg-[#2C221E]/90 p-4 text-xs font-bold uppercase tracking-wider text-[#FDFBF7] shadow-md transition-all hover:bg-[#382C27] group-hover:border-[#8C6D58]/60"
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