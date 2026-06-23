'use client';

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { TOOLS } from '@/lib/data';
import { ToolCard } from '@/components/ui/ToolCard';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { HeaderAd } from '@/components/ui/AdSense';

const FILTERS = [
  { id: 'all', label: 'All Tools' },
  { id: 'image', label: 'Image Tools' },
  { id: 'pdf', label: 'PDF Tools' },
  { id: 'utility', label: 'Utility Tools' },
] as const;

export default function AllToolsPage() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<string>('all');

  const filteredTools = useMemo(() => {
    return TOOLS.filter((tool) => {
      const matchesQuery =
        tool.name.toLowerCase().includes(query.toLowerCase()) ||
        tool.description.toLowerCase().includes(query.toLowerCase());
      const matchesFilter = filter === 'all' || tool.category === filter;
      return matchesQuery && matchesFilter;
    });
  }, [query, filter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumb items={[{ label: 'All Tools' }]} />
      <HeaderAd />

      <div className="text-center mb-10 mt-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-3">
          All ToolNest Tools
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Browse our complete collection of 10 free online tools for images and PDFs. No sign-up, no limits.
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-lg mx-auto mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tools..."
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === f.id
                ? 'bg-primary-600 text-white shadow-md shadow-primary-500/25'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-slate-500 dark:text-slate-400">No tools found matching "{query}".</p>
        </div>
      )}
    </div>
  );
}
