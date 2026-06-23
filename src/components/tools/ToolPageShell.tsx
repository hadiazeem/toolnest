import { ReactNode } from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { FAQSection } from '@/components/ui/FAQSection';
import { HeaderAd, InContentAd, SidebarAd } from '@/components/ui/AdSense';
import { RelatedTools } from '@/components/tools/RelatedTools';
import { FAQ } from '@/types';

interface Step {
  title: string;
  description: string;
}

interface Benefit {
  title: string;
  description: string;
}

interface ToolPageShellProps {
  toolId: string;
  toolName: string;
  heading: string;
  intro: string;
  children: ReactNode; // the tool interface
  steps: Step[];
  benefits: Benefit[];
  faqs: FAQ[];
}

export function ToolPageShell({
  toolId,
  toolName,
  heading,
  intro,
  children,
  steps,
  benefits,
  faqs,
}: ToolPageShellProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'All Tools', href: '/all-tools' }, { label: toolName }]} />
      <HeaderAd />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 mt-8">
        {/* Main column */}
        <div>
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 text-balance">
              {heading}
            </h1>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              {intro}
            </p>
          </div>

          {/* Tool Interface */}
          <div className="mb-12">{children}</div>

          <InContentAd />

          {/* How to use */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              How to Use the {toolName}
            </h2>
            <div className="space-y-4">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{step.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Benefits */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Why Use ToolNest's {toolName}?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, i) => (
                <div key={i} className="glass-card p-5">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-1.5">{benefit.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </section>

          <RelatedTools currentId={toolId} />
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-6">
            <SidebarAd />
            <div className="glass-card p-5">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Trust & Privacy</h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 mt-0.5">✓</span> Files processed securely
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 mt-0.5">✓</span> Nothing stored on our servers
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 mt-0.5">✓</span> 100% free, no sign-up
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </div>

      <FAQSection faqs={faqs} title={`${toolName} FAQs`} />
    </div>
  );
}
