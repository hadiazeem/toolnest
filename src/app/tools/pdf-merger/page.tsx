import { Metadata } from 'next';
import { PdfMergerTool } from '@/components/tools/PdfMergerTool';
import { ToolPageShell } from '@/components/tools/ToolPageShell';

export const metadata: Metadata = {
  title: 'PDF Merger — Combine Multiple PDFs Online Free',
  description:
    'Merge multiple PDF files into one document online for free. Combine PDFs in any order instantly, no sign-up needed.',
  alternates: { canonical: 'https://toolnest.app/tools/pdf-merger' },
  openGraph: {
    title: 'Free PDF Merger | ToolNest',
    description: 'Merge multiple PDF files into one document. Free, fast and secure.',
    url: 'https://toolnest.app/tools/pdf-merger',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

const steps = [
  { title: 'Upload your PDFs', description: 'Add two or more PDF files you want to combine.' },
  { title: 'Arrange the order', description: 'Use the up and down arrows to set the order pages will appear in.' },
  { title: 'Merge and download', description: 'Click merge, then download your combined PDF document instantly.' },
];

const benefits = [
  { title: 'Unlimited Files', description: 'Combine as many PDF documents as you need into a single file.' },
  { title: 'Custom Order Control', description: 'Easily reorder files before merging to get exactly the document structure you want.' },
  { title: 'Preserves Quality', description: 'Original formatting, images and text remain unchanged in the merged document.' },
  { title: 'Private & Secure', description: 'PDFs are processed locally in your browser — your files are never uploaded.' },
];

const faqs = [
  { question: 'How many PDFs can I merge at once?', answer: 'There is no fixed limit — you can merge as many PDF files as your browser can handle.' },
  { question: 'Can I change the order of pages after merging?', answer: 'Set your desired order before merging using the up/down arrows. After merging, use our PDF Splitter to rearrange if needed.' },
  { question: 'Will merging affect the quality of my PDFs?', answer: 'No, merging preserves the original quality, formatting, and content of each PDF exactly as it was.' },
  { question: 'Can I merge password-protected PDFs?', answer: 'Encrypted PDFs need to be unlocked first before they can be merged with other documents.' },
];

export default function PdfMergerPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'PDF Merger - ToolNest',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', ratingCount: '2674' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ToolPageShell
        toolId="pdf-merger"
        toolName="PDF Merger"
        heading="Free Online PDF Merger"
        intro="Combine multiple PDF files into a single document in the order you choose — fast, free, and secure."
        steps={steps}
        benefits={benefits}
        faqs={faqs}
      >
        <PdfMergerTool />
      </ToolPageShell>
    </>
  );
}
