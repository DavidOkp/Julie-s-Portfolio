import React from 'react'
import { Sparkles, Award, GraduationCap, Building, BookOpen, CheckCircle2 } from 'lucide-react'

const credentials = [
  {
    title: "ACCA Fellow (FCCA)",
    sub: "Association of Chartered Certified Accountants",
    detail: "14+ years of active fellowship and senior membership upholding high-standard global accounting, audit, and ethical principles.",
    type: "Professional Fellowship",
    icon: Award
  },
  {
    title: "Stanford GSB STP",
    sub: "Stanford Graduate School of Business",
    detail: "Seed Transformation Program graduate, mastering strategy, growth transformation, and leadership scaling models.",
    type: "Executive Education",
    icon: GraduationCap
  },
  {
    title: "LBS MEMBA",
    sub: "Lagos Business School",
    detail: "Modular Executive MBA (Cohort 14), focusing on executive strategy, governance, and business administration in emerging markets.",
    type: "Executive MBA",
    icon: Building
  },
  {
    title: "BSc Banking & Finance",
    sub: "Kogi State University",
    detail: "Bachelor of Science degree laying foundational principles in financial system management and corporate finance.",
    type: "Academic Degree",
    icon: BookOpen
  }
]

const Credentials = () => {
  return (
    <div className="py-12 pb-24 px-6 bg-[#FDFBF7] min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto">
        
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EADFCF]/60 border border-[#D9C7B0] text-[#5C4A3E] text-[11px] font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#8C6D58]" />
            <span>Academic & Professional Pedigree</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-[#1A1412] tracking-tight mb-6">
            Institutional Rigor & <span className="font-light italic text-[#8C6D58]">Global Credentials</span>
          </h1>
          <p className="text-[#5C4A3E] text-lg leading-relaxed">
            Continuous executive development across top global institutions, bridging international finance standards with local operational execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {credentials.map((item, i) => {
            const Icon = item.icon
            return (
              <div 
                key={i} 
                className="p-8 sm:p-10 rounded-3xl bg-[#F4EFE6] border border-[#EADFCF] hover:border-[#8C6D58] transition-all shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3.5 py-1 rounded-full bg-[#1A1412] text-[#D9C7B0] text-[10px] font-bold uppercase tracking-widest">
                      {item.type}
                    </span>
                    <Icon className="w-6 h-6 text-[#8C6D58]" />
                  </div>
                  <h2 className="text-2xl font-extrabold text-[#1A1412] mb-2">{item.title}</h2>
                  <p className="text-[#8C6D58] text-xs font-bold uppercase tracking-wider mb-4">{item.sub}</p>
                  <p className="text-[#5C4A3E] text-sm leading-relaxed">{item.detail}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#2C221E] via-[#1A1412] to-[#0D0A09] text-[#FDFBF7] border border-[#3A2D27] shadow-2xl">
          <h3 className="text-xl sm:text-2xl font-bold mb-6 text-[#D9C7B0]">Core Governance Highlights</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#8C6D58] shrink-0 mt-0.5" />
              <p className="text-[#C2B2A3]"><strong className="text-[#FDFBF7]">14+ Years Member:</strong> Active fellow within the ACCA community.</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#8C6D58] shrink-0 mt-0.5" />
              <p className="text-[#C2B2A3]"><strong className="text-[#FDFBF7]">Healthcare Board:</strong> Executive leadership at Deda Hospital Ltd.</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#8C6D58] shrink-0 mt-0.5" />
              <p className="text-[#C2B2A3]"><strong className="text-[#FDFBF7]">Stanford Alumni Network:</strong> Global entrepreneurship cohort.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Credentials