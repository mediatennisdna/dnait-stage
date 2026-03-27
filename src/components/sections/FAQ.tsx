'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { brand } from '@/lib/brand'

interface FAQProps {
  data: {
    badge: string
    title: string
    subtitle: string
    items: { q: string; a: string }[]
  }
}

export default function FAQ({ data }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-24" style={{ backgroundColor: brand.bgAlt }} ref={ref}>
      <div className="max-w-3xl mx-auto px-6">
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
          <p className="text-lg" style={{ color: brand.textSecondary }}>{data.subtitle}</p>
        </motion.div>

        <div className="space-y-3">
          {data.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
              className="rounded-xl overflow-hidden"
              style={{ backgroundColor: brand.bg, border: `1px solid ${brand.border}`, boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
                className="w-full flex items-center justify-between px-6 py-5 text-left group focus:outline-none focus:ring-2 focus:ring-inset"
                style={{ outlineColor: brand.lime }}
              >
                <span id={`faq-q-${i}`} className="font-medium pr-4 transition-colors" style={{ color: brand.textSecondary }}>{item.q}</span>
                <motion.svg
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-5 h-5 flex-shrink-0"
                  style={{ color: brand.textMuted }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 9l6 6 6-6"/>
                </motion.svg>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      id={`faq-answer-${i}`}
                      role="region"
                      aria-labelledby={`faq-q-${i}`}
                      className="px-6 pb-5 text-sm leading-relaxed pt-4"
                      style={{ color: brand.textSecondary, borderTop: `1px solid ${brand.border}` }}
                    >
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
