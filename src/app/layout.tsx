import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AdSenseScript } from '@/components/ui/AdSense';
import '../styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://toolnest.app'),
  title: {
    default: 'ToolNest — Fast, Free & Powerful Online Tools',
    template: '%s | ToolNest',
  },
  description:
    'ToolNest offers free online tools for images and PDFs. Remove backgrounds, compress files, merge PDFs, generate QR codes and passwords — no signup needed.',
  keywords: [
    'online tools', 'free tools', 'image tools', 'pdf tools', 
    'background remover', 'image compressor', 'pdf merger', 'qr code generator',
    'password generator', 'toolnest'
  ],
  authors: [{ name: 'ToolNest Team' }],
  creator: 'ToolNest',
  publisher: 'ToolNest',
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
    type: 'website',
    locale: 'en_US',
    url: 'https://toolnest.app',
    siteName: 'ToolNest',
    title: 'ToolNest — Fast, Free & Powerful Online Tools',
    description:
      'Free online tools for images and PDFs. No signup, no limits, no cost.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'ToolNest' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ToolNest — Fast, Free & Powerful Online Tools',
    description:
      'Free online tools for images and PDFs. No signup, no limits, no cost.',
    images: ['/og-image.png'],
    creator: '@toolnest',
    site: '@toolnest',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <AdSenseScript />
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
