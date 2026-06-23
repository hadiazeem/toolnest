import { Metadata } from 'next';
import { PdfCompressorTool } from '@/components/tools/PdfCompressorTool';
import { ToolPageShell } from '@/components/tools/ToolPageShell';

export const metadata: Metadata = {
  title: 'PDF Compressor — Reduce PDF File Size Online Free',
  description:
    'Compress PDF files online for free. Reduce PDF file size for easier sharing and storage without losing important content.',
  alternates: { canonical: 'https://toolnest.app/tools/pdf-compressor' },
  openGraph: {
    title: 'Free PDF Compressor | ToolNest',
    description: 'Compress PDF files to reduce their size. Fast, free and secure.',
    url: 'https://toolnest.app/tools/pdf-compressor',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

const steps = [
  { title: 'Upload your PDF', description: 'Select or drag and drop the PDF file you want to compress.' },
  { title: 'Click compress', description: 'Our tool optimizes the PDF structure to reduce file size.' },
  { title: 'Download the result', description: 'Get your compressed PDF instantly, ready to email or upload.' },
];

const benefits = [
  { title: 'Easier Email Sharing', description: 'Get under email attachment size limits without sacrificing your document.' },
  { title: 'Faster Uploads', description: 'Smaller PDFs upload faster to cloud storage and web forms.' },
  { title: 'Save Storage Space', description: 'Reduce your overall file storage footprint across devices.' },
  { title: 'Secure Processing', description: 'Your PDF is processed securely and never permanently stored on our servers.' },
];

const faqs = [
  { question: 'How much can I compress my PDF?', answer: 'Results vary by document. PDFs with large embedded images typically compress significantly; text-only PDFs see smaller reductions.' },
  { question: 'Will compression affect document quality?', answer: 'Our compression optimizes the PDF structure without altering text or image content quality.' },
  { question: 'Can I compress password-protected PDFs?', answer: 'Currently, encrypted PDFs need to be unlocked before compression. Use our PDF Password Protector tool to manage PDF security separately.' },
  { question: 'Is there a file size limit?', answer: 'You can compress PDF files up to 100MB.' },
];

export default function PdfCompressorPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'PDF Compressor - ToolNest',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.6', ratingCount: '2105' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ToolPageShell
        toolId="pdf-compressor"
        toolName="PDF Compressor"
        heading="Free Online PDF Compressor"
        intro="Reduce your PDF file size for faster sharing and easier storage — fast, free, and secure."
        steps={steps}
        benefits={benefits}
        faqs={faqs}
      >
        <PdfCompressorTool />
      </ToolPageShell>
    </>
  );
}
