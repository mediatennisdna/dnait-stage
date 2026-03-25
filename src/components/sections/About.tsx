'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

const icons: Record<string, ReactNode> = {
  tennis: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M4.93 4.93c4.08 2.1 8.06 2.1 12.14 0"/><path d="M4.93 19.07c4.08-2.1 8.06-2.1 12.14 0"/>
    </svg>
  ),
  flag: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
    </svg>
  ),
  building: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01"/>
    </svg>
  ),
  globe: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
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
    <section className="py-24 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-16"
        >
          <span className="inline-block bg-[rgba(187,255,103,0.08)] text-[#BBFF67] text-[11px] font-bold tracking-[3px] uppercase px-5 py-2 rounded-full border border-[rgba(187,255,103,0.15)] mb-6">
            {data.badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
            {data.title}
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-[#BBFF67] to-[#C8102E] rounded mb-6" />
          <p className="text-[#9CA3AF] text-lg leading-relaxed mb-4">{data.description}</p>
          <p className="text-[#D4A853] italic">{data.secondary}</p>
        </motion.div>

        {/* Marketing angle */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border-l-3 border-[#C8102E] pl-6 mb-16 py-2"
          style={{ borderLeftWidth: '3px', borderLeftColor: '#C8102E' }}
        >
          <p className="text-white text-xl font-medium italic">&ldquo;{data.marketingAngle}&rdquo;</p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="group bg-[#0a0f14] border border-white/5 rounded-2xl p-8 hover:border-[#BBFF67]/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[rgba(187,255,103,0.08)] flex items-center justify-center text-[#BBFF67] mb-5 group-hover:bg-[rgba(187,255,103,0.15)] transition-all">
                {icons[feature.icon]}
              </div>
              <h3 className="text-lg font-bold mb-3" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
                {feature.title}
              </h3>
              <p className="text-[#9CA3AF] text-sm leading-relaxed">{feature.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
