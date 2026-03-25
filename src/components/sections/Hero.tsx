'use client'

import { motion } from 'framer-motion'

interface HeroProps {
  data: {
    badge: string
    headline: string
    subtitle: string
    claim: string
    fullName: string
    cta: string
    ctaSecondary: string
    stats: { value: string; label: string }[]
  }
  market: string
  onCTA: () => void
  onSecondary: () => void
}

export default function Hero({ data, market, onCTA, onSecondary }: HeroProps) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-20 pb-16 px-6">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505] to-[#0a0f14]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse,rgba(187,255,103,0.06)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-[radial-gradient(ellipse,rgba(200,16,46,0.04)_0%,transparent_70%)]" />
        <div className="absolute top-1/3 left-0 w-[400px] h-[300px] bg-[radial-gradient(ellipse,rgba(212,168,83,0.03)_0%,transparent_70%)]" />
        {/* Tennis ball decoration */}
        <svg className="absolute top-20 right-[10%] w-64 h-64 opacity-[0.02] rotate-12" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="90" fill="none" stroke="#BBFF67" strokeWidth="3"/>
          <path d="M30 60 Q100 100 30 140" fill="none" stroke="#BBFF67" strokeWidth="3"/>
          <path d="M170 60 Q100 100 170 140" fill="none" stroke="#BBFF67" strokeWidth="3"/>
        </svg>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block bg-[rgba(187,255,103,0.08)] text-[#BBFF67] text-[11px] font-bold tracking-[3px] uppercase px-5 py-2 rounded-full border border-[rgba(187,255,103,0.15)] mb-8"
        >
          {data.badge}
        </motion.div>

        {/* Claim */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-[#D4A853] italic text-lg md:text-xl mb-4 tracking-wide"
          style={{ fontFamily: "'Space Grotesk', system-ui" }}
        >
          {data.claim}
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-4"
          style={{ fontFamily: "'Space Grotesk', system-ui" }}
        >
          {data.headline.split(' ').map((word, i) => (
            <span key={i}>
              {i === data.headline.split(' ').length - 1 ? (
                <span className="text-[#BBFF67]">{word}</span>
              ) : (
                <>{word} </>
              )}
            </span>
          ))}
        </motion.h1>

        {/* Full name */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-[#6B7280] text-xs tracking-[0.25em] uppercase mb-6"
        >
          {data.fullName}
        </motion.p>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-[#9CA3AF] text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {data.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={onCTA}
            className="inline-flex items-center gap-2 bg-[#BBFF67] text-[#050505] px-8 py-4 rounded-xl font-bold text-base hover:bg-[#9ae043] transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(187,255,103,0.25)]"
          >
            {data.cta}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
          <button
            onClick={onSecondary}
            className="inline-flex items-center gap-2 bg-transparent text-white px-8 py-4 rounded-xl font-bold text-base border border-white/15 hover:bg-white/5 transition-all"
          >
            {data.ctaSecondary}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex justify-center gap-12 md:gap-20"
        >
          {data.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#BBFF67]" style={{ fontFamily: "'Space Grotesk', system-ui" }}>{stat.value}</div>
              <div className="text-[10px] tracking-[0.25em] text-[#6B7280] mt-1 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
