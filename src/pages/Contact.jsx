import { Mail, MapPin, Send, Lightbulb } from 'lucide-react'
import { socialLinks } from '../data/social.data'
import { SocialIcon } from '../components/SocialIcon'
const Contact = () => {
  return (
    <div className='py-12 px-6 bg-[#F5EFE6] min-h-[calc(100vh-80px)] dark:bg-[#11100F]'>
      <div className="max-w-7xl mx-auto ">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EADFCF]/80 border border-[#D9C7B0] text-[#5C4A3E] text-[11px] font-bold tracking-widest mb-6 dark:border-white/10 dark:bg-[#211E1B] dark:text-[#B8ADA1]">
            <Lightbulb className='w-3.5 h-3.5' />
            <span>EXECUTIVE MANAGEMENT</span>
          </div>
          <h1 className=" text-4xl sm:text-6xl font-extrabold text-[#1A1412] tracking-tight mb-6 dark:text-[#F5F0E9]">Schedule a Strategic <span className="font-light italic text-[#8C6D58] sm:text-6xl dark:text-[#B18B70]">Consultation</span></h1>
          <p className="text-[#5C4A3E] text-lg leading-relaxed dark:text-[#B8ADA1]">Reach out for executive board advisory, financial restructuring audits, healthcare management consulting, or mentorship opportunities.</p>
        </div>


        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-[520px] min-h-[510px] p-8 sm:p-12 rounded-3xl bg-[#1A1412] text-[#FDFBF7] flex flex-col justify-between border border-[#382C27] shadow-xl dark:bg-[#191715] dark:border-white/10">
            <div className="max-w-2xl mt-2">
              <span className="text-[12px] font-bold uppercase tracking-widest text-[#D9C7B0] block mb-2">
                DIRECT OFFICE AND CORPORATE INFO
              </span>
              <h2 className="text-2xl sm:text-3xl mb-4 pt-2">Juliana Onuh ⦁ FCCA</h2>

              <div className="flex flex-col mt-8 gap-8">
                <div className="flex flex-row gap-4 items-center">
                  <div className="inline-flex items-center gap-2 px-3.5 py-3.5 rounded-2xl bg-[#332922] text-[#D9C7B0]">
                    <Mail className='w-5 h-5' />
                  </div>
                  <div>
                    <span className="text-[12px] font-bold uppercase tracking-widest text-[#D9C7B0] block mb-1">
                      EXECUTIVE OFFICE
                    </span>
                    <p className="text-[#F5EFE6] text-sm leading-relaxed">
                      Juliana Onuh Executive Advisory
                    </p>
                  </div>
                </div>

                <div className="flex flex-row gap-4 items-center">
                  <div className="inline-flex items-center gap-2 px-3.5 py-3.5 rounded-2xl bg-[#332922] text-[#D9C7B0]">
                    <MapPin className='w-5 h-5' />
                  </div>
                  <div>
                    <span className="text-[12px] font-bold uppercase tracking-widest text-[#D9C7B0] block mb-1">
                      PRIMARY PRACTICE
                    </span>
                    <p className="text-[#F5EFE6] text-sm leading-relaxed">
                      Deda Hospital Ltd, Abuja, Nigeria
                    </p>
                  </div>
                </div>
              </div>

              <div className='border-t-[#382C27] border-t my-8'></div>
              <div>
                <span className="text-[12px] font-bold uppercase tracking-widest text-[#D9C7B0] block mb-2">
                  ADVISORY FOCUS AREAS
                </span>
                <p className="text-[#D9C7B0] text-sm leading-relaxed">
                  Financial Architecture • Risk Governance • SME Growth Scaling • Healthcare Executive Leadership
                </p>
              </div>

              <div className='border-t-[#382C27] border-t my-8'></div>
              <div>
                <span className="text-[12px] font-bold uppercase tracking-widest text-[#D9C7B0] block mb-3">
                  CONNECT ON SOCIAL MEDIA
                </span>
                <div className="flex items-center gap-2.5 flex-wrap">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit Juliana on ${social.name}`}
                      title={social.name}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2C221E] border border-[#4A3B32] text-[#D9C7B0] transition-all hover:bg-[#8C6D58] hover:text-[#FDFBF7] hover:border-[#D9C7B0] hover:-translate-y-0.5"
                    >
                      <SocialIcon name={social.icon} className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>


          <div className="sm:w-[650px] sm:h-[560px] pt-0 p-10 rounded-3xl bg-[#fcf6eb] text-black flex flex-col border border-[#382C27]/10 shadow-lg dark:bg-[#191715] dark:text-[#F5F0E9] dark:border-white/10">
            <div className="max-w-2xl flex sm:flex-row flex-col gap-6 mt-12">
              <div className="max-w-2xl">
                <span className="text-[12px] font-bold uppercase tracking-widest text-[#634c3c] block mb-2 dark:text-[#B18B70]">
                  FULL NAME *
                </span>
                <form className="sm:w-68 ">
                  <input type="text" placeholder="e.g. Dr. Alex Morgan" className="w-full p-3 rounded-2xl border border-[#D9C7B0] focus:outline-none focus:ring-2 focus:ring-[#8C6D58] bg-white dark:border-white/10 dark:bg-[#211E1B] dark:text-[#F5F0E9] dark:placeholder:text-[#8F8479] dark:focus:ring-[#B18B70]" />
                </form>
              </div>

              <div className="max-w-2xl">
                <span className="text-[12px] font-bold uppercase tracking-widest text-[#634c3c] block mb-2 dark:text-[#B18B70]">
                  EMAIL ADDRESS *
                </span>
                <form className="sm:w-70">
                  <input type="text" placeholder="e.g. alex@company.com" className="w-full p-3 rounded-2xl border border-[#D9C7B0] focus:outline-none focus:ring-2 focus:ring-[#8C6D58] bg-white dark:border-white/10 dark:bg-[#211E1B] dark:text-[#F5F0E9] dark:placeholder:text-[#8F8479] dark:focus:ring-[#B18B70]" />
                </form>
              </div>
            </div>

            <div className="max-w-2xl mt-8 pr-10">
              <span className="text-[12px] font-bold uppercase tracking-widest text-[#634c3c] block mb-2 dark:text-[#B18B70]">
                INQUIRY TYPE
              </span>
              <form className="sm:w-[578px] w-66">
                <select className="py-4 w-full p-3 rounded-2xl border border-[#D9C7B0] focus:outline-none focus:ring-2 focus:ring-[#8C6D58] bg-white dark:border-white/10 dark:bg-[#211E1B] dark:text-[#F5F0E9] dark:focus:ring-[#B18B70]">
                  <option>Strategic Financial Consultation</option>
                  <option></option>
                  <option></option>
                </select>
              </form>
            </div>

            <div className="max-w-2xl mt-8 pr-10">
              <span className="text-[12px] font-bold uppercase tracking-widest text-[#634c3c] block mb-2 dark:text-[#B18B70]">
                MESSAGE / BUSINESS CONTEXT *
              </span>
              <form className="sm:w-[578px] w-66">
                <textarea className="w-full sm:h-[130px] h-[147px] p-4 text-sm rounded-lg border border-[#D9C7B0] focus:outline-none focus:ring-2 focus:ring-[#8C6D58] bg-white dark:border-white/10 dark:bg-[#211E1B] dark:text-[#F5F0E9] dark:placeholder:text-[#8F8479] dark:focus:ring-[#B18B70]" rows="4" placeholder="Briefly describe your organization or the scope of consultation..."></textarea>
              </form>
            </div>

            <div>
              <button className="sm:w-[578px] text-sm mt-8 px-6 sm:py-4 py-3 rounded-lg bg-black text-white font-bold hover:bg-[#634c3c] transition duration-300 flex justify-center items-center dark:bg-[#B18B70] dark:text-[#11100F] dark:hover:bg-[#C09A7F]">
                SUBMIT CONSULTATION REQUEST
                <Send className='w-4 h-4 ml-2' />
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Contact