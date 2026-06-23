import { Metadata } from 'next';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { PageHero } from '@/components/ui/PageHero';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description:
    'Read ToolNest\'s terms and conditions of use, including acceptable use policy, disclaimers, and limitation of liability.',
  alternates: { canonical: 'https://toolnest.app/terms' },
  openGraph: {
    title: 'Terms & Conditions | ToolNest',
    description: 'ToolNest\'s terms and conditions of use.',
    url: 'https://toolnest.app/terms',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

const LAST_UPDATED = 'June 20, 2026';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Terms & Conditions' }]} />
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        description={`Last updated: ${LAST_UPDATED}`}
      />

      <div className="glass-card p-8 sm:p-10 space-y-8 text-slate-600 dark:text-slate-400 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing or using ToolNest ("the Service," "we," "us," "our"), you agree to be
            bound by these Terms &amp; Conditions. If you do not agree to these terms, please do
            not use the Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">2. Description of Service</h2>
          <p>
            ToolNest provides free online tools for image and PDF processing, including but not
            limited to background removal, image compression, image resizing, image-to-PDF
            conversion, PDF compression, PDF merging, PDF splitting, PDF password protection, QR
            code generation, and password generation. We reserve the right to modify, suspend, or
            discontinue any part of the Service at any time without prior notice.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">3. Acceptable Use</h2>
          <p className="mb-3">You agree not to use ToolNest to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Upload, process, or distribute any content that is illegal, harmful, threatening, abusive, or infringing on the rights of others</li>
            <li>Violate any applicable local, national, or international law or regulation</li>
            <li>Attempt to gain unauthorized access to our systems, servers, or networks</li>
            <li>Interfere with or disrupt the integrity or performance of the Service</li>
            <li>Use automated systems (bots, scrapers) to access the Service in a manner that sends more requests than a human could reasonably produce</li>
            <li>Process copyrighted material without proper authorization</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">4. User Content &amp; File Ownership</h2>
          <p>
            You retain all ownership rights to any files, images, or documents you upload or
            process using ToolNest. We do not claim any ownership over your content. You are
            solely responsible for ensuring you have the necessary rights to upload and process
            any content through our Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">5. No Warranty</h2>
          <p>
            The Service is provided "as is" and "as available" without warranties of any kind,
            either express or implied, including but not limited to implied warranties of
            merchantability, fitness for a particular purpose, or non-infringement. We do not
            guarantee that the Service will be uninterrupted, error-free, or completely secure.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">6. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, ToolNest and its operators shall not be liable
            for any indirect, incidental, special, consequential, or punitive damages, including
            but not limited to loss of data, loss of profits, or business interruption, arising
            from your use of or inability to use the Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">7. Third-Party Advertising</h2>
          <p>
            ToolNest may display advertisements served by third parties, including Google
            AdSense. We are not responsible for the content of any third-party advertisements or
            for any products or services advertised through them.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">8. Intellectual Property</h2>
          <p>
            The ToolNest name, logo, design, and underlying technology are the property of
            ToolNest and are protected by applicable intellectual property laws. You may not copy,
            modify, distribute, or create derivative works based on our Service without express
            written permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">9. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Continued use of the Service
            after changes are posted constitutes acceptance of the revised Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">10. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with applicable laws,
            without regard to conflict of law principles.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">11. Contact Us</h2>
          <p>
            If you have any questions about these Terms &amp; Conditions, please contact us at{' '}
            <a href="mailto:hadiazeem694@gmail.com" className="text-primary-600 hover:underline">
              hadiazeem694@gmail.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
