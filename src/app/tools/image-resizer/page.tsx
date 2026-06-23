import { Metadata } from 'next';
import { ImageResizerTool } from '@/components/tools/ImageResizerTool';
import { ToolPageShell } from '@/components/tools/ToolPageShell';

export const metadata: Metadata = {
  title: 'Image Resizer — Resize Images Online Free',
  description:
    'Resize images to any dimension online for free. Perfect for social media, websites and print. No sign-up required.',
  alternates: { canonical: 'https://toolnest.app/tools/image-resizer' },
  openGraph: {
    title: 'Free Image Resizer | ToolNest',
    description: 'Resize images to any dimension in seconds. Free, fast, and private.',
    url: 'https://toolnest.app/tools/image-resizer',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

const steps = [
  { title: 'Upload your image', description: 'Select or drag and drop the image you want to resize.' },
  { title: 'Set new dimensions', description: 'Enter custom width and height, or pick a social media preset.' },
  { title: 'Resize and download', description: 'Click resize, then download your perfectly sized image.' },
];

const benefits = [
  { title: 'Social Media Presets', description: 'Quickly resize for Instagram, Facebook, YouTube and Twitter with one click.' },
  { title: 'Aspect Ratio Lock', description: 'Maintain proportions automatically to avoid distorted images.' },
  { title: 'No Quality Loss', description: 'Uses high-quality canvas rendering to preserve image clarity.' },
  { title: 'Instant Results', description: 'Resizing happens instantly in your browser — no waiting, no uploads.' },
];

const faqs = [
  { question: 'Can I resize without losing image quality?', answer: 'Yes, our resizer uses high-quality rendering algorithms to minimize quality loss, especially when scaling down.' },
  { question: 'What social media sizes are available?', answer: 'We include presets for Instagram posts, Facebook covers, YouTube thumbnails and Twitter headers, with more available via custom dimensions.' },
  { question: 'Can I resize multiple images at once?', answer: 'Currently the resizer processes one image at a time for maximum quality control.' },
  { question: 'Does resizing change the file format?', answer: 'No, the output keeps your original image format (JPG, PNG, or WebP).' },
];

export default function ImageResizerPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Image Resizer - ToolNest',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.6', ratingCount: '1893' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ToolPageShell
        toolId="image-resizer"
        toolName="Image Resizer"
        heading="Free Online Image Resizer"
        intro="Resize any image to exact pixel dimensions or popular social media presets — instantly and for free."
        steps={steps}
        benefits={benefits}
        faqs={faqs}
      >
        <ImageResizerTool />
      </ToolPageShell>
    </>
  );
}
