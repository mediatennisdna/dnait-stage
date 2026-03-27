'use client'

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
    <footer className="border-t border-white/5 bg-[#050505]">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-3">
              <img src="/img/logos/DNAITSTAGE-06.png" alt="DNAIT STAGE" className="h-7 w-auto" />
            </div>
            <p className="text-[#9CA3AF] text-sm">{data.tagline}</p>
            <p className="text-[#6B7280] text-xs mt-1">{data.date}</p>
          </div>

          {/* Tennis DNA */}
          <div>
            <img src="/img/logos/tennis-dna.png" alt="Tennis DNA" className="h-8 mb-3 opacity-80" onError={(e) => { (e.currentTarget as HTMLElement).style.display = 'none' }} />
            <h4 className="text-sm font-bold mb-3 text-[#BBFF67]">{data.tdna.name}</h4>
            <a href={data.tdna.url} target="_blank" rel="noopener noreferrer" className="text-[#9CA3AF] text-sm hover:text-white transition-colors block mb-1">
              {data.tdna.url.replace('https://', '')}
            </a>
            <p className="text-[#6B7280] text-xs">{data.tdna.location}</p>
          </div>

          {/* AIT Tenis */}
          <div>
            <img src="/img/logos/ait-tenis.png" alt="AIT Tenis" className="h-8 mb-3 opacity-80" onError={(e) => { (e.currentTarget as HTMLElement).style.display = 'none' }} />
            <h4 className="text-sm font-bold mb-3 text-[#E5344E]">{data.ait.name}</h4>
            <a href={data.ait.url} target="_blank" rel="noopener noreferrer" className="text-[#9CA3AF] text-sm hover:text-white transition-colors block mb-1">
              {data.ait.url.replace('https://', '')}
            </a>
            <p className="text-[#6B7280] text-xs">{data.ait.location}</p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold mb-3">{market === 'es' ? 'Contacto' : 'Contact'}</h4>
            <a href={`mailto:${data.contact.email}`} className="text-[#BBFF67] text-sm hover:underline block mb-2">
              {data.contact.email}
            </a>
            <div className="space-y-1">
              <p className="text-[#9CA3AF] text-xs flex items-center gap-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                {data.contact.ig1}
              </p>
              <p className="text-[#9CA3AF] text-xs flex items-center gap-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                {data.contact.ig2}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center">
          <p className="text-[#6B7280] text-xs">{data.copy}</p>
        </div>
      </div>
    </footer>
  )
}
