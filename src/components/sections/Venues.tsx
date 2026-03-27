'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { brand, teamColors } from '@/lib/brand'

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
  market?: string
}

const venueImages: Record<number, string[]> = {
  0: ['/img/venues/escorial.jpg', '/img/venues/el-escorial-interior.jpg', '/img/activities/day-2.jpg'],
  1: ['/img/activities/day-6.jpg', '/img/activities/day-7.jpg', '/img/activities/Playa-de-las-Arenas-Valencia.jpg'],
}

export default function Venues({ data, market = 'es' }: VenuesProps) {
  const [activeVenue, setActiveVenue] = useState(0)
  const [activeImage, setActiveImage] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const loc = data.locations[activeVenue]
  const images = venueImages[activeVenue] || venueImages[0]
  const color = activeVenue === 0 ? teamColors.tdna : teamColors.ait

  return (
    <section className="py-24 overflow-hidden" ref={ref}>
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

        {/* Venue Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-4 mb-10"
        >
          {data.locations.map((l, i) => {
            const venueColor = i === 0 ? teamColors.tdna : teamColors.ait
            return (
              <button
                key={i}
                onClick={() => { setActiveVenue(i); setActiveImage(0); }}
                className="flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300"
                style={{
                  backgroundColor: activeVenue === i ? brand.bg : brand.bgAlt,
                  border: `2px solid ${activeVenue === i ? venueColor : brand.border}`,
                  transform: activeVenue === i ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: activeVenue === i ? '0 4px 20px rgba(0,0,0,0.08)' : 'none'
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${venueColor}33` }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={venueColor} strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div className="text-left">
                  <p className="font-bold text-sm" style={{ color: brand.textPrimary }}>{l.city}</p>
                  <p className="text-xs" style={{ color: brand.textMuted }}>{i === 0 ? (market === 'es' ? 'Días 1-5' : 'Days 1-5') : (market === 'es' ? 'Días 6-8' : 'Days 6-8')}</p>
                </div>
              </button>
            )
          })}
        </motion.div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeVenue}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-2 gap-8"
          >
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={images[activeImage]}
                    alt={loc.name}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${brand.black}CC 0%, transparent 50%, transparent 100%)` }} />

                {/* City badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 backdrop-blur-sm rounded-xl px-4 py-2" style={{ backgroundColor: `${brand.black}80`, border: `1px solid ${brand.white}20` }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span className="font-bold" style={{ color: brand.white }}>{loc.city}</span>
                </div>

                {/* Image counter */}
                <div className="absolute bottom-4 right-4 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs" style={{ backgroundColor: `${brand.black}80`, border: `1px solid ${brand.white}20`, color: brand.white }}>
                  {activeImage + 1} / {images.length}
                </div>

                {/* Navigation arrows */}
                <button
                  onClick={() => setActiveImage((activeImage - 1 + images.length) % images.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                  style={{ backgroundColor: `${brand.black}4D`, border: `1px solid ${brand.white}20`, color: brand.white }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </button>
                <button
                  onClick={() => setActiveImage((activeImage + 1) % images.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                  style={{ backgroundColor: `${brand.black}4D`, border: `1px solid ${brand.white}20`, color: brand.white }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </button>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className="relative flex-1 aspect-[3/2] rounded-xl overflow-hidden transition-all duration-300"
                    style={{
                      transform: activeImage === i ? 'scale(1.05)' : 'scale(1)',
                      opacity: activeImage === i ? 1 : 0.6
                    }}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    <div
                      className="absolute inset-0 rounded-xl transition-opacity"
                      style={{
                        border: `2px solid ${color}`,
                        opacity: activeImage === i ? 1 : 0
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Info Card */}
            <div className="rounded-2xl p-8 flex flex-col" style={{ backgroundColor: brand.surface, border: `1px solid ${brand.border}` }}>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${color}26` }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
                    <rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', system-ui", color: brand.textPrimary }}>
                    {loc.name}
                  </h3>
                  <p className="text-sm" style={{ color }}>{loc.city}</p>
                </div>
              </div>

              <p className="leading-relaxed mb-8" style={{ color: brand.textSecondary }}>{loc.description}</p>

              <h4 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: brand.textMuted }}>
                {market === 'es' ? 'Instalaciones' : 'Facilities'}
              </h4>

              <div className="grid grid-cols-2 gap-3 flex-1">
                {loc.features.map((f, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: j * 0.05 }}
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{ backgroundColor: brand.bgAlt }}
                  >
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${color}33` }}
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <span className="text-sm" style={{ color: brand.textSecondary }}>{f}</span>
                  </motion.div>
                ))}
              </div>

              {/* Map link */}
              <div className="mt-8 pt-6" style={{ borderTop: `1px solid ${brand.border}` }}>
                <a
                  href={activeVenue === 0 ? 'https://goo.gl/maps/escorial' : 'https://goo.gl/maps/gtennis'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm hover:underline"
                  style={{ color }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  {market === 'es' ? 'Ver en Google Maps' : 'View on Google Maps'}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
