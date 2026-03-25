import LandingPage from '@/components/LandingPage'

export const metadata = {
  title: 'DNAIT STAGE — International Tennis Camp Spain | July 2026 Madrid + Valencia',
  description: 'International tennis camp for junior players aged 10-18. 7 days in Madrid + Valencia. Tennis, adventure and culture. Tennis DNA × AIT Tenis. July 2026. Only 50 spots.',
  alternates: {
    languages: { en: '/en', es: '/es' },
  },
}

export default function USAPage() {
  return <LandingPage market="en" />
}
