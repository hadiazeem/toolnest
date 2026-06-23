import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Tools — Free Image & PDF Tools',
  description:
    'Browse all 10 free ToolNest tools: background remover, image compressor, PDF merger, QR code generator, password generator and more.',
  alternates: { canonical: 'https://toolnest.app/all-tools' },
  openGraph: {
    title: 'All Tools — Free Image & PDF Tools | ToolNest',
    description:
      'Browse all 10 free ToolNest tools for images and PDFs. No sign-up, no limits.',
    url: 'https://toolnest.app/all-tools',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

export default function AllToolsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
