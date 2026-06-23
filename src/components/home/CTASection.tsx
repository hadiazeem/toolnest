import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 to-secondary-600 px-6 py-16 sm:px-16 text-center">
          <div className="hero-glow w-64 h-64 bg-white/10 top-[-100px] left-[-60px]" aria-hidden="true" />
          <div className="hero-glow w-64 h-64 bg-white/10 bottom-[-100px] right-[-60px]" aria-hidden="true" />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white text-balance mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-primary-100 text-lg max-w-xl mx-auto mb-8">
              Join thousands of users who trust ToolNest for fast, free and reliable file tools.
            </p>
            <Link
              href="/all-tools"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-primary-700 font-semibold rounded-xl hover:scale-105 active:scale-100 transition-transform shadow-xl"
            >
              Explore All Tools <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
