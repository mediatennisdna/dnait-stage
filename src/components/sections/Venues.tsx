'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface VenuesProps {
  data: {
    badge: string
    title: string
    subtitle: string
    locations: {
      name: string
      city: string
      description: string
      features: string[]
    }[]
  }
}

export default function Venues({ data }: VenuesProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-24" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-[rgba(187,255,103,0.08)] text-[#BBFF67] text-[11px] font-bold tracking-[3px] uppercase px-5 py-2 rounded-full border border-[rgba(187,255,103,0.15)] mb-6">
            {data.badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
            {data.title}
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-[#BBFF67] to-[#C8102E] rounded mx-auto mb-6" />
          <p className="text-[#9CA3AF] text-lg max-w-2xl mx-auto">{data.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.locations.map((loc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className="bg-[#0a0f14] border border-white/5 rounded-2xl overflow-hidden group hover:border-white/10 transition-all"
            >
              {/* Venue image header */}
              <div className="h-48 relative overflow-hidden">
                <img
                  src={`/img/venues/${i === 0 ? 'escorial' : 'gtennis'}.jpg`}
                  alt={loc.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f14] via-[#0a0f14]/60 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center relative z-10">
                    <svg className="w-10 h-10 mx-auto mb-2 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    <span className="text-[#D4A853] font-bold text-xl" style={{ fontFamily: "'Space Grotesk', system-ui" }}>{loc.city}</span>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-1 text-xs text-white/80">
                  {i === 0 ? 'Days 1-5' : 'Days 6-8'}
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Space Grotesk', system-ui" }}>{loc.name}</h3>
                <p className="text-[#9CA3AF] text-sm mb-6 leading-relaxed">{loc.description}</p>
                <div className="grid grid-cols-2 gap-3">
                  {loc.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm">
                      <svg className="w-4 h-4 text-[#BBFF67] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      <span className="text-[#D1D5DB]">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
