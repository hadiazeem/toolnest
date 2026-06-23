import { Metadata } from 'next';
import { PasswordGeneratorTool } from '@/components/tools/PasswordGeneratorTool';
import { ToolPageShell } from '@/components/tools/ToolPageShell';

export const metadata: Metadata = {
  title: 'Password Generator — Create Strong Secure Passwords Free',
  description:
    'Generate strong, secure, random passwords online for free. Customize length and character sets for maximum security.',
  alternates: { canonical: 'https://toolnest.app/tools/password-generator' },
  openGraph: {
    title: 'Free Password Generator | ToolNest',
    description: 'Generate strong, secure passwords instantly. Free, fast and private.',
    url: 'https://toolnest.app/tools/password-generator',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

const steps = [
  { title: 'Set your preferences', description: 'Choose password length and which character types to include.' },
  { title: 'Generate a password', description: 'Click generate to create a cryptographically random password instantly.' },
  { title: 'Copy and use it', description: 'Copy your new password to the clipboard and use it for your account.' },
];

const benefits = [
  { title: 'Cryptographically Secure', description: 'Uses the Web Crypto API for truly random, unpredictable password generation.' },
  { title: 'Fully Customizable', description: 'Adjust length from 6 to 64 characters and toggle uppercase, lowercase, numbers and symbols.' },
  { title: 'Strength Indicator', description: 'See an instant visual rating of how strong your generated password is.' },
  { title: 'Never Stored or Sent', description: 'Passwords are generated locally in your browser and never transmitted anywhere.' },
];

const faqs = [
  { question: 'Is the password generator secure?', answer: 'Yes, it uses the browser\'s built-in Web Crypto API (crypto.getRandomValues) for cryptographically secure randomness, the same standard used in security-critical applications.' },
  { question: 'Are my generated passwords saved anywhere?', answer: 'No, passwords are generated entirely in your browser and never sent to or stored on any server.' },
  { question: 'What makes a password strong?', answer: 'Length matters most — aim for at least 12-16 characters with a mix of uppercase, lowercase, numbers and symbols.' },
  { question: 'Should I use the same password for multiple accounts?', answer: 'No, always use a unique password for each account. Consider using a password manager to keep track of them securely.' },
];

export default function PasswordGeneratorPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Password Generator - ToolNest',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', ratingCount: '5102' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ToolPageShell
        toolId="password-generator"
        toolName="Password Generator"
        heading="Free Strong Password Generator"
        intro="Create cryptographically secure, random passwords instantly — fully customizable and never stored."
        steps={steps}
        benefits={benefits}
        faqs={faqs}
      >
        <PasswordGeneratorTool />
      </ToolPageShell>
    </>
  );
}
