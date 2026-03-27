'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface PricingProps {
  data: {
    badge: string
    title: string
    subtitle: string
    currency: string
    packs: {
      name: string
      tag: string
      description: string
      price: string
      period: string
      features: string[]
      cta: string
      recommended: boolean
    }[]
    extras: { name: string; price: string }[]
    discounts: { name: string; condition: string; percent: string }[]
    discountNote: string
  }
  market: string
  onCTA: () => void
}

export default function Pricing({ data, market, onCTA }: PricingProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-24" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
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

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {data.packs.map((pack, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                pack.recommended
                  ? 'bg-gradient-to-b from-[#0a0f14] to-[#050505] border-2 border-[#BBFF67]/30 md:scale-105 md:-my-2 shadow-[0_0_40px_rgba(187,255,103,0.08)]'
                  : 'bg-[#0a0f14] border border-white/5 hover:border-white/10'
              }`}
            >
              {pack.tag && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#BBFF67] text-[#050505] text-[10px] font-bold tracking-widest px-4 py-1 rounded-full">
                  {pack.tag}
                </div>
              )}

              <h3 className="text-xl font-bold mb-1" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
                {pack.name}
              </h3>
              <p className="text-[#9CA3AF] text-sm mb-6">{pack.description}</p>

              <div className="mb-6">
                <span className="text-[#9CA3AF] text-2xl align-top">{data.currency}</span>
                <span className="text-5xl font-bold" style={{ fontFamily: "'Space Grotesk', system-ui" }}>{pack.price}</span>
                <span className="text-[#9CA3AF] text-sm ml-2">/ {pack.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {pack.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm">
                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#BBFF67]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span className="text-[#D1D5DB]">{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={onCTA}
                aria-label={`${pack.cta} — ${pack.name}`}
                className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#BBFF67] focus:ring-offset-2 focus:ring-offset-[#050505] ${
                  pack.recommended
                    ? 'bg-[#BBFF67] text-[#050505] hover:bg-[#9ae043] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(187,255,103,0.25)]'
                    : 'bg-white/8 text-white border border-white/10 hover:bg-white/12'
                }`}
              >
                {pack.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Extras */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          {/* Extras */}
          <div className="bg-[#0a0f14] border border-white/5 rounded-2xl p-8">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-[#E8BF6A]" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
              </svg>
              Extras
            </h3>
            <div className="space-y-4">
              {data.extras.map((extra, i) => (
                <div key={i} className="flex items-center justify-between gap-4">
                  <span className="text-[#9CA3AF] text-sm">{extra.name}</span>
                  <span className="text-white font-bold text-sm whitespace-nowrap">{data.currency}{extra.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Discounts */}
          <div className="bg-[#0a0f14] border border-white/5 rounded-2xl p-8">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-[#BBFF67]" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
              </svg>
              {market === 'es' ? 'Descuentos' : 'Discounts'}
            </h3>
            <div className="space-y-4">
              {data.discounts.map((d, i) => (
                <div key={i} className="flex items-center justify-between gap-4">
                  <span className="text-[#9CA3AF] text-sm">{d.name} — {d.condition}</span>
                  <span className="text-[#BBFF67] font-bold text-sm whitespace-nowrap">{d.percent}</span>
                </div>
              ))}
            </div>
            <p className="text-[#9CA3AF] text-sm mt-4">{data.discountNote}</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
