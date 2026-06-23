import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Calendar, Clock } from 'lucide-react';
import { BLOG_CONTENT } from '@/lib/blog-content';
import { TOOLS } from '@/lib/data';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ToolCard } from '@/components/ui/ToolCard';
import { InContentAd, SidebarAd } from '@/components/ui/AdSense';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return Object.keys(BLOG_CONTENT).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = BLOG_CONTENT[params.slug];
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `https://toolnest.app/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://toolnest.app/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = BLOG_CONTENT[params.slug];
  if (!post) notFound();

  const relatedTools = TOOLS.filter((t) => post.relatedTools.includes(t.id));

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Organization', name: 'ToolNest' },
    publisher: { '@type': 'Organization', name: 'ToolNest', logo: { '@type': 'ImageObject', url: 'https://toolnest.app/logo.png' } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://toolnest.app/blog/${post.slug}` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: post.title }]} />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
          <article className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 text-xs font-semibold uppercase tracking-wide mb-4">
              {post.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 text-balance">
              {post.title}
            </h1>
            <div className="flex items-center gap-5 text-sm text-slate-500 dark:text-slate-400 mb-8 pb-8 border-b border-slate-200 dark:border-slate-800">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>

            <div className="space-y-8">
              {post.content.map((section, i) => (
                <div key={i}>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{section.heading}</h2>
                  {section.body.map((para, j) => (
                    <p key={j} className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                      {para}
                    </p>
                  ))}
                  {i === 1 && <InContentAd />}
                </div>
              ))}
            </div>

            {relatedTools.length > 0 && (
              <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Related Tools</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedTools.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </div>
            )}
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <SidebarAd />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
