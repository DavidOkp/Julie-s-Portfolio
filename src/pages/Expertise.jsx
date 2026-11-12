import { Lightbulb, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { competencies } from '../data/expertise.data'



const Expertise = () => {
  return (
    <div className="py-12 pb-24 px-6 bg-[#F5EFE6] min-h-[calc(100vh-80px)] dark:bg-[#11100F]">
      <div className="max-w-7xl mx-auto">
        
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EADFCF]/80 border border-[#D9C7B0] text-[#5C4A3E] text-[11px] font-bold uppercase tracking-widest mb-6 dark:border-white/10 dark:bg-[#211E1B] dark:text-[#B8ADA1]">
            <Lightbulb className="w-3.5 h-3.5 text-[#8C6D58]" />
            <span>Core Competencies</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-[#1A1412] tracking-tight mb-6 dark:text-[#F5F0E9]">
            Tailored Executive & <span className="font-light italic text-[#8C6D58] dark:text-[#B18B70]">Financial Solutions</span>
          </h1>
          <p className="text-[#5C4A3E] text-lg leading-relaxed dark:text-[#B8ADA1]">
            Strategic advisory and operational leadership grounded in 14+ years of institutional finance, healthcare management, and enterprise governance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {competencies.map((card, idx) => {
            const Icon = card.icon
            return (
              <div 
                key={idx}
                className="p-8 rounded-3xl bg-[#FDFBF7] border border-[#EADFCF] hover:border-[#8C6D58] transition-all hover:shadow-lg flex flex-col justify-between group dark:bg-[#191715] dark:border-white/10 hover:dark:border-[#B18B70]"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#F4EFE6] text-[#8C6D58] flex items-center justify-center group-hover:bg-[#1A1412] group-hover:text-[#FDFBF7] transition-colors dark:bg-[#211E1B] dark:text-[#B18B70] dark:group-hover:bg-[#B18B70] dark:group-hover:text-[#11100F]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-[#8C6D58]/60 font-mono dark:text-[#B18B70]/70">0{idx + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#1A1412] mb-3 group-hover:text-[#8C6D58] transition-colors dark:text-[#F5F0E9] dark:group-hover:text-[#B18B70]">
                    {card.title}
                  </h3>
                  <p className="text-[#5C4A3E] text-sm leading-relaxed dark:text-[#B8ADA1]">
                    {card.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="p-8 sm:p-12 rounded-3xl bg-[#1A1412] text-[#FDFBF7] flex flex-col sm:flex-row items-center justify-between gap-8 border border-[#382C27] shadow-xl dark:bg-[#191715] dark:border-white/10">
          <div className="max-w-2xl">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#D9C7B0] block mb-2 dark:text-[#B18B70]">
              Advisory Engagement
            </span>
            <h2 className="text-2xl sm:text-3xl font-light">
              Need strategic oversight for your financial restructuring?
            </h2>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-[#8C6D58] hover:bg-[#A3826C] text-[#FDFBF7] font-semibold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all whitespace-nowrap shadow-md dark:bg-[#B18B70] dark:hover:bg-[#C09A7F] dark:text-[#11100F]"
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