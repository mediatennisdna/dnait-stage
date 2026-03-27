import type { Metadata } from 'next'
import LandingPage from '@/components/LandingPage'

export const metadata: Metadata = {
  title: 'International Tennis Camp Spain | July 2026 Madrid + Valencia',
  description: 'International tennis camp for competitive junior players aged 10-18. 7 days in Madrid + Valencia. Elite training, adventure and culture. Tennis DNA × AIT Tenis. July 2026. Only 50 spots. From $895.',
  openGraph: {
    title: 'DNAIT STAGE — International Tennis Camp in Spain',
    description: '50 spots. 7 days. Madrid + Valencia. Elite tennis training + adventure for players 10-18. July 2026. From $895.',
    locale: 'en_US',
  },
  alternates: {
    canonical: '/en',
    languages: { en: '/en', es: '/es' },
  },
}

export default function USAPage() {
  return <LandingPage market="en" />
}
