'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { brand } from '@/lib/brand'

const icons: Record<string, ReactNode> = {
  tennis: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="M4.93 4.93c4.08 2.1 8.06 2.1 12.14 0" /><path d="M4.93 19.07c4.08-2.1 8.06-2.1 12.14 0" />
    </svg>
  ),
  flag: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" />
    </svg>
  ),
  building: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01" />
    </svg>
  ),
  globe: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
}

interface AboutProps {
  data: {
    badge: string
    title: string
    description: string
    secondary: string
    features: { icon: string; title: string; text: string }[]
    marketingAngle: string
  }
  market: string
}

export default function About({ data, market }: AboutProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none" style={{ background: `linear-gradient(to left, ${brand.lime}08, transparent)` }} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Main content with image */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span
              className="inline-block text-[11px] font-bold tracking-[3px] uppercase px-5 py-2 rounded-full mb-6"
              style={{ backgroundColor: brand.limeLight, color: brand.lime, border: `1px solid ${brand.lime}26` }}
            >
              {data.badge}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
              {data.title}
            </h2>
            <div className="w-12 h-1 rounded mb-6" style={{ background: `linear-gradient(to right, ${brand.lime}, ${brand.red})` }} />
            <p className="text-lg leading-relaxed mb-8" style={{ color: brand.textSecondary }}>{data.description}</p>

            {/* Marketing angle */}
            <div className="pl-6 py-2 mb-8" style={{ borderLeft: `3px solid ${brand.red}` }}>
              <p className="text-xl font-medium italic" style={{ color: brand.textPrimary }}>&ldquo;{data.marketingAngle}&rdquo;</p>
            </div>

            {/* Partner logos */}
            <div className="flex items-center gap-8">
              <div className="flex flex-col items-center">
                <img src="/img/logos/tennis-dna.png" alt="Tennis DNA" className="h-14 w-auto mb-2" />
                <span className="text-[10px] tracking-wider uppercase" style={{ color: brand.textMuted }}>USA</span>
              </div>
              <div className="flex flex-col items-center px-6">
                <span className="text-2xl font-bold" style={{ color: brand.lime }}>+</span>
              </div>
              <div className="flex flex-col items-center">
                <img src="/img/logos/logo-ai-tennis.jpeg" alt="AIT Tenis" className="h-14 w-auto mb-2" />
                <span className="text-[10px] tracking-wider uppercase" style={{ color: brand.textMuted }}>España</span>
              </div>
            </div>
          </motion.div>

          {/* Image collage */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                  <img
                    src="/img/activities/day-2.jpg"
                    alt="Tennis training"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img
                    src="/img/venues/escorial.jpg"
                    alt="El Escorial"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img
                    src="/img/activities/day-4.jpg"
                    alt="Adventure activities"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                  <img
                    src="/img/activities/Playa-de-las-Arenas-Valencia.jpg"
                    alt="Valencia beach"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 rounded-2xl p-4 shadow-xl" style={{ backgroundColor: brand.bg, border: `1px solid ${brand.border}` }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: brand.lime }}>
                  <span className="text-xl font-bold" style={{ color: brand.black, fontFamily: "'Space Grotesk', system-ui" }}>8</span>
                </div>
                <div>
                  <p className="font-bold" style={{ color: brand.textPrimary }}>{market === 'es' ? 'Días' : 'Days'}</p>
                  <p className="text-xs" style={{ color: brand.textMuted }}>{market === 'es' ? 'de experiencia' : 'of experience'}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-center text-sm font-bold uppercase tracking-widest mb-8" style={{ color: brand.textMuted }}>
            {market === 'es' ? '¿Qué incluye?' : "What's included?"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                className="group rounded-2xl p-6 transition-all duration-300"
                style={{ backgroundColor: brand.surface, border: `1px solid ${brand.border}` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all"
                  style={{ backgroundColor: brand.limeLight, color: brand.lime }}
                >
                  {icons[feature.icon]}
                </div>
                <h4 className="text-base font-bold mb-2" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
                  {feature.title}
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: brand.textSecondary }}>{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
