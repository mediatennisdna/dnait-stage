'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { brand } from '@/lib/brand'
import gsap from 'gsap'

// Tennis ball SVG component
function TennisBall({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={className} style={style}>
      <defs>
        <clipPath id="ballClip">
          <circle cx="256" cy="256" r="220" />
        </clipPath>
      </defs>

      {/* Base */}
      <circle cx="256" cy="256" r="220" fill="#D3E51A" />

      {/* Sombra superior */}
      <path
        d="M118 78 C170 34 265 22 348 44 C389 55 421 71 446 95 C408 83 357 86 308 92 C253 100 199 104 154 99 C137 97 126 91 118 78 Z"
        fill="#BFCE12"
        clipPath="url(#ballClip)"
      />

      {/* Sombra derecha */}
      <path
        d="M354 90 C403 106 441 145 459 206 C475 264 467 339 438 397 C412 447 374 477 333 476 C308 475 293 469 278 456 C335 432 372 387 392 329 C409 279 411 219 401 170 C393 133 378 108 354 90 Z"
        fill="#B6C70F"
        clipPath="url(#ballClip)"
      />

      {/* Sombra inferior izquierda */}
      <path
        d="M70 392 C111 388 155 394 196 410 C219 419 239 430 252 443 C219 456 182 464 142 460 C109 457 84 437 70 392 Z"
        fill="#C0D313"
        clipPath="url(#ballClip)"
      />

      {/* Costura superior */}
      <path
        d="M50 136 C72 105 96 83 127 72 C176 55 229 66 283 90 C332 112 373 124 405 118 C430 113 447 118 462 138"
        fill="none"
        stroke="#EFEFD8"
        strokeWidth="28"
        strokeLinecap="round"
        clipPath="url(#ballClip)"
      />

      {/* Costura inferior */}
      <path
        d="M42 392 C88 392 136 402 185 420 C223 433 257 447 287 462 C301 469 312 474 325 480"
        fill="none"
        stroke="#EFEFD8"
        strokeWidth="22"
        strokeLinecap="round"
        clipPath="url(#ballClip)"
      />
    </svg>
  )
}

