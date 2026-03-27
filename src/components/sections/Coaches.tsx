'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

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
}

export default function Coaches({ data }: CoachesProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-24 bg-[#0a0f14]/50" ref={ref}>
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

        {/* Ratio highlight */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 bg-[rgba(187,255,103,0.05)] border border-[rgba(187,255,103,0.1)] rounded-xl px-6 py-3">
            <span className="text-3xl font-bold text-[#BBFF67]" style={{ fontFamily: "'Space Grotesk', system-ui" }}>6:1</span>
            <span className="text-[#9CA3AF] text-sm text-left max-w-xs">{data.ratio}</span>
          </div>
        </motion.div>

        {/* Teams */}
        <div className="space-y-12">
          {data.teams.map((team, ti) => (
            <motion.div
              key={ti}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + ti * 0.15 }}
            >
              <h3 className="text-lg font-bold mb-6 flex items-center gap-3" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={ti === 0 ? '#BBFF67' : '#C8102E'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                <span style={{ color: ti === 0 ? '#BBFF67' : '#C8102E' }}>{team.name}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {team.members.map((member, mi) => (
                  <div
                    key={mi}
                    className="bg-[#050505] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all group"
                  >
                    <div className="w-14 h-14 rounded-full overflow-hidden mb-4 border-2 border-white/10 relative">
                      {/* Replace src with real coach photo: /img/coaches/firstname-lowercase.jpg */}
                      <img
                        src={`/img/coaches/${member.name.split(' ')[0].toLowerCase()}.jpg`}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 items-center justify-center text-lg font-bold text-[#BBFF67] hidden" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
                        {member.name.charAt(0)}
                      </div>
                    </div>
                    <h4 className="text-white font-bold mb-1">{member.name}</h4>
                    <p className="text-[#D4A853] text-xs font-semibold mb-3">{member.role}</p>
                    <p className="text-[#6B7280] text-sm leading-relaxed">{member.bio}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
