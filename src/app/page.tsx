'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function MarketSelector() {
  const router = useRouter()
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const handleSelect = (market: string) => {
    router.push(`/${market}`)
  }

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(187,255,103,0.03)_0%,transparent_60%)]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(200,16,46,0.05)_0%,transparent_70%)]" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[radial-gradient(circle,rgba(212,168,83,0.04)_0%,transparent_70%)]" />
        {/* Tennis ball pattern */}
        <svg className="absolute top-10 right-10 w-32 h-32 opacity-[0.03]" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#BBFF67" strokeWidth="2"/>
          <path d="M20 30 Q50 50 20 70" fill="none" stroke="#BBFF67" strokeWidth="2"/>
          <path d="M80 30 Q50 50 80 70" fill="none" stroke="#BBFF67" strokeWidth="2"/>
        </svg>
        <svg className="absolute bottom-10 left-10 w-24 h-24 opacity-[0.03]" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#BBFF67" strokeWidth="2"/>
          <path d="M20 30 Q50 50 20 70" fill="none" stroke="#BBFF67" strokeWidth="2"/>
          <path d="M80 30 Q50 50 80 70" fill="none" stroke="#BBFF67" strokeWidth="2"/>
        </svg>
      </div>

      {/* Logo */}
      <motion.div
        className="text-center mb-12 relative z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="8" fill="#050505" stroke="#BBFF67" strokeWidth="1.5"/>
            <circle cx="20" cy="20" r="12" fill="none" stroke="#BBFF67" strokeWidth="1.5"/>
            <path d="M10 15c5 2.5 10 2.5 15 0" fill="none" stroke="#BBFF67" strokeWidth="1.2"/>
            <path d="M10 25c5-2.5 10-2.5 15 0" fill="none" stroke="#BBFF67" strokeWidth="1.2"/>
          </svg>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
            DNAIT <span className="text-[#BBFF67]">STAGE</span>
          </h1>
        </div>
        <p className="text-[#9CA3AF] text-sm tracking-[0.2em] uppercase">International Tennis Experience</p>
        <p className="text-[#D4A853] italic mt-2 text-lg" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
          Train. Compete. Experience.
        </p>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        className="text-[#9CA3AF] text-center mb-10 text-lg max-w-lg px-6 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Select your region to see pricing and details tailored for you
      </motion.p>

      {/* Market Cards */}
      <motion.div
        className="flex flex-col md:flex-row gap-6 md:gap-8 px-6 max-w-4xl w-full relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        {/* Spain Card */}
        <motion.button
          onClick={() => handleSelect('es')}
          onMouseEnter={() => setHoveredCard('es')}
          onMouseLeave={() => setHoveredCard(null)}
          className="flex-1 group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0a0f14] to-[#050505] p-8 md:p-10 text-left transition-all duration-500 cursor-pointer hover:border-[#C8102E]/40"
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Red gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#C8102E]/0 to-[#C8102E]/0 group-hover:from-[#C8102E]/10 group-hover:to-[#C8102E]/5 transition-all duration-500" />

          {/* Flag accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#C8102E] via-[#D4A853] to-[#C8102E] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10">
            {/* Spain flag SVG */}
            <div className="w-16 h-12 rounded-md overflow-hidden mb-6 border border-white/10">
              <div className="h-3 bg-[#C8102E]" />
              <div className="h-6 bg-[#D4A853]" />
              <div className="h-3 bg-[#C8102E]" />
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
              SOY DE <span className="text-[#C8102E]">ESPAÑA</span>
            </h2>
            <p className="text-[#9CA3AF] mb-6 leading-relaxed">
              Precios en euros. Información sobre intercambio deportivo internacional y experiencia cultural con jugadores americanos.
            </p>

            <div className="flex items-center gap-2 text-[#BBFF67] font-semibold text-sm">
              <span>Ver en español</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </motion.button>

        {/* Divider */}
        <div className="hidden md:flex items-center">
          <div className="w-px h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        </div>

        {/* USA Card */}
        <motion.button
          onClick={() => handleSelect('en')}
          onMouseEnter={() => setHoveredCard('en')}
          onMouseLeave={() => setHoveredCard(null)}
          className="flex-1 group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0a0f14] to-[#050505] p-8 md:p-10 text-left transition-all duration-500 cursor-pointer hover:border-[#BBFF67]/40"
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Green gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#BBFF67]/0 to-[#BBFF67]/0 group-hover:from-[#BBFF67]/8 group-hover:to-[#BBFF67]/3 transition-all duration-500" />

          {/* Flag accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#002868] via-[#C8102E] to-[#002868] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10">
            {/* USA flag SVG */}
            <div className="w-16 h-12 rounded-md overflow-hidden mb-6 border border-white/10 relative bg-white">
              <div className="absolute inset-0">
                <div className="h-[9.2%] bg-[#B22234]" />
                <div className="h-[9.2%] bg-white" />
                <div className="h-[9.2%] bg-[#B22234]" />
                <div className="h-[9.2%] bg-white" />
                <div className="h-[9.2%] bg-[#B22234]" />
                <div className="h-[9.2%] bg-white" />
                <div className="h-[9.2%] bg-[#B22234]" />
                <div className="h-[9.2%] bg-white" />
                <div className="h-[9.2%] bg-[#B22234]" />
                <div className="h-[9.2%] bg-white" />
                <div className="h-[9.2%] bg-[#B22234]" />
              </div>
              <div className="absolute top-0 left-0 w-[40%] h-[54%] bg-[#002868]" />
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
              I'M FROM THE <span className="text-[#BBFF67]">USA</span>
            </h2>
            <p className="text-[#9CA3AF] mb-6 leading-relaxed">
              Prices in USD. Information about elite training in Spain, cultural immersion, and the ultimate international tennis experience.
            </p>

            <div className="flex items-center gap-2 text-[#BBFF67] font-semibold text-sm">
              <span>View in English</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </motion.button>
      </motion.div>

      {/* Stats Bar */}
      <motion.div
        className="flex flex-wrap justify-center gap-8 md:gap-12 mt-12 px-6 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        {[
          { value: '50', label: 'SPOTS' },
          { value: '7', label: 'DAYS' },
          { value: 'JUL 2026', label: 'DATE' },
          { value: 'MAD + VLC', label: 'CITIES' },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-[#BBFF67]" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>{stat.value}</div>
            <div className="text-[10px] tracking-[0.2em] text-[#6B7280] mt-1">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Bottom line */}
      <motion.div
        className="absolute bottom-6 text-center text-[#4B5563] text-xs tracking-wider"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        Tennis DNA (USA) × AIT Tenis (Spain)
      </motion.div>
    </div>
  )
}
