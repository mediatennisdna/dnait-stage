'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { brand, teamColors } from '@/lib/brand'

interface CoachesProps {
  data: {
    badge: string
    title: string
    subtitle: string
    ratio: string
    teams: {
      name: string
      members: { name: string; role: string; bio: string }[]
    }[]
  }
  market?: string
}

const teamLogos = ['/img/logos/tennis-dna.png', '/img/logos/logo-ai-tennis.jpeg']

export default function Coaches({ data, market = 'es' }: CoachesProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-24 overflow-hidden" style={{ backgroundColor: brand.bgAlt }} ref={ref}>
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
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Space Grotesk', system-ui", color: brand.textPrimary }}>
            {data.title}
          </h2>
          <div className="w-12 h-1 rounded mx-auto mb-6" style={{ background: `linear-gradient(to right, ${brand.lime}, ${brand.red})` }} />
          <p className="text-lg max-w-2xl mx-auto" style={{ color: brand.textSecondary }}>{data.subtitle}</p>
        </motion.div>

        {/* Ratio highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex justify-center mb-16"
        >
          <div className="relative">
            <div className="absolute inset-0 blur-xl rounded-full" style={{ background: `linear-gradient(to right, ${brand.lime}33, ${brand.red}33)` }} />
            <div className="relative rounded-2xl px-8 py-6 flex items-center gap-6" style={{ backgroundColor: brand.bg, border: `1px solid ${brand.border}`, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
              <div className="text-center">
                <span className="text-5xl font-bold block" style={{ color: brand.lime, fontFamily: "'Space Grotesk', system-ui" }}>6:1</span>
                <span className="text-[10px] uppercase tracking-wider" style={{ color: brand.textMuted }}>{market === 'es' ? 'Ratio' : 'Ratio'}</span>
              </div>
              <div className="w-px h-12" style={{ backgroundColor: brand.border }} />
              <p className="text-sm max-w-xs" style={{ color: brand.textSecondary }}>{data.ratio}</p>
            </div>
          </div>
        </motion.div>

        {/* Teams */}
        <div className="space-y-16">
          {data.teams.map((team, teamIndex) => {
            const teamColor = teamIndex === 0 ? teamColors.tdna : teamColors.ait
            return (
              <motion.div
                key={teamIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + teamIndex * 0.2 }}
              >
                {/* Team header */}
                <div className="flex items-center gap-4 mb-8">
                  <img
                    src={teamLogos[teamIndex]}
                    alt={team.name}
                    className="h-12 w-auto"
                  />
                  <div>
                    <h3 className="text-xl font-bold" style={{ fontFamily: "'Space Grotesk', system-ui", color: brand.textPrimary }}>
                      {team.name}
                    </h3>
                    <p className="text-sm" style={{ color: teamColor }}>
                      {team.members.length} {market === 'es' ? 'miembros' : 'members'}
                    </p>
                  </div>
                  <div className="flex-1 h-px ml-4" style={{ background: `linear-gradient(to right, ${teamColor}40, transparent)` }} />
                </div>

                {/* Team Members Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {team.members.map((member, mi) => (
                    <motion.div
                      key={mi}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.4 + teamIndex * 0.2 + mi * 0.1 }}
                      className="group rounded-2xl overflow-hidden transition-all hover:shadow-lg"
                      style={{ backgroundColor: brand.bg, border: `1px solid ${brand.border}`, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
                    >
                      {/* Avatar area */}
                      <div
                        className="relative h-40 flex items-center justify-center"
                        style={{ background: `linear-gradient(135deg, ${teamColor}20 0%, ${brand.bgAlt} 100%)` }}
                      >
                        <div
                          className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold shadow-lg"
                          style={{ backgroundColor: brand.bg, color: teamColor, border: `3px solid ${teamColor}` }}
                        >
                          {member.name.split(' ').map(n => n.charAt(0)).join('')}
                        </div>

                        {/* Role badge */}
                        <div
                          className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg text-xs font-bold"
                          style={{ backgroundColor: `${teamColor}20`, color: teamColor, border: `1px solid ${teamColor}40` }}
                        >
                          {member.role}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h4 className="text-lg font-bold mb-2" style={{ fontFamily: "'Space Grotesk', system-ui", color: brand.textPrimary }}>
                          {member.name}
                        </h4>
                        <p className="text-sm leading-relaxed" style={{ color: brand.textSecondary }}>{member.bio}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
