import Link from 'next/link';
import { Wrench, Twitter, Github, Linkedin } from 'lucide-react';
import { TOOLS } from '@/lib/data';

export function Footer() {
  const imageTools = TOOLS.filter((t) => t.category === 'image');
  const pdfTools = TOOLS.filter((t) => t.category === 'pdf');
  const utilityTools = TOOLS.filter((t) => t.category === 'utility');

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
      {/* Ad Placeholder */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="ad-placeholder h-24 w-full">
          <span>Footer Advertisement — 728×90</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand */}
        <div className="lg:col-span-2">
          <Link href="/" className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center">
              <Wrench className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-white">ToolNest</span>
          </Link>
          <p className="text-sm leading-relaxed mb-6 max-w-xs">
            Fast, free and powerful online tools for images and PDFs. No sign-up, no cost, no limits.
          </p>
          <div className="flex gap-3">
            {[Twitter, Github, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-primary-600 flex items-center justify-center transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Image Tools */}
        <div>
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Image Tools</h3>
          <ul className="space-y-2.5">
            {imageTools.map((tool) => (
              <li key={tool.id}>
                <Link href={tool.href} className="text-sm hover:text-primary-400 transition-colors">
                  {tool.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* PDF Tools */}
        <div>
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">PDF Tools</h3>
          <ul className="space-y-2.5">
            {pdfTools.map((tool) => (
              <li key={tool.id}>
                <Link href={tool.href} className="text-sm hover:text-primary-400 transition-colors">
                  {tool.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Other Tools</h3>
          <ul className="space-y-2.5 mb-6">
            {utilityTools.map((tool) => (
              <li key={tool.id}>
                <Link href={tool.href} className="text-sm hover:text-primary-400 transition-colors">
                  {tool.name}
                </Link>
              </li>
            ))}
          </ul>
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Company</h3>
          <ul className="space-y-2.5">
            {[
              { href: '/about', label: 'About Us' },
              { href: '/blog', label: 'Blog' },
              { href: '/contact', label: 'Contact' },
              { href: '/privacy-policy', label: 'Privacy Policy' },
              { href: '/terms', label: 'Terms & Conditions' },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm hover:text-primary-400 transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">© {new Date().getFullYear()} ToolNest. All rights reserved.</p>
          <p className="text-sm">
            Built with ❤️ for everyone who needs fast, free tools.
          </p>
        </div>
      </div>
    </footer>
  );
}
