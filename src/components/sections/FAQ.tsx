'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

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
    <section className="py-24 bg-[#0a0f14]/50" ref={ref}>
      <div className="max-w-3xl mx-auto px-6">
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
          <p className="text-[#9CA3AF] text-lg">{data.subtitle}</p>
        </motion.div>

        <div className="space-y-3">
          {data.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
              className="bg-[#050505] border border-white/5 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
                className="w-full flex items-center justify-between px-6 py-5 text-left group focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#BBFF67]"
              >
                <span id={`faq-q-${i}`} className="font-medium text-[#E5E7EB] group-hover:text-white transition-colors pr-4">{item.q}</span>
                <motion.svg
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-5 h-5 text-[#9CA3AF] flex-shrink-0"
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
                    <div id={`faq-answer-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className="px-6 pb-5 text-[#9CA3AF] text-sm leading-relaxed border-t border-white/5 pt-4">
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
