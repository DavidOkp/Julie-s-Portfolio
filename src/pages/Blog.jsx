import React from 'react'
import { Sparkles, ArrowRight, Calendar, Clock, BookOpen } from 'lucide-react'

const blogPosts = [
  {
    id: 1,
    title: 'Navigating Financial Restructuring in Healthcare Enterprises',
    excerpt: 'How healthcare organizations can optimize capital efficiency, manage cash flows, and build sustainable fiscal resilience during economic shifts.',
    category: 'Financial Strategy',
    date: 'Oct 02, 2026',
    readTime: '6 min read',
    featured: true,
  },
  {
    id: 2,
    title: 'Bridging ACCA Audit Rigor with Stanford Growth Frameworks',
    excerpt: 'Combining traditional accounting governance with modern startup scaling models to unlock institutional stability.',
    category: 'Governance & Scaling',
    date: 'Sep 18, 2026',
    readTime: '8 min read',
    featured: false,
  },
  {
    id: 3,
    title: 'Empowering Female Founders: The Path to Capital Readiness',
    excerpt: 'Key financial metrics and governance practices female executives need to master before seeking venture and institutional backing.',
    category: 'SME & Advocacy',
    date: 'Aug 29, 2026',
    readTime: '5 min read',
    featured: false,
  },
]

const Blog = () => {
  return (
    <div className="py-16 px-6 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto">
        
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EADFCF]/50 border border-[#D9C7B0] text-[#5C4A3E] text-[11px] font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#8C6D58]" />
            <span>Thought Leadership & Insights</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-[#1A1412] tracking-tight mb-6">
            Executive Perspectives on <span className="font-light italic text-[#8C6D58]">Finance & Growth</span>
          </h1>
          <p className="text-[#5C4A3E] text-lg leading-relaxed">
            Articles, strategy notes, and commentary on healthcare finance, enterprise governance, and business scaling.
          </p>
        </div>

        {blogPosts.filter(p => p.featured).map((post) => (
          <div key={post.id} className="mb-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#2C221E] via-[#1A1412] to-[#0D0A09] text-[#FDFBF7] shadow-2xl border border-[#3A2D27]">
            <div className="flex items-center gap-4 text-xs text-[#D9C7B0] font-bold uppercase tracking-widest mb-4">
              <span className="px-3 py-1 rounded-full bg-[#382C27] border border-[#4A3B34]">{post.category}</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold mb-4 leading-tight">{post.title}</h2>
            <p className="text-[#C2B2A3] text-sm sm:text-base leading-relaxed mb-8 max-w-3xl">{post.excerpt}</p>
            <button className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D9C7B0] hover:text-[#FDFBF7] transition-colors">
              <span>Read Full Article</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.filter(p => !p.featured).map((post) => (
            <div key={post.id} className="p-8 rounded-2xl bg-[#F4EFE6] border border-[#EADFCF] hover:border-[#8C6D58] transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-[#8C6D58] font-bold uppercase tracking-widest mb-3">
                  <span>{post.category}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-[#1A1412] mb-3 leading-snug">{post.title}</h3>
                <p className="text-[#5C4A3E] text-sm leading-relaxed mb-6">{post.excerpt}</p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-[#EADFCF]">
                <span className="text-xs text-[#8C6D58] font-medium">{post.date}</span>
                <button className="inline-flex items-center gap-1 text-xs font-bold text-[#1A1412] hover:text-[#8C6D58] uppercase tracking-wider">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Blog