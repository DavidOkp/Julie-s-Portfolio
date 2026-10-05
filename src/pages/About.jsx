import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Award, Sparkles, Target, ShieldCheck, Briefcase, Quote } from 'lucide-react'

const About = () => {
  return (
    <div className="py-12 pb-24 px-6 bg-[#FDFBF7] relative overflow-hidden">
      
      <div 
        className="absolute top-0 right-0 w-full sm:w-2/3 md:w-1/2 h-[600px] pointer-events-none select-none z-0 opacity-15 grayscale contrast-125 mix-blend-multiply"
        style={{
          maskImage: 'radial-gradient(circle at 70% 30%, black 10%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(circle at 70% 30%, black 10%, transparent 75%)',
        }}
      >
        <img 
          src="./src/assets/juliee-onuh.jpeg" 
          alt="" 
          className="w-full h-full object-cover object-top filter sepia-[0.2]"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="relative mb-12 title flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="max-w-4xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EADFCF]/60 border border-[#D9C7B0] text-[#5C4A3E] text-[11px] font-bold uppercase tracking-widest mb-6 shadow-sm backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#8C6D58]" />
              <span>Executive Biography & Strategic Vision</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#1A1412] tracking-tight leading-[1.1] mb-6">
              How do you <span className="font-light italic text-[#8C6D58]">scale and structure</span> your business with absolute clarity?
            </h1>
            <p className="text-[#5C4A3E] text-lg sm:text-xl font-normal max-w-3xl leading-relaxed">
              It begins where <strong className="text-theme-heading font-semibold">financial discipline meets operational courage</strong>. Guided by 14+ years as Co-Founder and CFO at Deda Hospital Ltd, I combine institutional governance with dedicated, hands-on advisory—helping visionaries turn complex financial architecture into clear roadmaps for resilient scale. <span className="text-theme-accent font-medium italic">Wherever you are on your growth journey, I am here to help you thrive.</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-20">
          
          <div className="lg:col-span-7 relative group">
            <div className="relative rounded-3xl overflow-hidden border border-[#EADFCF] bg-[#F4EFE6] shadow-xl p-2 h-full min-h-[520px]">
              <img 
                src="./src/assets/juliee-onuh.jpeg" 
                alt="Juliana Ede Onuh" 
                className="w-full h-full min-h-[520px] object-cover object-top rounded-2xl group-hover:scale-[1.01] transition-transform duration-500 ease-out"
              />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#1A1412]/85 backdrop-blur-md text-[#FDFBF7] flex justify-between items-center border border-[#382C27]/60 shadow-2xl">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#D9C7B0]">Executive Profile</p>
                  <p className="text-sm font-semibold text-[#FDFBF7]">Juliana Ede Onuh • FCCA</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase"></span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            <div className="relative p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#1A1412] via-[#2A1E17] to-[#120D0B] text-[#FDFBF7] flex flex-col justify-between h-full shadow-2xl border border-[#42342E]/70 overflow-hidden group">
              
              <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#8C6D58]/25 rounded-full blur-3xl pointer-events-none group-hover:bg-[#8C6D58]/35 transition-all duration-700" />
              <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-[#D9C7B0]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-[#D9C7B0] px-3 py-1 rounded-full bg-[#382C27]/70 border border-[#524138]">
                    <Sparkles className="w-3 h-3 text-[#D9C7B0]" /> Vision & Leadership
                  </span>
                  <Quote className="w-8 h-8 text-[#8C6D58]/40" />
                </div>

                <h2 className="text-2xl sm:text-3xl font-light leading-snug mb-5 text-[#FDFBF7] tracking-tight">
                  "Liberating startups and establishing <span className="font-serif italic text-[#D9C7B0]">sustainable financial resilience</span>."
                </h2>

                <p className="text-[#C2B2A3] text-sm leading-relaxed mb-8 font-normal">
                  Combining institutional accounting rigor with Stanford Seed transformation strategies to unlock capital efficiency, mitigate risk, and scale enterprise growth.
                </p>
              </div>

              <Link 
                to="/contact" 
                className="relative z-10 inline-flex items-center justify-between w-full p-4 rounded-2xl bg-[#2C221E]/90 hover:bg-[#382C27] border border-[#4A3B34] text-[#FDFBF7] text-xs font-bold uppercase tracking-wider transition-all shadow-md group-hover:border-[#8C6D58]/60"
              >
                <span>Schedule Strategic Audit</span>
                <div className="w-7 h-7 rounded-lg bg-[#382C27] flex items-center justify-center text-[#D9C7B0] group-hover:bg-[#8C6D58] group-hover:text-[#FDFBF7] transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-[#F4EFE6] border border-[#EADFCF] flex items-center justify-between shadow-sm hover:border-[#8C6D58]/40 transition-all">
              <div>
                <p className="text-2xl font-extrabold text-[#1A1412]">14+ Years</p>
                <p className="text-xs font-bold text-[#8C6D58] uppercase tracking-wider">ACCA Fellow Credential</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#EADFCF]/60 border border-[#D9C7B0] flex items-center justify-center">
                <Award className="w-6 h-6 text-[#8C6D58]" />
              </div>
            </div>

          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-[#EADFCF]">
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
    </div>
  )
}

export default About