export default function MarketSelector() {
  const router = useRouter()
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const ballRef = useRef<HTMLDivElement>(null)
  const ball2Ref = useRef<HTMLDivElement>(null)
  const ball3Ref = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)

  const handleSelect = (market: string) => {
    router.push(`/${market}`)
  }

  // GSAP Tennis Ball Animation
  useEffect(() => {
    if (!ballRef.current || !containerRef.current) return

    const ball = ballRef.current
    const ball2 = ball2Ref.current
    const ball3 = ball3Ref.current
    const trail = trailRef.current

    // Main timeline for the primary ball
    const tl = gsap.timeline({ repeat: -1 })

    // Initial serve animation - ball comes flying in
    gsap.set(ball, { x: -150, y: -100, scale: 0.3, rotation: 0 })

    tl.to(ball, {
      x: '40vw',
      y: '30vh',
      scale: 1,
      rotation: 720,
      duration: 1.2,
      ease: 'power2.out'
    })
      .to(ball, {
        x: '70vw',
        y: '60vh',
        rotation: 1080,
        duration: 0.8,
        ease: 'bounce.out'
      })
      .to(ball, {
        x: '20vw',
        y: '70vh',
        rotation: 1440,
        duration: 1,
        ease: 'power1.inOut'
      })
      .to(ball, {
        x: '80vw',
        y: '20vh',
        rotation: 1800,
        duration: 1.2,
        ease: 'power2.inOut'
      })
      .to(ball, {
        x: '50vw',
        y: '50vh',
        rotation: 2160,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)'
      })
      .to(ball, {
        x: '-10vw',
        y: '80vh',
        rotation: 2520,
        scale: 0.5,
        duration: 1,
        ease: 'power2.in'
      })

    // Secondary floating ball (slower, ambient)
    if (ball2) {
      gsap.set(ball2, { x: '80vw', y: '20vh', scale: 0.6, opacity: 0.4 })
      gsap.to(ball2, {
        y: '25vh',
        rotation: 360,
        duration: 4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      })
      gsap.to(ball2, {
        x: '75vw',
        duration: 6,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      })
    }

    // Third floating ball (even slower)
    if (ball3) {
      gsap.set(ball3, { x: '10vw', y: '75vh', scale: 0.4, opacity: 0.25 })
      gsap.to(ball3, {
        y: '70vh',
        rotation: -360,
        duration: 5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      })
      gsap.to(ball3, {
        x: '15vw',
        duration: 7,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      })
    }

    // Trail particles animation
    if (trail) {
      const particles = trail.children
      gsap.set(particles, { scale: 0, opacity: 0 })

      // Staggered particle burst
      gsap.to(particles, {
        scale: 1,
        opacity: 0.6,
        duration: 0.3,
        stagger: 0.1,
        repeat: -1,
        repeatDelay: 2,
        ease: 'power2.out',
        onRepeat: () => {
          gsap.to(particles, {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            stagger: 0.05
          })
        }
      })
    }

    return () => {
      tl.kill()
      gsap.killTweensOf([ball, ball2, ball3, trail])
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-12 md:py-16"
      style={{ backgroundColor: brand.bg }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full" style={{ background: `radial-gradient(ellipse at top, ${brand.limeLight} 0%, transparent 60%)` }} />
        <div className="absolute bottom-0 right-0 w-96 h-96" style={{ background: `radial-gradient(circle, ${brand.redLight} 0%, transparent 70%)` }} />
        <div className="absolute top-1/4 left-1/4 w-64 h-64" style={{ background: `radial-gradient(circle, ${brand.goldLight} 0%, transparent 70%)` }} />
      </div>

      {/* GSAP Animated Tennis Balls */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Trail particles */}
        <div ref={trailRef} className="absolute">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 rounded-full"
              style={{
                backgroundColor: brand.lime,
                left: `${20 + i * 10}vw`,
                top: `${30 + i * 8}vh`,
                filter: 'blur(2px)'
              }}
            />
          ))}
        </div>

        {/* Main animated ball */}
        <div ref={ballRef} className="absolute" style={{ width: 80, height: 80 }}>
          <TennisBall className="w-full h-full" />
        </div>

        {/* Secondary ambient ball */}
        <div ref={ball2Ref} className="absolute" style={{ width: 60, height: 60 }}>
          <TennisBall className="w-full h-full" />
        </div>

        {/* Third ambient ball */}
        <div ref={ball3Ref} className="absolute" style={{ width: 40, height: 40 }}>
          <TennisBall className="w-full h-full" />
        </div>
      </div>

      {/* Logo - LARGER */}
      <motion.div
        className="text-center mb-6 md:mb-10 relative z-10"
        initial={{ opacity: 0, y: -30, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <div className="flex items-center justify-center mb-3">
          <img
            src="/img/logos/DNAITSTAGE-06.png"
            alt="DNAIT STAGE"
            className="h-20 md:h-28 lg:h-36 w-auto drop-shadow-lg"
          />
        </div>
        <motion.p
          className="text-base md:text-lg tracking-[0.25em] uppercase font-medium"
          style={{ color: brand.textSecondary }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          International Tennis Experience
        </motion.p>
        <motion.p
          className="italic mt-3 text-xl md:text-2xl"
          style={{ color: brand.gold, fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Train. Compete. Experience.
        </motion.p>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        className="text-center mb-6 md:mb-8 text-base md:text-lg max-w-lg px-4 relative z-10"
        style={{ color: brand.textSecondary }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Select your region to see pricing and details tailored for you
      </motion.p>

      {/* Market Cards */}
      <motion.div
        className="flex flex-col md:flex-row gap-4 md:gap-6 px-4 max-w-4xl w-full relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        {/* Spain Card */}
        <motion.button
          onClick={() => handleSelect('es')}
          onMouseEnter={() => setHoveredCard('es')}
          onMouseLeave={() => setHoveredCard(null)}
          className="flex-1 group relative overflow-hidden rounded-2xl p-6 md:p-8 text-left transition-all duration-500 cursor-pointer backdrop-blur-sm"
          style={{
            backgroundColor: `${brand.surface}F0`,
            border: `1px solid ${hoveredCard === 'es' ? brand.red : brand.border}`,
            boxShadow: hoveredCard === 'es' ? `0 8px 30px ${brand.redLight}` : '0 4px 20px rgba(0,0,0,0.08)'
          }}
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Red gradient overlay on hover */}
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background: `linear-gradient(to bottom right, ${brand.redLight}, transparent)`,
              opacity: hoveredCard === 'es' ? 1 : 0
            }}
          />

          {/* Flag accent */}
          <div
            className="absolute top-0 left-0 w-full h-1 transition-opacity duration-500"
            style={{
              background: `linear-gradient(to right, ${brand.red}, ${brand.gold}, ${brand.red})`,
              opacity: hoveredCard === 'es' ? 1 : 0
            }}
          />

          <div className="relative z-10">
            {/* Spain flag */}
            <div className="w-16 h-12 rounded-md overflow-hidden mb-6" style={{ border: `1px solid ${brand.border}` }}>
              <div className="h-3" style={{ backgroundColor: brand.red }} />
              <div className="h-6" style={{ backgroundColor: brand.gold }} />
              <div className="h-3" style={{ backgroundColor: brand.red }} />
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", color: brand.textPrimary }}>
              SOY DE <span style={{ color: brand.red }}>ESPAÑA</span>
            </h2>
            <p className="mb-6 leading-relaxed" style={{ color: brand.textSecondary }}>
              Precios en euros. Información sobre intercambio deportivo internacional y experiencia cultural con jugadores americanos.
            </p>

            <div className="flex items-center gap-2 font-semibold text-sm" style={{ color: brand.lime }}>
              <span>Ver en español</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </motion.button>

        {/* Divider */}
        <div className="hidden md:flex items-center">
          <div className="w-px h-32" style={{ background: `linear-gradient(to bottom, transparent, ${brand.border}, transparent)` }} />
        </div>

        {/* USA Card */}
        <motion.button
          onClick={() => handleSelect('en')}
          onMouseEnter={() => setHoveredCard('en')}
          onMouseLeave={() => setHoveredCard(null)}
          className="flex-1 group relative overflow-hidden rounded-2xl p-6 md:p-8 text-left transition-all duration-500 cursor-pointer backdrop-blur-sm"
          style={{
            backgroundColor: `${brand.surface}F0`,
            border: `1px solid ${hoveredCard === 'en' ? brand.lime : brand.border}`,
            boxShadow: hoveredCard === 'en' ? `0 8px 30px ${brand.limeLight}` : '0 4px 20px rgba(0,0,0,0.08)'
          }}
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Green gradient overlay on hover */}
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background: `linear-gradient(to bottom right, ${brand.limeLight}, transparent)`,
              opacity: hoveredCard === 'en' ? 1 : 0
            }}
          />

          {/* Flag accent */}
          <div
            className="absolute top-0 left-0 w-full h-1 transition-opacity duration-500"
            style={{
              background: `linear-gradient(to right, ${brand.flagUSBlue}, ${brand.flagUSRed}, ${brand.flagUSBlue})`,
              opacity: hoveredCard === 'en' ? 1 : 0
            }}
          />

          <div className="relative z-10">
            {/* USA flag */}
            <div className="w-16 h-12 rounded-md overflow-hidden mb-6 relative" style={{ border: `1px solid ${brand.border}`, backgroundColor: brand.white }}>
              <div className="absolute inset-0">
                {[...Array(11)].map((_, i) => (
                  <div
                    key={i}
                    className="h-[9.09%]"
                    style={{ backgroundColor: i % 2 === 0 ? brand.flagUSRed : brand.white }}
                  />
                ))}
              </div>
              <div className="absolute top-0 left-0 w-[40%] h-[54%]" style={{ backgroundColor: brand.flagUSBlue }} />
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", color: brand.textPrimary }}>
              I'M FROM THE <span style={{ color: brand.lime }}>USA</span>
            </h2>
            <p className="mb-6 leading-relaxed" style={{ color: brand.textSecondary }}>
              Prices in USD. Information about elite training in Spain, cultural immersion, and the ultimate international tennis experience.
            </p>

            <div className="flex items-center gap-2 font-semibold text-sm" style={{ color: brand.lime }}>
              <span>View in English</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </motion.button>
      </motion.div>

      {/* Stats Bar */}
      <motion.div
        className="flex flex-wrap justify-center gap-6 md:gap-10 mt-8 md:mt-10 px-4 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        {[
          { value: '50', label: 'SPOTS' },
          { value: '7', label: 'DAYS' },
          { value: 'JUL 2026', label: 'DATE' },
          { value: 'MAD + VLC', label: 'CITIES' },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-2xl md:text-3xl font-bold" style={{ color: brand.lime, fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>{stat.value}</div>
            <div className="text-[10px] tracking-[0.2em] mt-1" style={{ color: brand.textMuted }}>{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Bottom line */}
      <motion.div
        className="mt-10 md:mt-12 text-center text-xs tracking-wider relative z-10"
        style={{ color: brand.textMuted }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        Tennis DNA (USA) × AIT Tenis (Spain)
      </motion.div>
    </div>
  )
}
