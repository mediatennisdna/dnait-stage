import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DNAIT STAGE — International Tennis Experience',
  description: 'The first international tennis stage by Tennis DNA (USA) and AIT Tenis (Spain). 50 junior players aged 10-18. July 2026, Madrid + Valencia.',
  keywords: 'tennis camp Spain, campus tenis España, DNAIT STAGE, Tennis DNA, AIT Tenis, junior tennis, summer camp Madrid Valencia 2026',
  openGraph: {
    title: 'DNAIT STAGE — International Tennis Experience',
    description: '50 spots. 7 days. Madrid + Valencia. Elite tennis training + adventure. Junior players 10-18. July 2026.',
    url: 'https://dnaitstage.com',
    siteName: 'DNAIT STAGE',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DNAIT STAGE — International Tennis Experience',
    description: '50 spots. 7 days. Madrid + Valencia. Tennis training, adventure & culture for players 10-18.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#050505] text-white antialiased overflow-x-hidden font-[Inter,system-ui,sans-serif]">
        {children}
      </body>
    </html>
  )
}
