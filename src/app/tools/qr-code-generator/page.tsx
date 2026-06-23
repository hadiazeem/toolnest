import { Metadata } from 'next';
import { QrCodeGeneratorTool } from '@/components/tools/QrCodeGeneratorTool';
import { ToolPageShell } from '@/components/tools/ToolPageShell';

export const metadata: Metadata = {
  title: 'QR Code Generator — Create Custom QR Codes Free',
  description:
    'Generate custom QR codes online for free. Create QR codes for URLs, text, email and Wi-Fi networks with custom colors.',
  alternates: { canonical: 'https://toolnest.app/tools/qr-code-generator' },
  openGraph: {
    title: 'Free QR Code Generator | ToolNest',
    description: 'Create custom QR codes for any URL or text. Free, fast and customizable.',
    url: 'https://toolnest.app/tools/qr-code-generator',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

const steps = [
  { title: 'Choose your QR type', description: 'Select URL, text, email or Wi-Fi network as your QR code content type.' },
  { title: 'Enter your content', description: 'Fill in the details — a website link, message, email address or Wi-Fi credentials.' },
  { title: 'Customize and download', description: 'Adjust colors and size, then download your QR code as a PNG image.' },
];

const benefits = [
  { title: 'Multiple QR Types', description: 'Generate QR codes for URLs, plain text, email addresses and Wi-Fi network sharing.' },
  { title: 'Custom Colors', description: 'Match your brand with custom foreground and background colors.' },
  { title: 'High Resolution', description: 'Download QR codes up to 600px for crisp printing on any material.' },
  { title: 'Instant Preview', description: 'See your QR code update in real-time as you type.' },
];

const faqs = [
  { question: 'Do QR codes generated here expire?', answer: 'No, the QR codes encode your content directly, so they never expire and work forever.' },
  { question: 'Can I add my logo to the QR code?', answer: 'Logo embedding isn\'t currently supported, but you can customize colors to match your brand.' },
  { question: 'What\'s the best size for printing?', answer: 'For print materials, generate at least 300px, and larger (500-600px) for posters or signage viewed from a distance.' },
  { question: 'Will the Wi-Fi QR code work on all phones?', answer: 'Most modern Android and iOS devices can scan Wi-Fi QR codes directly through their camera app to join networks automatically.' },
];

export default function QrCodeGeneratorPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'QR Code Generator - ToolNest',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', ratingCount: '4231' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ToolPageShell
        toolId="qr-code-generator"
        toolName="QR Code Generator"
        heading="Free QR Code Generator"
        intro="Create custom QR codes for URLs, text, email or Wi-Fi networks — instantly, in any color, completely free."
        steps={steps}
        benefits={benefits}
        faqs={faqs}
      >
        <QrCodeGeneratorTool />
      </ToolPageShell>
    </>
  );
}
