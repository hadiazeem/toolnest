import { Zap, ShieldCheck, Smartphone, Infinity as InfinityIcon } from 'lucide-react';

const FEATURES = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Process files in seconds with optimized algorithms and zero queue times.',
  },
  {
    icon: ShieldCheck,
    title: 'Privacy First',
    description: 'Files are never stored. Everything is processed securely and deleted instantly.',
  },
  {
    icon: Smartphone,
    title: 'Works Everywhere',
    description: 'Fully responsive design that works perfectly on desktop, tablet and mobile.',
  },
  {
    icon: InfinityIcon,
    title: 'No Limits',
    description: 'Use every tool as many times as you want. No sign-up, no hidden fees.',
  },
];

export function FeatureStrip() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="section-title mb-3">Why Choose ToolNest?</h2>
          <p className="section-subtitle mx-auto">
            Built for speed, privacy and simplicity — the way online tools should be.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="glass-card p-6 text-center hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary-500/20">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
