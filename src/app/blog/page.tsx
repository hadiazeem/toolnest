import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/data';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { PageHero } from '@/components/ui/PageHero';
import { HeaderAd } from '@/components/ui/AdSense';

export const metadata: Metadata = {
  title: 'Blog — Tips, Guides & Tutorials',
  description:
    'Read the ToolNest blog for tips, guides and tutorials on image editing, PDF management, security and productivity.',
  alternates: { canonical: 'https://toolnest.app/blog' },
  openGraph: {
    title: 'ToolNest Blog',
    description: 'Tips, guides and tutorials on image editing, PDF management and productivity.',
    url: 'https://toolnest.app/blog',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

export default function BlogPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Blog' }]} />
      <HeaderAd />
      <PageHero
        eyebrow="ToolNest Blog"
        title="Tips, Guides & Tutorials"
        description="Learn how to get the most out of your images and PDFs with practical guides from the ToolNest team."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
        {BLOG_POSTS.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group glass-card overflow-hidden flex flex-col">
            <div className="h-44 bg-gradient-to-br from-primary-500 to-secondary-600 flex items-center justify-center">
              <span className="text-white/90 text-xs font-semibold uppercase tracking-widest px-3 py-1 bg-white/15 rounded-full backdrop-blur-sm">
                {post.category}
              </span>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h2 className="font-bold text-lg text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 flex-1">{post.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime}
                </span>
              </div>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 mt-4 group-hover:gap-2 transition-all">
                Read more <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
