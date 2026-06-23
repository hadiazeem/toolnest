interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description: string;
}

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-16 pb-12 sm:pt-20 sm:pb-16">
      <div
        className="hero-glow w-72 h-72 bg-primary-400/20 top-[-80px] left-[-60px]"
        aria-hidden="true"
      />
      <div
        className="hero-glow w-72 h-72 bg-secondary-400/20 top-[-40px] right-[-60px]"
        aria-hidden="true"
      />
      <div className="relative max-w-4xl mx-auto px-4 text-center">
        {eyebrow && (
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 text-xs font-semibold tracking-wide uppercase mb-5">
            {eyebrow}
          </span>
        )}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white text-balance mb-4">
          {title}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      </div>
    </section>
  );
}
