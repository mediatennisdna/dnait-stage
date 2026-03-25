'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

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
          <span className="inline-block bg-[rgba(187,255,103,0.08)] text-[#BBFF67] text-[11px] font-bold tracking-[3px] uppercase px-5 py-2 rounded-full border border-[rgba(187,255,103,0.15)] mb-6">
            {data.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
            {data.title}
          </h2>
          <p className="text-[#9CA3AF]">{data.subtitle}</p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-[#0a0f14] border border-[#BBFF67]/20 rounded-2xl"
          >
            <svg className="w-16 h-16 mx-auto mb-4 text-[#BBFF67]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Space Grotesk', system-ui" }}>{data.successTitle}</h3>
            <p className="text-[#9CA3AF]">{data.successText}</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-[#0a0f14] border border-white/5 rounded-2xl p-8"
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
            <p className="text-[#4B5563] text-xs mb-6 mt-4">{data.note}</p>
            <button
              type="submit"
              className="w-full bg-[#BBFF67] text-[#050505] py-4 rounded-xl font-bold text-base hover:bg-[#9ae043] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(187,255,103,0.25)]"
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
      <label className="block text-sm text-[#9CA3AF] mb-1.5 font-medium">{label}{required && ' *'}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-[#4B5563] focus:outline-none focus:border-[#BBFF67]/40 focus:ring-1 focus:ring-[#BBFF67]/20 transition-all"
      />
    </div>
  )
}

function Select({ name, label, options, required = false, className = '' }: {
  name: string; label: string; options: string[]; required?: boolean; className?: string
}) {
  return (
    <div className={className}>
      <label className="block text-sm text-[#9CA3AF] mb-1.5 font-medium">{label}{required && ' *'}</label>
      <select
        name={name}
        required={required}
        className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#BBFF67]/40 focus:ring-1 focus:ring-[#BBFF67]/20 transition-all appearance-none"
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
      <label className="block text-sm text-[#9CA3AF] mb-1.5 font-medium">{label}</label>
      <textarea
        name={name}
        rows={3}
        className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-[#4B5563] focus:outline-none focus:border-[#BBFF67]/40 focus:ring-1 focus:ring-[#BBFF67]/20 transition-all resize-none"
      />
    </div>
  )
}
