import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import NewsletterPopup from '@/components/NewsletterPopup'
import { Toaster } from "@/components/ui/sonner"

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Ndewedo Tours - Safari, Trekking & Cultural Tours in Tanzania',
  description: 'Experience authentic Tanzania with Ndewedo Tours. Specializing in wildlife safaris, Kilimanjaro treks, cultural tours, and unforgettable African adventures.',
  keywords: 'Tanzania safari, Kilimanjaro trekking, cultural tours, Maasai tribe, African wildlife, safari tours, Tanzania travel, Arusha tours',
  authors: [{ name: 'Ndewedo Tours' }],
  openGraph: {
    title: 'Ndewedo Tours - Safari, Trekking & Cultural Tours in Tanzania',
    description: 'Experience authentic Tanzania with Ndewedo Tours',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
        <head>
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
              <link
                href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
                rel="stylesheet"
              />
        </head>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <NewsletterPopup />
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
