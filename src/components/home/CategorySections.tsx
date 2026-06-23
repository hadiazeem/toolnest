import { TOOLS } from '@/lib/data';
import { ToolCard } from '@/components/ui/ToolCard';
import { ImageIcon, FileText, Wrench } from 'lucide-react';

const CATEGORIES = [
  {
    id: 'image',
    title: 'Image Tools',
    description: 'Edit, compress, resize and convert your images.',
    icon: ImageIcon,
  },
  {
    id: 'pdf',
    title: 'PDF Tools',
    description: 'Merge, split, compress and secure your PDF files.',
    icon: FileText,
  },
  {
    id: 'utility',
    title: 'Utility Tools',
    description: 'Generate QR codes and strong passwords instantly.',
    icon: Wrench,
  },
] as const;

export function CategorySections() {
  return (
    <section className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="section-title mb-3">Everything You Need, In One Place</h2>
          <p className="section-subtitle mx-auto">
            10 carefully crafted tools across three categories — built for speed and simplicity.
          </p>
        </div>

        <div className="space-y-14">
          {CATEGORIES.map((category) => {
            const tools = TOOLS.filter((t) => t.category === category.id);
            const Icon = category.icon;
            return (
              <div key={category.id}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center shadow-md">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{category.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{category.description}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tools.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
