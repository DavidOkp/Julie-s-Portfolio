import React from 'react'
import { Sparkles, ArrowRight, ShieldCheck, TrendingUp, Building2, Users, FileText, Compass } from 'lucide-react'
import { Link } from 'react-router-dom'

const competencies = [
  {
    icon: TrendingUp,
    title: "Financial Restructuring",
    desc: "Implementing rigorous internal controls, optimizing cash flows, and designing strategic reporting frameworks for sustainable profitability."
  },
  {
    icon: Building2,
    title: "Healthcare Executive Leadership",
    desc: "Directing operations and financial architecture at Deda Hospital Ltd, aligning clinical excellence with corporate growth."
  },
  {
    icon: Users,
    title: "SME Empowerment & Advisory",
    desc: "Consulting focused on financial liberation for startups, establishing scalable operating models and capital efficiency."
  },
  {
    icon: ShieldCheck,
    title: "Governance & Risk Management",
    desc: "Leveraging over 14 years as an ACCA Fellow to ensure regulatory compliance, internal audit integrity, and enterprise risk mitigation."
  },
  {
    icon: Compass,
    title: "Business Scaling Strategy",
    desc: "Applying methodologies from Stanford GSB STP and Lagos Business School MEMBA to restructure and expand growing enterprises."
  },
  {
    icon: FileText,
    title: "Women in Business Mentorship",
    desc: "Providing dedicated strategy and financial guidance to help female founders and executives build high-impact companies."
  }
]

const Expertise = () => {
  return (
    <div className="py-12 pb-24 px-6 bg-[#F5EFE6] min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto">
        
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EADFCF]/80 border border-[#D9C7B0] text-[#5C4A3E] text-[11px] font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#8C6D58]" />
            <span>Core Competencies</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-[#1A1412] tracking-tight mb-6">
            Tailored Executive & <span className="font-light italic text-[#8C6D58]">Financial Solutions</span>
          </h1>
          <p className="text-[#5C4A3E] text-lg leading-relaxed">
            Strategic advisory and operational leadership grounded in 14+ years of institutional finance, healthcare management, and enterprise governance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {competencies.map((card, idx) => {
            const Icon = card.icon
            return (
              <div 
                key={idx}
                className="p-8 rounded-3xl bg-[#FDFBF7] border border-[#EADFCF] hover:border-[#8C6D58] transition-all hover:shadow-lg flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#F4EFE6] text-[#8C6D58] flex items-center justify-center group-hover:bg-[#1A1412] group-hover:text-[#FDFBF7] transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-[#8C6D58]/60 font-mono">0{idx + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#1A1412] mb-3 group-hover:text-[#8C6D58] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-[#5C4A3E] text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="p-8 sm:p-12 rounded-3xl bg-[#1A1412] text-[#FDFBF7] flex flex-col sm:flex-row items-center justify-between gap-8 border border-[#382C27] shadow-xl">
          <div className="max-w-2xl">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#D9C7B0] block mb-2">
              Advisory Engagement
            </span>
            <h2 className="text-2xl sm:text-3xl font-light">
              Need strategic oversight for your financial restructuring?
            </h2>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-[#8C6D58] hover:bg-[#A3826C] text-[#FDFBF7] font-semibold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all whitespace-nowrap shadow-md"
          >
            <span>Book Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Expertise