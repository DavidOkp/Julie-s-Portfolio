import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import About from './pages/About'
import Expertise from './pages/Expertise'
import Credentials from './pages/Credentials'
import Impact from './pages/Impact'
import Blog from './pages/Blog'
import Contact from './pages/Contact'

function App() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C221E] font-sans flex flex-col justify-between">
      <Navbar />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/about" element={<About />} />
          <Route path="/expertise" element={<Expertise />} />
          <Route path="/credentials" element={<Credentials />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App