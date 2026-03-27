import type { Metadata } from 'next'
import LandingPage from '@/components/LandingPage'

export const metadata: Metadata = {
  title: 'Campus Internacional de Tenis | Julio 2026 Madrid + Valencia',
  description: 'Campus internacional de tenis para jugadores junior de 10 a 18 años. 7 días en Madrid + Valencia. Tenis, aventura y cultura. Tennis DNA × AIT Tenis. Julio 2026. Solo 50 plazas. Desde 895€.',
  openGraph: {
    title: 'DNAIT STAGE — Campus Internacional de Tenis en España',
    description: '50 plazas. 7 días. Madrid + Valencia. Entrenamiento de élite + aventura para jugadores de 10-18 años. Julio 2026. Desde 895€.',
    locale: 'es_ES',
  },
  alternates: {
    canonical: '/es',
    languages: { en: '/en', es: '/es' },
  },
}

export default function SpainPage() {
  return <LandingPage market="es" />
}
