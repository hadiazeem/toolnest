import { Metadata } from 'next';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { PageHero } from '@/components/ui/PageHero';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Read ToolNest\'s privacy policy to understand how we collect, use, and protect your information when you use our free online tools.',
  alternates: { canonical: 'https://toolnest.app/privacy-policy' },
  openGraph: {
    title: 'Privacy Policy | ToolNest',
    description: 'How ToolNest collects, uses, and protects your information.',
    url: 'https://toolnest.app/privacy-policy',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

const LAST_UPDATED = 'June 20, 2026';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Privacy Policy' }]} />
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description={`Last updated: ${LAST_UPDATED}`}
      />

      <div className="glass-card p-8 sm:p-10 space-y-8 text-slate-600 dark:text-slate-400 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">1. Introduction</h2>
          <p>
            ToolNest ("we," "us," or "our") operates the website toolnest.app (the "Service").
            This Privacy Policy explains how we collect, use, disclose, and safeguard your
            information when you use our free online tools for images and PDFs. By using
            ToolNest, you agree to the practices described in this policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">2. Information We Collect</h2>
          <p className="mb-3">We collect minimal information to operate and improve our Service:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-slate-700 dark:text-slate-300">Files you upload:</strong> Most ToolNest
              tools (image and PDF processing) run entirely in your browser using client-side
              JavaScript. These files are never transmitted to or stored on our servers. For any
              tool that does require server processing, uploaded files are automatically and
              permanently deleted within a short period after processing completes.
            </li>
            <li>
              <strong className="text-slate-700 dark:text-slate-300">Usage data:</strong> We may collect
              anonymized analytics data such as pages visited, browser type, device type, and
              general location (country/region) to understand how our Service is used and to
              improve it.
            </li>
            <li>
              <strong className="text-slate-700 dark:text-slate-300">Contact form data:</strong> If you
              contact us via our Contact page, we collect your name, email address, and message
              content solely to respond to your inquiry.
            </li>
            <li>
              <strong className="text-slate-700 dark:text-slate-300">Cookies:</strong> We use cookies and
              similar technologies to remember your theme preference (light/dark mode) and, where
              applicable, to serve advertisements through Google AdSense.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">3. How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide, operate, and maintain our tools and Service</li>
            <li>To improve, personalize, and expand our Service</li>
            <li>To understand and analyze how you use our Service</li>
            <li>To respond to your comments, questions, and support requests</li>
            <li>To detect and prevent technical issues, fraud, or abuse</li>
            <li>To serve relevant advertising through Google AdSense (where enabled)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">4. File Processing &amp; Data Retention</h2>
          <p>
            We take file privacy seriously. The majority of our tools — including the Image
            Compressor, Image Resizer, Image to PDF, PDF Merger, PDF Splitter, QR Code Generator,
            and Password Generator — process your files entirely within your own browser using
            client-side technology. Your files never leave your device for these tools. Tools
            that may involve temporary server-side processing delete all uploaded and generated
            files automatically and do not retain copies beyond what is operationally necessary.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">5. Third-Party Services</h2>
          <p className="mb-3">We may use third-party services that collect information used to identify you:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-slate-700 dark:text-slate-300">Google AdSense:</strong> We may display
              ads served by Google, which uses cookies to serve ads based on your prior visits to
              this and other websites. You can opt out of personalized advertising by visiting{' '}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                Google Ads Settings
              </a>.
            </li>
            <li>
              <strong className="text-slate-700 dark:text-slate-300">Analytics providers:</strong> We may use
              services like Google Analytics to understand usage patterns. These services may set
              their own cookies.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">6. Children's Privacy</h2>
          <p>
            Our Service is not directed to children under the age of 13. We do not knowingly
            collect personal information from children under 13. If you believe we have
            inadvertently collected such information, please contact us so we can delete it.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">7. Your Rights</h2>
          <p>
            Depending on your location, you may have rights regarding your personal information,
            including the right to access, correct, delete, or restrict processing of your data.
            To exercise these rights, please contact us using the details below.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any
            changes by posting the new policy on this page and updating the "Last updated" date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">9. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at{' '}
            <a href="mailto:hadiazeem694@gmail.com" className="text-primary-600 hover:underline">
              hadiazeem694@gmail.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
