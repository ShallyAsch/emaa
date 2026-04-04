import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import '@/src/styles/globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'My Ende Bete Home',
  description: 'AI concierge system for Ethiopian luxury resort hospitality - Ende Bete Neuro',
  generator: 'v0.app',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'My Ende Bete Home',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#5C4033',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* PWA Meta Tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Ende Bete" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#5C4033" />
        
        {/* Standalone mode for PWA */}
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />

        <div id="google_translate_element" style={{ position: 'absolute', top: '-9999px', left: '-9999px', opacity: 0 }}></div>
        {/* Google Translate Integration */}
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new window.google.translate.TranslateElement(
                { pageLanguage: 'en', includedLanguages: 'en,am', layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE },
                'google_translate_element'
              );
            }
          `}
        </Script>
        <Script 
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
