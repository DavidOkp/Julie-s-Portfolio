import React from 'react'
import { Target, HeartHandshake, ArrowRight, Sparkles } from 'lucide-react';


const Impact = () => {
  return (
    <div className='py-12 px-6 bg-[#F4EFE6] min-h-[calc(100vh-80px)]'>
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EADFCF]/80 border border-[#D9C7B0] text-[#5C4A3E] text-[11px] font-bold tracking-widest mb-6">
            <Sparkles className='w-3.5 h-3.5'/>
            <span>SME EMPOWERMENT & ADVOCACY</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-[#1A1412] tracking-tight mb-6">Championing Growth for <span className="font-light italic text-[#8C6D58] text-6xl">Founders & Women</span></h1>  
          <p className="text-[#5C4A3E] text-lg leading-relaxed">Dedicated to financial liberation for growing enterprises and fostering executive representation for female business leaders.</p>
        </div>
        
      
        <div className="flex flex-row gap-8 ">
          <div className="w-[600px] p-8 sm:p-12 rounded-3xl bg-[#fcf6eb] text-black flex flex-col sm:flex-row items-center justify-between gap-8 border border-[#382C27]/10 shadow-lg">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-2.5 rounded-2xl bg-black border text-[#D9C7B0] mb-6">
                <Target className='w-7 h-7'/>
              </div>
              <span className="text-[12px] font-bold tracking-widest text-[#634c3c] block mb-2">
                ENTERPRISE BUILDING
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Women in Business Mentorship</h2>
              <p className="text-[#634c3c] text-md leading-relaxed">
                Providing dedicated mentorship for female founders and emerging women executives. Helping them navigate executive boardrooms, raise capital within confidence, and build long-term institutional resilience.
              </p>
              <div className='border-t-[#D9C7B0] border-t-1 mt-18'></div>
              <div>
                <ul className="list-disc pl-5 text-black text-md leading-relaxed mt-10 font-bold">
                  <li>Executive Leadership Mentorship</li>
                  <li>Financial Readiness for Female Founders</li>
                  <li>Governance & Boardroom Presence</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="w-[600px] p-8 sm:p-12 rounded-3xl bg-[#1A1412] text-[#FDFBF7] flex flex-col sm:flex-row items-center justify-between gap-8 border border-[#382C27]/10 shadow-inner">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-2.5 rounded-2xl bg-[#634c3c] text-[#D9C7B0] mb-6">
                <HeartHandshake className='w-7 h-7'/>
              </div>
              <span className="text-[12px] font-bold uppercase tracking-widest text-[#D9C7B0] block mb-2">
                LEADERSHIP MENTORSHIP
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Women in Business Mentorship</h2>
              <p className="text-[#D9C7B0] text-md leading-relaxed">
                Providing dedicated mentorship for female founders and emerging women executives. Helping them navigate executive boardrooms, raise capital within confidence, and build long-term institutional resilience.
              </p>
              <div className='border-t-[#D9C7B0] border-t-1 mt-18'></div>
              <div>
                <ul className="list-disc pl-5 text-[#D9C7B0] text-md leading-relaxed mt-10 font-bold">
                  <li>Executive Leadership Mentorship</li>
                  <li>Financial Readiness for Female Founders</li>
                  <li>Governance & Boardroom Presence</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div ClassName="">
            <div className="ml-50 mt-14 w-[750px] p-8 sm:p-12 rounded-3xl bg-[#fcf6eb] text-black flex flex-col items-center justify-between gap-8 border border-[#382C27]/10 shadow-inner">
              <div className="flex flex-col max-w-2xl items-center ">
                <h2 className="text-lg font-bold mb-4">Partnership for Mentorship or Strategy</h2>
                <p className="text-[#634c3c] text-xs ">Interested in booking a strategic SME session or exploring executive mentorship programs?</p>
                <button className="mt-4 px-6 py-2 rounded-full bg-black text-white font-bold hover:bg-[#634c3c] transition duration-300 flex">GET IN TOUCH
                  <ArrowRight className='pt-1 w-5 h-5 ml-2'/>
                </button>
              </div>
            </div>
          </div>

      </div>
    </div>
      
  )
}

export default Impact
