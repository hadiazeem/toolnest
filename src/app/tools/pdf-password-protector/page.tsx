import { Metadata } from 'next';
import { PdfPasswordProtectorTool } from '@/components/tools/PdfPasswordProtectorTool';
import { ToolPageShell } from '@/components/tools/ToolPageShell';

export const metadata: Metadata = {
  title: 'PDF Password Protector — Add Password to PDF Free',
  description:
    'Add a password to your PDF documents online for free. Secure your sensitive files with encryption.',
  alternates: { canonical: 'https://toolnest.app/tools/pdf-password-protector' },
  openGraph: {
    title: 'Free PDF Password Protector | ToolNest',
    description: 'Add a password to your PDF documents. Secure and easy to use.',
    url: 'https://toolnest.app/tools/pdf-password-protector',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

const steps = [
  { title: 'Upload your PDF', description: 'Select or drag and drop the PDF file you want to protect.' },
  { title: 'Set a password', description: 'Enter and confirm a strong password to lock your document.' },
  { title: 'Download the protected file', description: 'Download your password-protected PDF, ready to share securely.' },
];

const benefits = [
  { title: 'Strong Protection', description: 'Restrict access to sensitive documents with password encryption.' },
  { title: 'Simple Setup', description: 'Just upload, set a password, and download — no technical knowledge needed.' },
  { title: 'Share With Confidence', description: 'Send confidential files knowing only people with the password can open them.' },
  { title: 'No Sign-up Needed', description: 'Protect your documents instantly without creating an account.' },
];

const faqs = [
  { question: 'How strong should my password be?', answer: 'Use at least 8-12 characters with a mix of uppercase, lowercase, numbers and symbols for the strongest protection. Our Password Generator tool can help create one.' },
  { question: 'Can I remove the password later?', answer: 'Yes, you can use any standard PDF reader with the correct password to open and re-save the file without protection.' },
  { question: 'What encryption standard is used?', answer: 'Password protection follows the standard PDF encryption specification, compatible with all major PDF readers.' },
  { question: 'Will I forget my own password?', answer: 'Make sure to store your password securely — if lost, the protected PDF cannot be recovered.' },
];

export default function PdfPasswordProtectorPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'PDF Password Protector - ToolNest',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.5', ratingCount: '987' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ToolPageShell
        toolId="pdf-password-protector"
        toolName="PDF Password Protector"
        heading="Free PDF Password Protector"
        intro="Add a password to your PDF documents to keep sensitive information secure — free and easy to use."
        steps={steps}
        benefits={benefits}
        faqs={faqs}
      >
        <PdfPasswordProtectorTool />
      </ToolPageShell>
    </>
  );
}
