'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { content } from '@/lib/content'
import type { Market } from '@/lib/content'
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
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Skip to content */}
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:bg-[#BBFF67] focus:text-[#050505] focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold focus:text-sm"
      >
        {market === 'es' ? 'Saltar al contenido' : 'Skip to content'}
      </a>

      {/* Navigation */}
      <nav aria-label={market === 'es' ? 'Navegación principal' : 'Main navigation'} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#050505]/95 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href={`/${market}`} className="flex items-center">
            <img
              src="/img/logos/DNAITSTAGE-06.png"
              alt="DNAIT STAGE"
              className="h-8 w-auto"
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {c.nav.links.map((label, i) => (
              <button
                key={i}
                onClick={() => scrollTo(sectionIds[i])}
                aria-current={activeSection === sectionIds[i] ? 'true' : undefined}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#BBFF67] ${
                  activeSection === sectionIds[i]
                    ? 'text-[#BBFF67] bg-[#BBFF67]/8'
                    : 'text-[#9CA3AF] hover:text-white hover:bg-white/5'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <a
              href={`/${otherMarket}`}
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#9CA3AF] hover:text-white border border-white/10 rounded-full hover:border-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-[#BBFF67]"
            >
              {market === 'es' ? (
                <svg width="16" height="12" viewBox="0 0 16 12" className="rounded-sm overflow-hidden">
                  <rect width="16" height="12" fill="white"/>
                  <rect width="16" height="0.92" y="0" fill="#B22234"/>
                  <rect width="16" height="0.92" y="1.84" fill="#B22234"/>
                  <rect width="16" height="0.92" y="3.68" fill="#B22234"/>
                  <rect width="16" height="0.92" y="5.52" fill="#B22234"/>
                  <rect width="16" height="0.92" y="7.36" fill="#B22234"/>
                  <rect width="16" height="0.92" y="9.2" fill="#B22234"/>
                  <rect width="16" height="0.92" y="11.04" fill="#B22234"/>
                  <rect width="6.4" height="6.46" fill="#002868"/>
                </svg>
              ) : (
                <svg width="16" height="12" viewBox="0 0 16 12" className="rounded-sm overflow-hidden">
                  <rect width="16" height="3" fill="#C8102E"/>
                  <rect width="16" height="6" y="3" fill="#D4A853"/>
                  <rect width="16" height="3" y="9" fill="#C8102E"/>
                </svg>
              )}
              {switchLabel}
            </a>
            <button
              onClick={() => scrollTo('form')}
              className="bg-[#BBFF67] text-[#050505] px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#9ae043] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(187,255,103,0.25)] focus:outline-none focus:ring-2 focus:ring-[#BBFF67] focus:ring-offset-2 focus:ring-offset-[#050505]"
            >
              {c.nav.cta}
            </button>
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? (market === 'es' ? 'Cerrar menú' : 'Close menu') : (market === 'es' ? 'Abrir menú' : 'Open menu')}
              aria-expanded={mobileMenuOpen}
              className="lg:hidden p-2 text-[#9CA3AF] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#BBFF67] rounded-lg"
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
              className="lg:hidden bg-[#0a0f14] border-t border-white/5"
            >
              <div className="px-6 py-4 flex flex-col gap-1">
                {c.nav.links.map((label, i) => (
                  <button
                    key={i}
                    onClick={() => scrollTo(sectionIds[i])}
                    className="text-left px-4 py-3 text-sm font-medium text-[#9CA3AF] hover:text-white hover:bg-white/5 rounded-lg transition-all"
                  >
                    {label}
                  </button>
                ))}
                <a
                  href={`/${otherMarket}`}
                  className="px-4 py-3 text-sm font-medium text-[#E8BF6A] hover:bg-white/5 rounded-lg transition-all"
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
      <div id="schedule"><Schedule data={c.schedule} /></div>
      <div id="pricing"><Pricing data={c.pricing} market={market} onCTA={() => scrollTo('form')} /></div>
      <div id="coaches"><Coaches data={c.coaches} /></div>
      <div id="venues"><Venues data={c.venues} /></div>
      <div id="faq"><FAQ data={c.faq} /></div>
      <CTA data={c.cta} onCTA={() => scrollTo('form')} />
      <div id="form"><RegistrationForm data={c.form} market={market} packs={c.pricing.packs} currency={c.pricing.currency} /></div>
      <Footer data={c.footer} market={market} />

      {/* Mobile sticky CTA */}
      <div className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden transition-transform duration-300 ${scrolled ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="bg-[#050505]/95 backdrop-blur-md border-t border-white/10 px-6 py-3">
          <button
            onClick={() => scrollTo('form')}
            className="w-full bg-[#BBFF67] text-[#050505] py-3 rounded-xl font-bold text-sm hover:bg-[#9ae043] transition-all"
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
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0f14] to-[#050505]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(187,255,103,0.05)_0%,transparent_70%)]" />
      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <p className="text-[#E8BF6A] italic text-lg mb-4" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
          {data.claim}
        </p>
        <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
          {data.title}
        </h2>
        <p className="text-[#9CA3AF] text-lg mb-8">{data.subtitle}</p>
        <button
          onClick={onCTA}
          className="inline-flex items-center gap-2 bg-[#BBFF67] text-[#050505] px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#9ae043] transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(187,255,103,0.3)] focus:outline-none focus:ring-2 focus:ring-[#BBFF67] focus:ring-offset-2 focus:ring-offset-[#050505]"
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
