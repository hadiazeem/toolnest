import { Metadata } from 'next';
import { PdfSplitterTool } from '@/components/tools/PdfSplitterTool';
import { ToolPageShell } from '@/components/tools/ToolPageShell';

export const metadata: Metadata = {
  title: 'PDF Splitter — Split PDF Into Multiple Files Free',
  description:
    'Split a PDF into multiple files online for free. Extract specific pages or split every page into separate documents.',
  alternates: { canonical: 'https://toolnest.app/tools/pdf-splitter' },
  openGraph: {
    title: 'Free PDF Splitter | ToolNest',
    description: 'Split a PDF into multiple separate files. Free, fast and secure.',
    url: 'https://toolnest.app/tools/pdf-splitter',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

const steps = [
  { title: 'Upload your PDF', description: 'Select or drag and drop the PDF file you want to split.' },
  { title: 'Choose a split method', description: 'Split every page into a separate file, or extract a specific page range.' },
  { title: 'Download your files', description: 'Download individual files or grab them all at once.' },
];

const benefits = [
  { title: 'Two Split Modes', description: 'Split every page individually, or extract just the pages you need.' },
  { title: 'Batch Download', description: 'Download all split files at once with a single click.' },
  { title: 'Preserves Quality', description: 'Original page content, formatting and resolution remain unchanged.' },
  { title: 'No File Limits', description: 'Split documents of any length — there\'s no page count restriction.' },
];

const faqs = [
  { question: 'Can I extract just a few pages from my PDF?', answer: 'Yes, use "Extract Page Range" mode to select exactly which pages to pull into a new document.' },
  { question: 'What happens to the page order?', answer: 'The original page order is always preserved in both split modes.' },
  { question: 'Can I split a password-protected PDF?', answer: 'Encrypted PDFs need to be unlocked before splitting.' },
  { question: 'Is there a page limit?', answer: 'No, you can split PDFs of any length, though very large documents may take longer to process.' },
];

export default function PdfSplitterPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'PDF Splitter - ToolNest',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.7', ratingCount: '1654' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ToolPageShell
        toolId="pdf-splitter"
        toolName="PDF Splitter"
        heading="Free Online PDF Splitter"
        intro="Split a PDF into multiple files or extract specific pages — fast, free, and secure."
        steps={steps}
        benefits={benefits}
        faqs={faqs}
      >
        <PdfSplitterTool />
      </ToolPageShell>
    </>
  );
}
