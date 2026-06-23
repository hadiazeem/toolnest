import { Metadata } from 'next';
import { Target, Users, Zap, Heart } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about ToolNest\'s mission to provide free, fast and powerful online tools for images and PDFs to everyone, everywhere.',
  alternates: { canonical: 'https://toolnest.app/about' },
  openGraph: {
    title: 'About ToolNest',
    description: 'Learn about our mission to provide free, fast and powerful online tools.',
    url: 'https://toolnest.app/about',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

const VALUES = [
  { icon: Zap, title: 'Speed First', description: 'Every tool is built to deliver results in seconds, not minutes.' },
  { icon: Heart, title: 'Free Forever', description: 'We believe essential tools should be accessible to everyone, with no cost barriers.' },
  { icon: Target, title: 'Privacy by Design', description: 'Your files are processed securely and never stored longer than necessary.' },
  { icon: Users, title: 'Built for Everyone', description: 'From students to professionals, our tools are designed to be simple and intuitive.' },
];

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'About Us' }]} />
      <PageHero
        eyebrow="Our Story"
        title="Tools That Just Work"
        description="ToolNest was built on a simple idea: everyone deserves access to fast, reliable, free tools — without sign-ups, subscriptions, or hidden fees."
      />

      <div className="prose-content max-w-3xl mx-auto mb-16">
        <div className="glass-card p-8 sm:p-10 mb-10">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Our Mission</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            We started ToolNest because we were tired of clunky software, paywalls, and tools
            that demanded an account just to resize a single image. The internet is full of
            powerful technology — we wanted to make a small slice of it genuinely free and
            accessible to anyone with a browser.
          </p>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Today, ToolNest offers 10 carefully built tools spanning image editing, PDF
            management, and everyday utilities like QR codes and password generation. Every tool
            is designed with the same philosophy: do one thing, do it well, and do it fast.
          </p>
        </div>

        <div className="glass-card p-8 sm:p-10">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">How We Work</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Most of our tools run entirely in your browser, meaning your files never touch our
            servers. For the few tools that require server-side processing, we delete uploaded
            files immediately after the job is done. We don't sell your data, and we never will.
          </p>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="section-title text-center mb-10">What We Stand For</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((value) => {
            const Icon = value.icon;
            return (
              <div key={value.title} className="glass-card p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{value.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
