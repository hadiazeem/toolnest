import { Metadata } from 'next';
import { ImageCompressorTool } from '@/components/tools/ImageCompressorTool';
import { ToolPageShell } from '@/components/tools/ToolPageShell';

export const metadata: Metadata = {
  title: 'Image Compressor — Compress JPG, PNG Online Free',
  description:
    'Compress images online for free without losing quality. Reduce JPG, PNG and WebP file size instantly in your browser. No sign-up needed.',
  alternates: { canonical: 'https://toolnest.app/tools/image-compressor' },
  openGraph: {
    title: 'Free Image Compressor | ToolNest',
    description: 'Reduce image file size without losing quality. Fast, free and private.',
    url: 'https://toolnest.app/tools/image-compressor',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

const steps = [
  { title: 'Upload your image', description: 'Select or drag and drop the JPG, PNG, or WebP image you want to compress.' },
  { title: 'Adjust compression quality', description: 'Use the slider to balance file size against visual quality.' },
  { title: 'Compress and download', description: 'Click compress, then download your optimized image instantly.' },
];

const benefits = [
  { title: 'Smart Compression', description: 'Advanced algorithms reduce file size while preserving visual quality.' },
  { title: 'Faster Websites', description: 'Smaller images mean faster page loads and better Core Web Vitals scores.' },
  { title: 'Save Storage Space', description: 'Compress photos before backing them up to save valuable storage space.' },
  { title: 'Browser-Based Privacy', description: 'Your images are compressed locally — nothing is uploaded to external servers.' },
];

const faqs = [
  { question: 'How much can I reduce my image size?', answer: 'Depending on the original image and your quality setting, you can typically reduce file size by 50-90% with minimal visible quality loss.' },
  { question: 'Will compression reduce image quality?', answer: 'Our compressor uses smart quality settings to minimize visible quality loss. You can adjust the slider to find your ideal balance.' },
  { question: 'What formats can I compress?', answer: 'JPG, PNG and WebP images are all supported, with output matching your original format.' },
  { question: 'Is there a file size limit?', answer: 'You can compress images up to 50MB in size.' },
];

export default function ImageCompressorPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Image Compressor - ToolNest',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.7', ratingCount: '3192' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ToolPageShell
        toolId="image-compressor"
        toolName="Image Compressor"
        heading="Free Online Image Compressor"
        intro="Reduce your image file size without sacrificing quality — fast, free, and processed right in your browser."
        steps={steps}
        benefits={benefits}
        faqs={faqs}
      >
        <ImageCompressorTool />
      </ToolPageShell>
    </>
  );
}
