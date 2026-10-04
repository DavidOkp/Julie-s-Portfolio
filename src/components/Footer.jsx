import React from 'react'

const Footer = () => {
  return (
    <footer className="border-t border-[#EADFCF] bg-[#1A1412] text-[#FDFBF7] py-12 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-bold text-lg">Juliana Ede Onuh</p>
          <p className="text-xs text-[#C2B2A3]">Co-Founder, CFO/Admin Director at Deda Hospital Ltd</p>
        </div>
        <p className="text-xs text-[#8C6D58]">
          &copy; {new Date().getFullYear()} Juliana Ede Onuh. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer