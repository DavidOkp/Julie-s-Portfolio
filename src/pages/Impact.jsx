import { Target, HeartHandshake, ArrowRight, Lightbulb } from 'lucide-react';


const Impact = () => {
  return (
    <div className='py-12 px-6 bg-[#F4EFE6] min-h-[calc(100vh-80px)] dark:bg-[#11100F]'>
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EADFCF]/80 border border-[#D9C7B0] text-[#5C4A3E] text-[11px] font-bold tracking-widest mb-6 dark:border-white/10 dark:bg-[#211E1B] dark:text-[#B8ADA1]">
            <Lightbulb className='w-3.5 h-3.5'/>
            <span>SME EMPOWERMENT & ADVOCACY</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-[#1A1412] tracking-tight mb-6 dark:text-[#F5F0E9]">Championing Growth for <span className="font-light italic text-[#8C6D58] dark:text-[#B18B70]">Founders & Women</span></h1>
          <p className="text-[#5C4A3E] text-lg leading-relaxed dark:text-[#B8ADA1]">Dedicated to financial liberation for growing enterprises and fostering executive representation for female business leaders.</p>
        </div>
        
      
        <div className="flex flex-col sm:flex-row gap-8 ">
          <div className="sm:w-[600px] p-8 sm:p-12 rounded-3xl bg-[#fcf6eb] text-black flex flex-col sm:flex-row items-center justify-between gap-8 border border-[#382C27]/10 shadow-lg dark:bg-[#191715] dark:text-[#F5F0E9] dark:border-white/10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-2.5 rounded-2xl bg-black border text-[#D9C7B0] mb-6 dark:bg-[#211E1B] dark:border-white/10 dark:text-[#B18B70]">
                <Target className='w-7 h-7'/>
              </div>
              <span className="text-[12px] font-bold tracking-widest text-[#634c3c] block mb-2 dark:text-[#B18B70]">
                ENTERPRISE BUILDING
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">SME Finacial Liberation</h2>
              <p className="text-[#634c3c] text-md leading-relaxed dark:text-[#B8ADA1]">
                Startups often struggle not from lack of vision, but from inadequate capital structuring and weak internal controls. Through tailored advisory, I help business owners establish clear reporting frameworks, cash flow optimization, and scalable operating models.
              </p>
              <div className='border-t-[#D9C7B0] border-t-1 sm:mt-18 mt-16'></div>
              <div>
                <ul className="list-disc pl-5 text-black text-md leading-relaxed mt-10 font-bold dark:text-[#F5F0E9]">
                  <li>Internal Control & Cash Flow Audits</li>
                  <li>Capital Allocation Strategy</li>
                  <li>Stanford STP Scaling Methodologies</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="sm:w-[600px] p-8 sm:p-12 rounded-3xl bg-[#1A1412] text-[#FDFBF7] flex flex-col sm:flex-row items-center justify-between gap-8 border border-[#382C27]/10 shadow-inner dark:bg-[#211E1B] dark:border-white/10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-2.5 rounded-2xl bg-[#634c3c] text-[#D9C7B0] mb-6 dark:bg-[#2A2420] dark:text-[#B18B70]">
                <HeartHandshake className='w-7 h-7'/>
              </div>
              <span className="text-[12px] font-bold uppercase tracking-widest text-[#D9C7B0] block mb-2 dark:text-[#B18B70]">
                LEADERSHIP MENTORSHIP
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Women in Business Mentorship</h2>
              <p className="text-[#D9C7B0] text-md leading-relaxed dark:text-[#B8ADA1]">
                Providing dedicated mentorship for female founders and emerging women executives. Helping them navigate executive boardrooms, raise capital within confidence, and build long-term institutional resilience.
              </p>
              <div className='border-t-[#D9C7B0] border-t-1 sm:mt-18 mt-16'></div>
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

        <div>
            <div className="sm:ml-50 mt-14 sm:w-[750px] p-8 sm:p-12 rounded-3xl bg-[#fcf6eb] text-black flex flex-col items-center justify-between gap-8 border border-[#382C27]/10 shadow-inner dark:bg-[#191715] dark:text-[#F5F0E9] dark:border-white/10">
              <div className="flex flex-col max-w-2xl items-center ">
                <h2 className="text-lg font-bold mb-4">Partnership for Mentorship or Strategy</h2>
                <p className="text-[#634c3c] text-xs dark:text-[#B8ADA1]">Interested in booking a strategic SME session or exploring executive mentorship programs?</p>
                <button className="sm:mt-4 mt-6 px-6 py-2 rounded-full bg-black text-white font-bold hover:bg-[#634c3c] transition duration-300 flex dark:bg-[#B18B70] dark:text-[#11100F] dark:hover:bg-[#C09A7F]">GET IN TOUCH
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
