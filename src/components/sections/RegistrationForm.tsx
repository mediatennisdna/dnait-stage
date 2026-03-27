'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { brand } from '@/lib/brand'

interface FormProps {
  data: {
    badge: string
    title: string
    subtitle: string
    fields: Record<string, string>
    levels: string[]
    sources: string[]
    countries: string[]
    submit: string
    successTitle: string
    successText: string
    note: string
  }
  market: string
  packs: { name: string; price: string }[]
  currency: string
}

export default function RegistrationForm({ data, market, packs, currency }: FormProps) {
  const [submitted, setSubmitted] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const subject = market === 'es'
      ? 'DNAIT STAGE 2026 — Nueva inscripción'
      : 'DNAIT STAGE 2026 — New registration'
    const fields = [
      ['name', data.fields.name],
      ['email', data.fields.email],
      ['phone', data.fields.phone],
      ['age', data.fields.age],
      ['country', data.fields.country],
      ['level', data.fields.level],
      ['pack', data.fields.pack],
      ['source', data.fields.source],
      ['allergies', data.fields.allergies],
      ['message', data.fields.message],
    ]
    const lines = fields
      .map(([key, label]) => {
        const val = fd.get(key)
        return val ? `${label}: ${val}` : ''
      })
      .filter(Boolean)
    const body = lines.join('\n')
    window.location.href = `mailto:pedro@tennis-dna.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSubmitted(true)
  }

  return (
    <section className="py-24" ref={ref}>
      <div className="max-w-2xl mx-auto px-6">
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
            {data.title}
          </h2>
          <p style={{ color: brand.textSecondary }}>{data.subtitle}</p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 rounded-2xl"
            style={{ backgroundColor: brand.surface, border: `1px solid ${brand.lime}33` }}
          >
            <svg className="w-16 h-16 mx-auto mb-4" style={{ color: brand.lime }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Space Grotesk', system-ui" }}>{data.successTitle}</h3>
            <p style={{ color: brand.textSecondary }}>{data.successText}</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="rounded-2xl p-8"
            style={{ backgroundColor: brand.surface, border: `1px solid ${brand.border}` }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <Input name="name" label={data.fields.name} required />
              <Input name="email" label={data.fields.email} type="email" required />
              <Input name="phone" label={data.fields.phone} type="tel" required />
              <Input name="age" label={data.fields.age} type="number" required />
              <Select name="country" label={data.fields.country} options={data.countries} required />
              <Select name="level" label={data.fields.level} options={data.levels} required />
              <Select
                name="pack"
                label={data.fields.pack}
                options={packs.map(p => `${p.name} (${currency}${p.price})`)}
                required
                className="sm:col-span-2"
              />
              <Select name="source" label={data.fields.source} options={data.sources} className="sm:col-span-2" />
            </div>
            <Textarea name="allergies" label={data.fields.allergies} />
            <Textarea name="message" label={data.fields.message} />
            <p className="text-xs mb-6 mt-4" style={{ color: brand.textDisabled }}>{data.note}</p>
            <button
              type="submit"
              className="w-full py-4 rounded-xl font-bold text-base transition-all hover:-translate-y-0.5"
              style={{
                backgroundColor: brand.lime,
                color: brand.black,
                boxShadow: `0 8px 30px ${brand.lime}40`
              }}
            >
              {data.submit}
            </button>
          </motion.form>
        )}
      </div>
    </section>
  )
}

function Input({ name, label, type = 'text', required = false, className = '' }: {
  name: string; label: string; type?: string; required?: boolean; className?: string
}) {
  return (
    <div className={className}>
      <label className="block text-sm mb-1.5 font-medium" style={{ color: brand.textSecondary }}>{label}{required && ' *'}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl px-4 py-3 text-sm transition-all focus:outline-none"
        style={{
          backgroundColor: brand.bgAlt,
          border: `1px solid ${brand.border}`,
          color: brand.textPrimary
        }}
      />
    </div>
  )
}

function Select({ name, label, options, required = false, className = '' }: {
  name: string; label: string; options: string[]; required?: boolean; className?: string
}) {
  return (
    <div className={className}>
      <label className="block text-sm mb-1.5 font-medium" style={{ color: brand.textSecondary }}>{label}{required && ' *'}</label>
      <select
        name={name}
        required={required}
        className="w-full rounded-xl px-4 py-3 text-sm transition-all appearance-none focus:outline-none"
        style={{
          backgroundColor: brand.bgAlt,
          border: `1px solid ${brand.border}`,
          color: brand.textPrimary
        }}
        defaultValue=""
      >
        <option value="" disabled>—</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )
}

function Textarea({ name, label }: { name: string; label: string }) {
  return (
    <div className="mb-4">
      <label className="block text-sm mb-1.5 font-medium" style={{ color: brand.textSecondary }}>{label}</label>
      <textarea
        name={name}
        rows={3}
        className="w-full rounded-xl px-4 py-3 text-sm transition-all resize-none focus:outline-none"
        style={{
          backgroundColor: brand.bgAlt,
          border: `1px solid ${brand.border}`,
          color: brand.textPrimary
        }}
      />
    </div>
  )
}
