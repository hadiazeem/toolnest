import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with the ToolNest team. Questions, feedback or partnership inquiries — we usually reply within 24-48 hours.',
  alternates: { canonical: 'https://toolnest.app/contact' },
  openGraph: {
    title: 'Contact ToolNest',
    description: 'Get in touch with the ToolNest team.',
    url: 'https://toolnest.app/contact',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
