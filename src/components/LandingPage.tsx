'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { content } from '@/lib/content'
import type { Market } from '@/lib/content'
import { brand } from '@/lib/brand'
import Hero from './sections/Hero'
import About from './sections/About'
import Schedule from './sections/Schedule'
import Pricing from './sections/Pricing'
import Coaches from './sections/Coaches'
import Venues from './sections/Venues'
import FAQ from './sections/FAQ'
import RegistrationForm from './sections/RegistrationForm'
import Footer from './sections/Footer'

const sectionIds = ['about', 'schedule', 'pricing', 'coaches', 'venues', 'faq']

export default function LandingPage({ market }: { market: Market }) {
  const c = content[market]
  const [activeSection, setActiveSection] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)

      // Find active section
      const sections = sectionIds.map(id => {
        const el = document.getElementById(id)
        if (!el) return { id, top: 0 }
        return { id, top: el.getBoundingClientRect().top }
      })
      const current = sections.filter(s => s.top <= 200).pop()
      if (current) setActiveSection(current.id)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on Escape key
  useEffect(() => {
    if (!mobileMenuOpen) return
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [mobileMenuOpen])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setMobileMenuOpen(false)
    }
  }

  const otherMarket = market === 'es' ? 'en' : 'es'
  const switchLabel = market === 'es' ? 'English' : 'Español'

  return (
    <div className="min-h-screen" style={{ backgroundColor: brand.bg, color: brand.textPrimary }}>
      {/* Skip to content */}
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold focus:text-sm"
        style={{ backgroundColor: brand.lime, color: brand.black }}
      >
        {market === 'es' ? 'Saltar al contenido' : 'Skip to content'}
      </a>

      {/* Navigation */}
      <nav
        aria-label={market === 'es' ? 'Navegación principal' : 'Main navigation'}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? `${brand.bg}F2` : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? `1px solid ${brand.border}` : 'none',
          padding: scrolled ? '0.75rem 0' : '1.25rem 0'
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logos */}
          <a href={`/${market}`} className="flex items-center gap-3">
            <img
              src="/img/logos/DNAITSTAGE-06.png"
              alt="DNAIT STAGE"
              className="h-8 w-auto"
            />
            <div className="hidden sm:flex items-center gap-2 pl-3" style={{ borderLeft: `1px solid ${scrolled ? brand.border : `${brand.white}30`}` }}>
              <img
                src="/img/logos/tennis-dna.png"
                alt="Tennis DNA"
                className="h-6 w-auto opacity-70 hover:opacity-100 transition-opacity"
              />
              <span className="text-xs" style={{ color: scrolled ? brand.textDisabled : `${brand.white}60` }}>×</span>
              <img
                src="/img/logos/logo-aitenis.webp"
                alt="AIT Tenis"
                className="h-6 w-auto opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {c.nav.links.map((label, i) => (
              <button
                key={i}
                onClick={() => scrollTo(sectionIds[i])}
                aria-current={activeSection === sectionIds[i] ? 'true' : undefined}
                className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2"
                style={{
                  color: activeSection === sectionIds[i] ? brand.lime : (scrolled ? brand.textSecondary : brand.white),
                  backgroundColor: activeSection === sectionIds[i] ? `${brand.lime}14` : 'transparent',
                  outlineColor: brand.lime
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <a
              href={`/${otherMarket}`}
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-full transition-all focus:outline-none focus:ring-2"
              style={{ color: scrolled ? brand.textSecondary : brand.white, border: `1px solid ${scrolled ? brand.border : `${brand.white}40`}`, outlineColor: brand.lime }}
            >
              {market === 'es' ? (
                <svg width="16" height="12" viewBox="0 0 16 12" className="rounded-sm overflow-hidden">
                  <rect width="16" height="12" fill={brand.white}/>
                  <rect width="16" height="0.92" y="0" fill={brand.flagUSRed}/>
                  <rect width="16" height="0.92" y="1.84" fill={brand.flagUSRed}/>
                  <rect width="16" height="0.92" y="3.68" fill={brand.flagUSRed}/>
                  <rect width="16" height="0.92" y="5.52" fill={brand.flagUSRed}/>
                  <rect width="16" height="0.92" y="7.36" fill={brand.flagUSRed}/>
                  <rect width="16" height="0.92" y="9.2" fill={brand.flagUSRed}/>
                  <rect width="16" height="0.92" y="11.04" fill={brand.flagUSRed}/>
                  <rect width="6.4" height="6.46" fill={brand.flagUSBlue}/>
                </svg>
              ) : (
                <svg width="16" height="12" viewBox="0 0 16 12" className="rounded-sm overflow-hidden">
                  <rect width="16" height="3" fill={brand.red}/>
                  <rect width="16" height="6" y="3" fill={brand.gold}/>
                  <rect width="16" height="3" y="9" fill={brand.red}/>
                </svg>
              )}
              {switchLabel}
            </a>
            <button
              onClick={() => scrollTo('form')}
              className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{
                backgroundColor: brand.lime,
                color: brand.black,
                boxShadow: `0 8px 30px ${brand.lime}40`,
                outlineColor: brand.lime,
                outlineOffset: '2px'
              }}
            >
              {c.nav.cta}
            </button>
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? (market === 'es' ? 'Cerrar menú' : 'Close menu') : (market === 'es' ? 'Abrir menú' : 'Open menu')}
              aria-expanded={mobileMenuOpen}
              className="lg:hidden p-2 rounded-lg focus:outline-none focus:ring-2"
              style={{ color: scrolled ? brand.textSecondary : brand.white, outlineColor: brand.lime }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {mobileMenuOpen ? (
                  <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                ) : (
                  <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden"
              style={{ backgroundColor: brand.bg, borderTop: `1px solid ${brand.border}` }}
            >
              <div className="px-6 py-4 flex flex-col gap-1">
                {c.nav.links.map((label, i) => (
                  <button
                    key={i}
                    onClick={() => scrollTo(sectionIds[i])}
                    className="text-left px-4 py-3 text-sm font-medium rounded-lg transition-all"
                    style={{ color: brand.textSecondary }}
                  >
                    {label}
                  </button>
                ))}
                <a
                  href={`/${otherMarket}`}
                  className="px-4 py-3 text-sm font-medium rounded-lg transition-all"
                  style={{ color: brand.gold }}
                >
                  {switchLabel}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Sections */}
      <Hero data={c.hero} market={market} onCTA={() => scrollTo('form')} onSecondary={() => scrollTo('schedule')} />
      <div id="about"><About data={c.about} market={market} /></div>
      <div id="schedule"><Schedule data={c.schedule} market={market} /></div>
      <div id="pricing"><Pricing data={c.pricing} market={market} onCTA={() => scrollTo('form')} /></div>
      <div id="coaches"><Coaches data={c.coaches} market={market} /></div>
      <div id="venues"><Venues data={c.venues} market={market} /></div>
      <div id="faq"><FAQ data={c.faq} /></div>
      <CTA data={c.cta} onCTA={() => scrollTo('form')} />
      <div id="form"><RegistrationForm data={c.form} market={market} packs={c.pricing.packs} currency={c.pricing.currency} /></div>
      <Footer data={c.footer} market={market} />

      {/* Mobile sticky CTA */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 lg:hidden transition-transform duration-300"
        style={{ transform: scrolled ? 'translateY(0)' : 'translateY(100%)' }}
      >
        <div className="px-6 py-3" style={{ backgroundColor: `${brand.bg}F2`, backdropFilter: 'blur(12px)', borderTop: `1px solid ${brand.border}` }}>
          <button
            onClick={() => scrollTo('form')}
            className="w-full py-3 rounded-xl font-bold text-sm transition-all"
            style={{ backgroundColor: brand.lime, color: brand.black }}
          >
            {c.nav.cta}
          </button>
        </div>
      </div>
    </div>
  )
}

function CTA({ data, onCTA }: { data: typeof content.es.cta; onCTA: () => void }) {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${brand.bg}, ${brand.bgAlt}, ${brand.bg})` }} />
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at center, ${brand.limeLight} 0%, transparent 70%)` }} />
      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <p className="italic text-lg mb-4" style={{ color: brand.gold, fontFamily: "'Space Grotesk', system-ui" }}>
          {data.claim}
        </p>
        <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
          {data.title}
        </h2>
        <p className="text-lg mb-8" style={{ color: brand.textMuted }}>{data.subtitle}</p>
        <button
          onClick={onCTA}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{
            backgroundColor: brand.lime,
            color: brand.black,
            boxShadow: `0 12px 40px ${brand.lime}4D`,
            outlineColor: brand.lime
          }}
        >
          {data.button}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </section>
  )
}
