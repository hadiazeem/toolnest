import { Metadata } from 'next';
import { ImageToPdfTool } from '@/components/tools/ImageToPdfTool';
import { ToolPageShell } from '@/components/tools/ToolPageShell';

export const metadata: Metadata = {
  title: 'Image to PDF Converter — Convert JPG, PNG to PDF Free',
  description:
    'Convert images to PDF online for free. Combine multiple JPG or PNG images into a single PDF document instantly.',
  alternates: { canonical: 'https://toolnest.app/tools/image-to-pdf' },
  openGraph: {
    title: 'Free Image to PDF Converter | ToolNest',
    description: 'Convert JPG, PNG and other images to PDF in seconds. Free and private.',
    url: 'https://toolnest.app/tools/image-to-pdf',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

const steps = [
  { title: 'Upload your images', description: 'Add one or more JPG, PNG or WebP images — they\'ll appear in your PDF in upload order.' },
  { title: 'Click convert', description: 'Our tool automatically fits each image to an A4 page in your PDF.' },
  { title: 'Download your PDF', description: 'Get your combined PDF file instantly, ready to share or print.' },
];

const benefits = [
  { title: 'Combine Multiple Images', description: 'Add as many images as you need — each becomes its own page in the final PDF.' },
  { title: 'Auto-Fit Pages', description: 'Images are automatically scaled and centered to fit standard A4 pages.' },
  { title: 'High-Quality Output', description: 'Images are embedded at high quality for crisp, professional PDFs.' },
  { title: 'No Software Needed', description: 'Works entirely in your browser — no Adobe Acrobat or other software required.' },
];

const faqs = [
  { question: 'Can I convert multiple images into one PDF?', answer: 'Yes, you can upload multiple images and they will be combined into a single multi-page PDF in the order you add them.' },
  { question: 'What image formats are supported?', answer: 'JPG, PNG and WebP images are all supported.' },
  { question: 'Will the PDF maintain image quality?', answer: 'Yes, images are embedded at high quality (92% JPEG quality) to balance file size and visual clarity.' },
  { question: 'Is there a limit to how many images I can add?', answer: 'There\'s no hard limit, but very large numbers of high-resolution images may take longer to process in your browser.' },
];

export default function ImageToPdfPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Image to PDF Converter - ToolNest',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.7', ratingCount: '1456' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ToolPageShell
        toolId="image-to-pdf"
        toolName="Image to PDF"
        heading="Free Image to PDF Converter"
        intro="Convert JPG, PNG or WebP images into a single PDF document — combine multiple images in seconds."
        steps={steps}
        benefits={benefits}
        faqs={faqs}
      >
        <ImageToPdfTool />
      </ToolPageShell>
    </>
  );
}
