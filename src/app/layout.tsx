import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || ''

export const metadata: Metadata = {
  metadataBase: new URL('https://dnaitstage.com'),
  title: {
    default: 'DNAIT STAGE — International Tennis Experience | Madrid + Valencia 2026',
    template: '%s | DNAIT STAGE',
  },
  description: 'The first international tennis stage by Tennis DNA (USA) and AIT Tenis (Spain). 50 junior players aged 10-18. 7 days of training, adventure and culture. July 20-27, 2026. Madrid + Valencia.',
  keywords: [
    'tennis camp Spain', 'campus tenis España', 'DNAIT STAGE', 'Tennis DNA', 'AIT Tenis',
    'junior tennis camp', 'summer tennis camp Madrid', 'tennis camp Valencia',
    'international tennis experience', 'campus tenis verano 2026', 'tennis training Spain',
    'stage tenis internacional', 'tennis camp Europe', 'youth tennis camp',
    'tennis academy Spain', 'tennis holiday Spain', 'camp tenis junior',
  ],
  authors: [
    { name: 'Tennis DNA', url: 'https://tennis-dna.com' },
    { name: 'AIT Tenis', url: 'https://aittenis.es' },
  ],
  creator: 'DNAIT STAGE',
  publisher: 'Tennis DNA × AIT Tenis',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'DNAIT STAGE — International Tennis Experience',
    description: '50 spots. 7 days. Madrid + Valencia. Elite tennis training + adventure for junior players 10-18. July 2026.',
    url: 'https://dnaitstage.com',
    siteName: 'DNAIT STAGE',
    locale: 'es_ES',
    alternateLocale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DNAIT STAGE — International Tennis Experience in Spain',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DNAIT STAGE — International Tennis Experience',
    description: '50 spots. 7 days. Madrid + Valencia. Tennis, adventure & culture for players 10-18.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://dnaitstage.com',
    languages: {
      'es': '/es',
      'en': '/en',
      'x-default': '/',
    },
  },
  icons: {
    icon: '/favicon.svg',
  },
  verification: {
    // Add your Google Search Console verification code here
    // google: 'your-verification-code',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsEvent',
  name: 'DNAIT STAGE — International Tennis Experience',
  description: 'The first international tennis stage combining Tennis DNA (USA) and AIT Tenis (Spain). 7 days of intensive tennis training, adventure, and culture for junior players aged 10-18.',
  startDate: '2026-07-20',
  endDate: '2026-07-27',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  eventStatus: 'https://schema.org/EventScheduled',
  location: [
    {
      '@type': 'Place',
      name: 'Real Centro Universitario Escorial Maria Cristina',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Paseo Alamillos 2',
        addressLocality: 'San Lorenzo de El Escorial',
        addressRegion: 'Madrid',
        postalCode: '28200',
        addressCountry: 'ES',
      },
    },
    {
      '@type': 'Place',
      name: 'Gtennis Academy',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Mas Camarena',
        addressRegion: 'Valencia',
        addressCountry: 'ES',
      },
    },
  ],
  organizer: [
    { '@type': 'SportsOrganization', name: 'Tennis DNA', url: 'https://tennis-dna.com' },
    { '@type': 'SportsOrganization', name: 'AIT Tenis', url: 'https://aittenis.es' },
  ],
  offers: [
    { '@type': 'Offer', name: 'External Pack', price: '895', priceCurrency: 'EUR', availability: 'https://schema.org/LimitedAvailability' },
    { '@type': 'Offer', name: 'Full Pack', price: '1300', priceCurrency: 'EUR', availability: 'https://schema.org/LimitedAvailability' },
    { '@type': 'Offer', name: 'Madrid Pack', price: '950', priceCurrency: 'EUR', availability: 'https://schema.org/LimitedAvailability' },
  ],
  sport: 'Tennis',
  maximumAttendeeCapacity: 50,
  typicalAgeRange: '10-18',
  url: 'https://dnaitstage.com',
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is DNAIT STAGE?', acceptedAnswer: { '@type': 'Answer', text: 'The first international tennis stage by Tennis DNA (USA) and AIT Tenis (Spain). 50 junior players aged 10-18 in a week of training, adventure, and culture across Madrid and Valencia.' } },
    { '@type': 'Question', name: 'When does it take place?', acceptedAnswer: { '@type': 'Answer', text: 'July 20-27, 2026.' } },
    { '@type': 'Question', name: 'How much does it cost?', acceptedAnswer: { '@type': 'Answer', text: 'External Pack from 895 EUR/895 USD, Madrid Pack from 950 EUR/1895 USD, Full Pack from 1300 EUR/2495 USD. Early Bird -10% before April 30.' } },
    { '@type': 'Question', name: 'Is it safe?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. 24/7 security, sports insurance included, hospital 5 min away.' } },
    { '@type': 'Question', name: 'Are flights included?', acceptedAnswer: { '@type': 'Answer', text: 'No. Arrive Madrid-Barajas, depart Valencia. Transfer available for 150 EUR.' } },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%23050505'/><circle cx='16' cy='16' r='10' fill='none' stroke='%23BBFF67' stroke-width='2'/><path d='M8 12c4 2 8 2 12 0M8 20c4-2 8-2 12 0' fill='none' stroke='%23BBFF67' stroke-width='1.5'/></svg>" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className="bg-[#050505] text-white antialiased overflow-x-hidden font-[Inter,system-ui,sans-serif]">
        {children}
        {/* Google Analytics */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
