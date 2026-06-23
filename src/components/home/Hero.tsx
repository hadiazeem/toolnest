'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { TOOLS } from '@/lib/data';

export function Hero() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const suggestions =
    query.length > 0
      ? TOOLS.filter((t) => t.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
      : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (suggestions[0]) router.push(suggestions[0].href);
    else router.push('/all-tools');
  };

  return (
    <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28">
      {/* Background glows */}
      <div className="hero-glow w-96 h-96 bg-primary-400/25 top-[-120px] left-[-100px]" aria-hidden="true" />
      <div className="hero-glow w-96 h-96 bg-secondary-400/25 top-[-60px] right-[-100px]" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,theme(colors.slate.200)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,theme(colors.slate.800)_1px,transparent_0)] [background-size:32px_32px] opacity-30" aria-hidden="true" />

      <div className="relative max-w-5xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            10 Free Tools · No Sign-up Required
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white text-balance mb-6 animate-slide-up">
          Fast, Free & Powerful
          <br />
          <span className="gradient-text">Online Tools</span> for Everyone
        </h1>

        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Remove backgrounds, compress images, merge PDFs, generate QR codes and more — 
          all in your browser. No installs, no limits, completely free.
        </p>

        {/* Search */}
        <form onSubmit={handleSubmit} className="relative max-w-xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a tool... (e.g. compress image)"
              className="w-full pl-12 pr-32 py-4 rounded-2xl glass-card text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary py-2.5 px-5 text-sm">
              Search
            </button>
          </div>

          {suggestions.length > 0 && (
            <div className="absolute top-full mt-2 left-0 right-0 glass-card overflow-hidden text-left z-20 animate-in">
              {suggestions.map((tool) => (
                <Link
                  key={tool.id}
                  href={tool.href}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-primary-50 dark:hover:bg-primary-950/30 transition-colors"
                >
                  <span className="text-xl">{tool.icon}</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">{tool.name}</span>
                </Link>
              ))}
            </div>
          )}
        </form>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link href="/all-tools" className="btn-primary">
            Explore All Tools <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/tools/background-remover" className="btn-secondary">
            Try Background Remover
          </Link>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary-600" />
            <span>100% Private &amp; Secure</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary-600" />
            <span>No Sign-up Needed</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary-600" />
            <span>Always Free</span>
          </div>
        </div>
      </div>
    </section>
  );
}
