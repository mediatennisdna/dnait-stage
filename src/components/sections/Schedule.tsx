'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const typeColors: Record<string, { bg: string; text: string; border: string }> = {
  arrival: { bg: 'rgba(107,114,128,0.1)', text: '#9CA3AF', border: 'rgba(107,114,128,0.2)' },
  training: { bg: 'rgba(187,255,103,0.08)', text: '#BBFF67', border: 'rgba(187,255,103,0.2)' },
  adventure: { bg: 'rgba(229,52,78,0.08)', text: '#E5344E', border: 'rgba(229,52,78,0.2)' },
  competition: { bg: 'rgba(212,168,83,0.08)', text: '#D4A853', border: 'rgba(212,168,83,0.2)' },
  departure: { bg: 'rgba(107,114,128,0.1)', text: '#9CA3AF', border: 'rgba(107,114,128,0.2)' },
}

interface ScheduleProps {
  data: {
    badge: string
    title: string
    subtitle: string
    days: {
      day: number
      date: string
      title: string
      location: string
      type: string
      highlights: string[]
    }[]
  }
}

export default function Schedule({ data }: ScheduleProps) {
  const [activeDay, setActiveDay] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const day = data.days[activeDay]
  const colors = typeColors[day.type] || typeColors.training

  return (
    <section className="py-24 bg-[#0a0f14]/50" ref={ref}>
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

        {/* Day selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          role="tablist"
          aria-label="Schedule days"
          className="flex justify-center gap-2 md:gap-3 mb-10 overflow-x-auto pb-2"
        >
          {data.days.map((d, i) => {
            const c = typeColors[d.type] || typeColors.training
            return (
              <button
                key={i}
                onClick={() => setActiveDay(i)}
                aria-label={`Day ${d.day}: ${d.title}`}
                aria-selected={activeDay === i}
                role="tab"
                className={`flex flex-col items-center px-3 md:px-5 py-4 rounded-xl transition-all duration-300 min-w-[56px] focus:outline-none focus:ring-2 focus:ring-[#BBFF67] ${
                  activeDay === i
                    ? 'bg-white/10 border border-white/20 scale-105'
                    : 'bg-white/3 border border-transparent hover:bg-white/5'
                }`}
              >
                <span className={`text-lg md:text-xl font-bold ${activeDay === i ? 'text-white' : 'text-[#9CA3AF]'}`} style={{ fontFamily: "'Space Grotesk', system-ui" }}>
                  {d.day}
                </span>
                <span className={`text-[9px] tracking-wider uppercase ${activeDay === i ? 'text-[#9CA3AF]' : 'text-[#6B7280]'}`}>
                  {d.date.split(' ')[0]}
                </span>
                <div className="w-2 h-2 rounded-full mt-1.5" style={{ backgroundColor: c.text, opacity: activeDay === i ? 1 : 0.3 }} />
              </button>
            )
          })}
        </motion.div>

        {/* Active day content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-[#0a0f14] border border-white/5 rounded-2xl overflow-hidden">
              {/* Activity image — add photos to /img/activities/day-1.jpg through day-8.jpg */}
              <div className="h-48 relative overflow-hidden">
                <img
                  src={`/img/activities/day-${day.day}.jpg`}
                  alt={day.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget.parentElement as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f14] to-transparent" />
              </div>
              <div className="p-8 md:p-10">
                <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl font-bold" style={{ fontFamily: "'Space Grotesk', system-ui", color: colors.text }}>
                      {day.day < 10 ? `0${day.day}` : day.day}
                    </span>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
                        {day.title}
                      </h3>
                      <p className="text-sm text-[#6B7280]">{day.date}</p>
                    </div>
                  </div>
                </div>
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ backgroundColor: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
                >
                  {day.location}
                </span>
              </div>

              <div className="space-y-3">
                {day.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                    </svg>
                    <span className="text-[#D1D5DB]">{h}</span>
                  </div>
                ))}
              </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
