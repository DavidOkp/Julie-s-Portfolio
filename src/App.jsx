import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import PageLoader from './components/PageLoader'
import GlobalBackgroundLayout from './components/GlobalBackgroundLayout'

import About from './pages/About'
import Expertise from './pages/Expertise'
import Credentials from './pages/Credentials'
import Impact from './pages/Impact'
import Blog from './pages/Blog'
import Contact from './pages/Contact'

function App() {
  return (
    <div className="min-h-screen bg-[#1A1412] text-[#2C221E] font-sans flex flex-col justify-between dark:bg-[#0D0C0B] dark:text-[#F5F0E9]">
      <PageLoader />
      <ScrollToTop />
      
      {/* Upper Content Shell: Slides smoothly over the fixed reveal footer */}
      <div className="relative z-10 flex flex-col min-h-screen bg-[#FDFBF7] shadow-[0_20px_50px_rgba(26,20,18,0.2)] dark:bg-[#11100F] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            {/* About page - completely excluded from the global background overlay */}
            <Route path="/about" element={<About />} />
            <Route path="/" element={<About />} />

            {/* Shared layout for homepage and all other existing/future pages */}
            <Route element={<GlobalBackgroundLayout />}>
              <Route path="/expertise" element={<Expertise />} />
              <Route path="/credentials" element={<Credentials />} />
              <Route path="/impact" element={<Impact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
          </Routes>
        </main>
      </div>

      <Footer />
    </div>
  )
}

export default App
