'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { brand } from '@/lib/brand'

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
          <span
            className="inline-block text-[11px] font-bold tracking-[3px] uppercase px-5 py-2 rounded-full mb-6"
            style={{ backgroundColor: brand.limeLight, color: brand.lime, border: `1px solid ${brand.lime}26` }}
          >
            {data.badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
            {data.title}
          </h2>
          <div className="w-12 h-1 rounded mx-auto mb-6" style={{ background: `linear-gradient(to right, ${brand.lime}, ${brand.red})` }} />
          <p className="text-lg max-w-2xl mx-auto" style={{ color: brand.textSecondary }}>{data.subtitle}</p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {data.packs.map((pack, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="relative rounded-2xl p-8 transition-all duration-300"
              style={{
                background: pack.recommended ? `linear-gradient(to bottom, ${brand.bg}, ${brand.bgAlt})` : brand.surface,
                border: pack.recommended ? `2px solid ${brand.lime}` : `1px solid ${brand.border}`,
                transform: pack.recommended ? 'scale(1.05)' : 'scale(1)',
                boxShadow: pack.recommended ? `0 0 40px ${brand.limeLight}` : '0 4px 20px rgba(0,0,0,0.08)'
              }}
            >
              {pack.tag && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-widest px-4 py-1 rounded-full"
                  style={{ backgroundColor: brand.lime, color: brand.black }}
                >
                  {pack.tag}
                </div>
              )}

              <h3 className="text-xl font-bold mb-1" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
                {pack.name}
              </h3>
              <p className="text-sm mb-6" style={{ color: brand.textSecondary }}>{pack.description}</p>

              <div className="mb-6">
                <span className="text-2xl align-top" style={{ color: brand.textSecondary }}>{data.currency}</span>
                <span className="text-5xl font-bold" style={{ fontFamily: "'Space Grotesk', system-ui" }}>{pack.price}</span>
                <span className="text-sm ml-2" style={{ color: brand.textSecondary }}>/ {pack.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {pack.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm">
                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: brand.lime }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span style={{ color: brand.textSecondary }}>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={onCTA}
                aria-label={`${pack.cta} — ${pack.name}`}
                className="w-full py-3.5 rounded-xl font-bold text-sm transition-all focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: pack.recommended ? brand.lime : brand.bgAlt,
                  color: pack.recommended ? brand.black : brand.textPrimary,
                  border: pack.recommended ? 'none' : `1px solid ${brand.border}`
                }}
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
          <div className="rounded-2xl p-8" style={{ backgroundColor: brand.surface, border: `1px solid ${brand.border}` }}>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2" style={{ color: brand.gold, fontFamily: "'Space Grotesk', system-ui" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
              </svg>
              Extras
            </h3>
            <div className="space-y-4">
              {data.extras.map((extra, i) => (
                <div key={i} className="flex items-center justify-between gap-4">
                  <span className="text-sm" style={{ color: brand.textSecondary }}>{extra.name}</span>
                  <span className="font-bold text-sm whitespace-nowrap" style={{ color: brand.textPrimary }}>{data.currency}{extra.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Discounts */}
          <div className="rounded-2xl p-8" style={{ backgroundColor: brand.surface, border: `1px solid ${brand.border}` }}>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2" style={{ color: brand.lime, fontFamily: "'Space Grotesk', system-ui" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
              </svg>
              {market === 'es' ? 'Descuentos' : 'Discounts'}
            </h3>
            <div className="space-y-4">
              {data.discounts.map((d, i) => (
                <div key={i} className="flex items-center justify-between gap-4">
                  <span className="text-sm" style={{ color: brand.textSecondary }}>{d.name} — {d.condition}</span>
                  <span className="font-bold text-sm whitespace-nowrap" style={{ color: brand.lime }}>{d.percent}</span>
                </div>
              ))}
            </div>
            <p className="text-sm mt-4" style={{ color: brand.textSecondary }}>{data.discountNote}</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
