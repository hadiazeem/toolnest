import { Metadata } from 'next';
import { BackgroundRemoverTool } from '@/components/tools/BackgroundRemoverTool';
import { ToolPageShell } from '@/components/tools/ToolPageShell';

export const metadata: Metadata = {
  title: 'Background Remover — Remove Image Background Free Online',
  description:
    'Remove image backgrounds instantly with AI. Free online background remover — no sign-up, no watermark. Works with JPG, PNG and WebP.',
  alternates: { canonical: 'https://toolnest.app/tools/background-remover' },
  openGraph: {
    title: 'Free AI Background Remover | ToolNest',
    description: 'Remove image backgrounds instantly with AI precision. 100% free, no sign-up required.',
    url: 'https://toolnest.app/tools/background-remover',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Background Remover | ToolNest',
    description: 'Remove image backgrounds instantly with AI precision.',
  },
};

const steps = [
  { title: 'Upload your image', description: 'Click the upload area or drag and drop a JPG, PNG or WebP image (up to 20MB).' },
  { title: 'AI removes the background', description: 'Our AI model analyzes the image and automatically separates the subject from the background.' },
  { title: 'Download your result', description: 'Download your transparent PNG image instantly, ready to use anywhere.' },
];

const benefits = [
  { title: 'AI-Powered Precision', description: 'Advanced machine learning model detects edges and hair details with high accuracy.' },
  { title: 'No Watermarks', description: 'Get clean, professional results with absolutely no watermark on your downloaded image.' },
  { title: 'Runs in Your Browser', description: 'Processing happens locally for privacy — your images are never uploaded to a server.' },
  { title: 'Free Forever', description: 'No subscriptions, no credit limits, no hidden costs. Use it as many times as you need.' },
];

const faqs = [
  { question: 'Is the background remover really free?', answer: 'Yes, completely free with no limits on the number of images you can process.' },
  { question: 'What image formats are supported?', answer: 'You can upload JPG, PNG, and WebP images. The output is always a transparent PNG.' },
  { question: 'Does it work on photos with complex backgrounds?', answer: 'Yes, our AI model is trained to handle complex backgrounds, including hair, fur, and fine details, though results may vary depending on contrast and image quality.' },
  { question: 'Is my image uploaded to a server?', answer: 'No. The background removal model runs directly in your browser using WebAssembly, so your images never leave your device.' },
  { question: 'Can I use the result for commercial purposes?', answer: 'Yes, you retain full rights to your processed images and can use them for personal or commercial projects.' },
];

export default function BackgroundRemoverPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Background Remover - ToolNest',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', ratingCount: '2847' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ToolPageShell
        toolId="background-remover"
        toolName="Background Remover"
        heading="Free AI Background Remover"
        intro="Remove the background from any image in seconds using AI — completely free, no sign-up, no watermark."
        steps={steps}
        benefits={benefits}
        faqs={faqs}
      >
        <BackgroundRemoverTool />
      </ToolPageShell>
    </>
  );
}
