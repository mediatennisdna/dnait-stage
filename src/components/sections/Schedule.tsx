'use client'

import { useState, useRef, type ReactNode } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { brand, typeColors } from '@/lib/brand'

const typeConfig: Record<string, { color: string; bg: string; icon: ReactNode; label: { es: string; en: string } }> = {
  arrival: {
    color: typeColors.arrival.color,
    bg: typeColors.arrival.bg,
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v4M12 18v4"/></svg>,
    label: { es: 'Llegada', en: 'Arrival' }
  },
  training: {
    color: typeColors.training.color,
    bg: typeColors.training.bg,
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M4.93 4.93c4.08 2.1 8.06 2.1 12.14 0"/><path d="M4.93 19.07c4.08-2.1 8.06-2.1 12.14 0"/></svg>,
    label: { es: 'Entreno', en: 'Training' }
  },
  adventure: {
    color: typeColors.adventure.color,
    bg: typeColors.adventure.bg,
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    label: { es: 'Aventura', en: 'Adventure' }
  },
  competition: {
    color: typeColors.competition.color,
    bg: typeColors.competition.bg,
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>,
    label: { es: 'Torneo', en: 'Tournament' }
  },
  departure: {
    color: typeColors.departure.color,
    bg: typeColors.departure.bg,
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
    label: { es: 'Salida', en: 'Departure' }
  },
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
  market?: string
}

export default function Schedule({ data, market = 'es' }: ScheduleProps) {
  const [activeDay, setActiveDay] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const day = data.days[activeDay]
  const config = typeConfig[day.type] || typeConfig.training

  return (
    <section className="py-24" style={{ backgroundColor: brand.bgAlt }} ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span
            className="inline-block text-[11px] font-bold tracking-[3px] uppercase px-5 py-2 rounded-full mb-6"
            style={{ backgroundColor: brand.limeLight, color: brand.lime, border: `1px solid ${brand.lime}40` }}
          >
            {data.badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
            {data.title}
          </h2>
          <div className="w-12 h-1 rounded mx-auto mb-6" style={{ background: `linear-gradient(to right, ${brand.lime}, ${brand.red})` }} />
          <p className="text-lg max-w-2xl mx-auto" style={{ color: brand.textSecondary }}>{data.subtitle}</p>
        </motion.div>

        {/* Days Grid - Always visible */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-4 md:grid-cols-8 gap-2 md:gap-3 mb-8"
        >
          {data.days.map((d, i) => {
            const cfg = typeConfig[d.type] || typeConfig.training
            const isActive = activeDay === i

            return (
              <button
                key={i}
                onClick={() => setActiveDay(i)}
                className="relative p-3 md:p-4 rounded-xl transition-all duration-300"
                style={{
                  backgroundColor: isActive ? brand.surface : brand.bgAlt,
                  border: `1px solid ${isActive ? cfg.color : brand.border}`,
                  transform: isActive ? 'scale(1.02)' : 'scale(1)',
                  boxShadow: isActive ? `0 0 0 2px ${cfg.color}` : 'none'
                }}
              >
                <div
                  className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mx-auto mb-2"
                  style={{
                    backgroundColor: isActive ? cfg.color : cfg.bg,
                  }}
                >
                  <span
                    className="font-bold text-lg md:text-xl"
                    style={{
                      color: isActive ? brand.black : cfg.color,
                      fontFamily: "'Space Grotesk', system-ui"
                    }}
                  >
                    {d.day}
                  </span>
                </div>
                <p className="text-[10px] md:text-xs text-center" style={{ color: brand.textMuted }}>{d.date.split(' ')[0]}</p>
                <div className="mt-1.5 flex justify-center" style={{ color: cfg.color, opacity: isActive ? 1 : 0.5 }}>
                  {cfg.icon}
                </div>
              </button>
            )
          })}
        </motion.div>

        {/* Day Detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid md:grid-cols-2 gap-6 items-stretch">
              {/* Image */}
              <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[380px] rounded-2xl overflow-hidden group">
                <img
                  src={`/img/activities/day-${day.day}.jpg`}
                  alt={day.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${brand.black}E6 0%, ${brand.black}4D 50%, transparent 100%)` }} />

                {/* Day badge */}
                <div className="absolute top-4 left-4 flex items-center gap-3">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: config.color }}
                  >
                    <span className="font-bold text-2xl" style={{ color: brand.black, fontFamily: "'Space Grotesk', system-ui" }}>
                      {day.day}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-bold">{day.date}</p>
                    <div className="flex items-center gap-1.5" style={{ color: config.color }}>
                      {config.icon}
                      <span className="text-xs font-medium">{config.label[market as 'es' | 'en']}</span>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="absolute top-4 right-4 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2" style={{ backgroundColor: `${brand.black}66`, border: `1px solid ${brand.white}20` }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: brand.textMuted }}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span className="text-sm" style={{ color: brand.white }}>{day.location}</span>
                </div>

                {/* Title */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
                    {day.title}
                  </h3>
                </div>
              </div>

              {/* Activities */}
              <div className="rounded-2xl p-6 md:p-8 flex flex-col" style={{ backgroundColor: brand.surface, border: `1px solid ${brand.border}` }}>
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: config.bg, color: config.color }}
                  >
                    {config.icon}
                  </div>
                  <div>
                    <h4 className="font-bold" style={{ color: brand.textPrimary }}>{market === 'es' ? 'Actividades del día' : "Day's Activities"}</h4>
                    <p className="text-xs" style={{ color: brand.textMuted }}>{day.highlights.length} {market === 'es' ? 'actividades' : 'activities'}</p>
                  </div>
                </div>

                <div className="flex-1 space-y-3">
                  {day.highlights.map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-start gap-3 p-4 rounded-xl"
                      style={{ backgroundColor: brand.bgAlt, border: `1px solid ${brand.border}` }}
                    >
                      <div
                        className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: config.bg }}
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke={config.color} strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                      <span className="text-sm leading-relaxed" style={{ color: brand.textSecondary }}>{h}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-6 pt-6" style={{ borderTop: `1px solid ${brand.border}` }}>
                  <button
                    onClick={() => setActiveDay(activeDay === 0 ? data.days.length - 1 : activeDay - 1)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-colors"
                    style={{ backgroundColor: brand.bgAlt, border: `1px solid ${brand.border}` }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    <span className="text-sm" style={{ color: brand.textSecondary }}>{market === 'es' ? 'Anterior' : 'Previous'}</span>
                  </button>

                  <span className="text-sm" style={{ color: brand.textMuted }}>{activeDay + 1} / {data.days.length}</span>

                  <button
                    onClick={() => setActiveDay(activeDay === data.days.length - 1 ? 0 : activeDay + 1)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-colors"
                    style={{ backgroundColor: brand.bgAlt, border: `1px solid ${brand.border}` }}
                  >
                    <span className="text-sm" style={{ color: brand.textSecondary }}>{market === 'es' ? 'Siguiente' : 'Next'}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
