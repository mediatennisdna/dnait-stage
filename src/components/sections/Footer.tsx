'use client'

import { brand, teamColors } from '@/lib/brand'

interface FooterProps {
  data: {
    tagline: string
    date: string
    tdna: { name: string; url: string; location: string }
    ait: { name: string; url: string; location: string }
    contact: { email: string; ig1: string; ig2: string }
    copy: string
  }
  market: string
}

export default function Footer({ data, market }: FooterProps) {
  return (
    <footer style={{ backgroundColor: brand.surface, borderTop: `1px solid ${brand.border}` }}>
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Main logos section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-16">
          <a href={data.tdna.url} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center">
            <img
              src="/img/logos/tennis-dna.png"
              alt="Tennis DNA"
              className="h-16 md:h-20 w-auto mb-3 opacity-90 group-hover:opacity-100 transition-all group-hover:scale-105"
            />
            <span className="text-sm font-medium" style={{ color: teamColors.tdna }}>{data.tdna.name}</span>
            <span className="text-xs" style={{ color: brand.textMuted }}>{data.tdna.location}</span>
          </a>

          <div className="flex flex-col items-center">
            <img
              src="/img/logos/DNAITSTAGE-06.png"
              alt="DNAIT STAGE"
              className="h-12 md:h-14 w-auto mb-2"
            />
            <span className="text-xs" style={{ color: brand.textMuted }}>{data.date}</span>
          </div>

          <a href={data.ait.url} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center">
            <img
              src="/img/logos/logo-aitenis.webp"
              alt="AIT Tenis"
              className="h-16 md:h-20 w-auto mb-3 opacity-90 group-hover:opacity-100 transition-all group-hover:scale-105"
            />
            <span className="text-sm font-medium" style={{ color: teamColors.ait }}>{data.ait.name}</span>
            <span className="text-xs" style={{ color: brand.textMuted }}>{data.ait.location}</span>
          </a>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* About */}
          <div className="text-center md:text-left">
            <h4 className="text-sm font-bold mb-3" style={{ color: brand.textSecondary }}>{market === 'es' ? 'El Proyecto' : 'The Project'}</h4>
            <p className="text-sm leading-relaxed" style={{ color: brand.textMuted }}>{data.tagline}</p>
          </div>

          {/* Contact */}
          <div className="text-center">
            <h4 className="text-sm font-bold mb-3" style={{ color: brand.textSecondary }}>{market === 'es' ? 'Contacto' : 'Contact'}</h4>
            <a href={`mailto:${data.contact.email}`} className="text-sm hover:underline block mb-3" style={{ color: brand.lime }}>
              {data.contact.email}
            </a>
            <div className="flex items-center justify-center gap-4">
              <a href={`https://instagram.com/${data.contact.ig1.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-colors hover:opacity-100" style={{ color: brand.textMuted }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                <span className="text-xs">{data.contact.ig1}</span>
              </a>
              <a href={`https://instagram.com/${data.contact.ig2.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-colors hover:opacity-100" style={{ color: brand.textMuted }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                <span className="text-xs">{data.contact.ig2}</span>
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="text-center md:text-right">
            <h4 className="text-sm font-bold mb-3" style={{ color: brand.textSecondary }}>{market === 'es' ? 'Enlaces' : 'Links'}</h4>
            <div className="flex flex-col gap-2">
              <a href={data.tdna.url} target="_blank" rel="noopener noreferrer" className="text-sm transition-colors" style={{ color: brand.textMuted }}>
                {data.tdna.url.replace('https://', '')}
              </a>
              <a href={data.ait.url} target="_blank" rel="noopener noreferrer" className="text-sm transition-colors" style={{ color: brand.textMuted }}>
                {data.ait.url.replace('https://', '')}
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 text-center" style={{ borderTop: `1px solid ${brand.border}` }}>
          <p className="text-xs" style={{ color: brand.textDisabled }}>{data.copy}</p>
        </div>
      </div>
    </footer>
  )
}
