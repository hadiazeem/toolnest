'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ } from '@/types';
import { cn } from '@/lib/utils';

interface FAQItemProps {
  faq: FAQ;
  index: number;
}

function FAQItem({ faq, index }: FAQItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
        aria-expanded={open}
      >
        <span className="font-semibold text-slate-900 dark:text-white pr-4">{faq.question}</span>
        <ChevronDown className={cn('w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="px-5 pb-5 bg-slate-50 dark:bg-slate-800/30">
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed pt-3 border-t border-slate-200 dark:border-slate-700">
            {faq.answer}
          </p>
        </div>
      )}
    </div>
  );
}

interface FAQSectionProps {
  faqs: FAQ[];
  title?: string;
}

export function FAQSection({ faqs, title = 'Frequently Asked Questions' }: FAQSectionProps) {
  return (
    <section className="py-16">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="section-title text-center mb-3">{title}</h2>
        <p className="section-subtitle text-center mb-10">
          Everything you need to know.
        </p>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
