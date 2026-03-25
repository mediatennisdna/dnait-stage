import LandingPage from '@/components/LandingPage'

export const metadata = {
  title: 'DNAIT STAGE — Campus Internacional de Tenis | Julio 2026 Madrid + Valencia',
  description: 'Campus internacional de tenis para jugadores junior de 10 a 18 años. 7 días en Madrid + Valencia. Tenis, aventura y cultura. Tennis DNA × AIT Tenis. Julio 2026. Solo 50 plazas.',
  alternates: {
    languages: { en: '/en', es: '/es' },
  },
}

export default function SpainPage() {
  return <LandingPage market="es" />
}
