import React from 'react'

const Contact = () => {
  return (
    <div className='py-12 px-6 bg-[#F5EFE6] min-h-[calc(100vh-80px)]'>
      <div className="max-w-7xl mx-auto ">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EADFCF]/80 border border-[#D9C7B0] text-[#5C4A3E] text-[11px] font-bold tracking-widest mb-6">
            <span>EXECUTIVE MANAGEMENT</span>
          </div>
          <h1 className=" text-4xl sm:text-6xl font-extrabold text-[#1A1412] tracking-tight mb-6">Schedule a Strategic <span className="font-light italic text-[#8C6D58] text-6xl">Consultation</span></h1>  
          <p className="text-[#5C4A3E] text-lg leading-relaxed">Reach out for executive board advisory, financial restructuring audits, healthcare management consulting, or mentorship opportunities.</p>
        </div>
        
      
        <div className="flex flex-row gap-12">

          <div className="w-[520px] h-[490px] p-8 sm:p-12 rounded-3xl bg-[#1A1412] text-[#FDFBF7] flex flex-col sm:flex-row items-center justify-between gap-8 border border-[#382C27] shadow-xl">
            <div className="max-w-2xl mt-6">
              <span className="text-[12px] font-bold uppercase tracking-widest text-[#D9C7B0] block mb-2">
                DIRECT OFFICE AND CORPORATE INFO
              </span>
              <h2 className="text-2xl sm:text-3xl mb-4 pt-4">Juliana Ede Onuh ⦁ FCCA</h2>

              <div className="flex flex-col mt-8 gap-5">
                <div>
                  <span className="text-[12px] font-bold uppercase tracking-widest text-[#D9C7B0] block mb-2">
                    EXECUTIVE OFFICE
                  </span>
                  <p className="text-[#F5EFE6] text-sm leading-relaxed">
                    Juliana Ede Onuh Executive Advisory
                  </p>
                </div>

                <div>
                  <span className="text-[12px] font-bold uppercase tracking-widest text-[#D9C7B0] block mb-2">
                    PRIMARY PRACTICE
                  </span>
                  <p className="text-[#F5EFE6] text-sm leading-relaxed">
                    Deda Hospital Ltd, Abuja, Nigeria
                  </p>
                </div>
              </div>
              <div className='border-t-[#D9C7B0] border-t-1 mt-18'></div>
              <div>
                <span className="text-[12px] font-bold uppercase tracking-widest text-[#D9C7B0] block mb-2 mt-10">
                  ADVISORY FOCUS AREAS
                </span>
                <p className="text-[#D9C7B0] text-sm leading-relaxed">
                  Financial Architecture • Risk Governance • SME Growth Scaling • Healthcare Executive Leadership 
                </p>
              </div>
            </div>
          </div>


          <div className="w-[650px] h-[560px] pt-0 p-10 rounded-3xl bg-[#fcf6eb] text-black flex flex-col  border border-[#382C27] shadow-xl">
            <div className="max-w-2xl flex gap-6 mt-12">
              <div className="max-w-2xl">
                <span className="text-[12px] font-bold uppercase tracking-widest text-[#634c3c] block mb-2">
                  FULL NAME *
                </span>
                <form className="w-68">
                  <input type="text" placeholder="e.g. Dr. Alex Morgan" className="w-full p-3 rounded-lg border border-[#D9C7B0] focus:outline-none focus:ring-2 focus:ring-[#8C6D58] bg-white" />
                </form>
              </div>

              <div className="max-w-2xl">
                <span className="text-[12px] font-bold uppercase tracking-widest text-[#634c3c] block mb-2">
                  EMAIL ADDRESS *
                </span>
                <form className="w-70">
                  <input type="text" placeholder="e.g. alex@company.com" className="w-full p-3 rounded-lg border border-[#D9C7B0] focus:outline-none focus:ring-2 focus:ring-[#8C6D58] bg-white" />
                </form>  
              </div>
            </div>

            <div className="max-w-2xl mt-8 pr-10">
              <span className="text-[12px] font-bold uppercase tracking-widest text-[#634c3c] block mb-2">
                INQUIRY TYPE
              </span>
              <form className="w-[578px]">
                <select className="w-full p-3 rounded-lg border border-[#D9C7B0] focus:outline-none focus:ring-2 focus:ring-[#8C6D58] bg-white">
                  <option>Strategic Financial Consultation</option>
                  <option></option>
                  <option></option>
                </select>
              </form>  
            </div>

            <div className="max-w-2xl mt-8 pr-10">
              <span className="text-[12px] font-bold uppercase tracking-widest text-[#634c3c] block mb-2">
                MESSAGE / BUSINESS CONTEXT *
              </span>
              <form className="w-[578px]">
                <textarea className="w-full h-[130px] p-4 text-sm rounded-lg border border-[#D9C7B0] focus:outline-none focus:ring-2 focus:ring-[#8C6D58] bg-white" rows="4" placeholder="Briefly describe your organization or the scope of consultation..."></textarea>
              </form>  
            </div>

            <div>
              <button className="w-[578px] text-sm mt-8 px-6 py-4 rounded-lg bg-black text-white font-bold hover:bg-[#634c3c] transition duration-300">SUBMIT CONSULTATION REQUEST</button>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Contact