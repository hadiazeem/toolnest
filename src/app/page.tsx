import { Hero } from '@/components/home/Hero';
import { CategorySections } from '@/components/home/CategorySections';
import { FeatureStrip } from '@/components/home/FeatureStrip';
import { Testimonials } from '@/components/home/Testimonials';
import { FAQSection } from '@/components/ui/FAQSection';
import { CTASection } from '@/components/home/CTASection';
import { HeaderAd, InContentAd } from '@/components/ui/AdSense';
import { HOME_FAQS } from '@/lib/data';

export default function HomePage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ToolNest',
    url: 'https://toolnest.app',
    description:
      'Free online tools for images and PDFs. Remove backgrounds, compress files, merge PDFs, generate QR codes and more.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://toolnest.app/all-tools?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ToolNest',
    url: 'https://toolnest.app',
    logo: 'https://toolnest.app/logo.png',
    sameAs: [
      'https://twitter.com/toolnest',
      'https://github.com/toolnest',
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />

      <div className="max-w-7xl mx-auto px-4 pt-4">
        <HeaderAd />
      </div>

      <Hero />
      <FeatureStrip />
      <CategorySections />

      <div className="max-w-4xl mx-auto px-4">
        <InContentAd />
      </div>

      <Testimonials />
      <FAQSection faqs={HOME_FAQS} />
      <CTASection />
    </>
  );
}
