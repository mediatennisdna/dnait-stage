'use client'

import { motion } from 'framer-motion'
import { brand } from '@/lib/brand'

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
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/img/hero-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay - equilibrio entre ver el video y legibilidad */}
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${brand.black}80 0%, ${brand.black}40 30%, ${brand.black}60 70%, ${brand.black}E6 100%)` }} />
        {/* Colored radial accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px]" style={{ background: `radial-gradient(ellipse, ${brand.lime}1A 0%, transparent 70%)` }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px]" style={{ background: `radial-gradient(ellipse, ${brand.red}14 0%, transparent 70%)` }} />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block text-[11px] font-bold tracking-[3px] uppercase px-5 py-2 rounded-full mb-8"
          style={{ backgroundColor: `${brand.lime}26`, color: brand.lime, border: `1px solid ${brand.lime}40` }}
        >
          {data.badge}
        </motion.div>

        {/* Claim */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="italic text-lg md:text-xl mb-4 tracking-wide"
          style={{ color: brand.gold, fontFamily: "'Space Grotesk', system-ui" }}
        >
          {data.claim}
        </motion.p>

        {/* Headline - texto blanco para máximo contraste */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-4"
          style={{ fontFamily: "'Space Grotesk', system-ui", color: brand.white }}
        >
          {data.headline.split(' ').map((word, i) => (
            <span key={i}>
              {i === data.headline.split(' ').length - 1 ? (
                <span style={{ color: brand.lime }}>{word}</span>
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
          className="text-xs tracking-[0.25em] uppercase mb-6"
          style={{ color: `${brand.white}99` }}
        >
          {data.fullName}
        </motion.p>

        {/* Subtitle - texto claro con buena opacidad */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: `${brand.white}CC` }}
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
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base transition-all hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{
              backgroundColor: brand.lime,
              color: brand.black,
              boxShadow: `0 12px 40px ${brand.lime}40`
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = brand.limeHover}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = brand.lime}
          >
            {data.cta}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <button
            onClick={onSecondary}
            className="inline-flex items-center gap-2 bg-transparent px-8 py-4 rounded-xl font-bold text-base transition-all focus:outline-none focus:ring-2 hover:bg-white/10"
            style={{ border: `2px solid ${brand.white}66`, color: brand.white }}
          >
            {data.ctaSecondary}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex justify-center gap-8 md:gap-16 mb-12"
        >
          {data.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold" style={{ color: brand.lime, fontFamily: "'Space Grotesk', system-ui" }}>{stat.value}</div>
              <div className="text-[10px] tracking-[0.25em] mt-1 font-medium" style={{ color: `${brand.white}80` }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Partner logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="flex items-center justify-center"
        >
          <div className="flex items-center gap-8 md:gap-12 backdrop-blur-md rounded-3xl px-10 md:px-16 py-8" style={{ backgroundColor: `${brand.white}14`, border: `1px solid ${brand.white}26` }}>
            <img
              src="/img/logos/tennis-dna.png"
              alt="Tennis DNA"
              className="h-16 md:h-24 w-auto rounded-xl"
            />
            <div className="flex flex-col items-center px-3 md:px-5">
              <span className="text-3xl font-bold" style={{ color: brand.lime }}>×</span>
              <span className="text-[9px] md:text-[11px] tracking-widest uppercase font-medium" style={{ color: `${brand.white}80` }}>Partnership</span>
            </div>
            <img
              src="/img/logos/logo-ai-tennis.jpeg"
              alt="AIT Tenis"
              className="h-16 md:h-24 w-auto rounded-xl"
            />
          </div>
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
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={`${brand.white}66`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
