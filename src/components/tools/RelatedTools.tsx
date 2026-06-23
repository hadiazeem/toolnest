import { getRelatedTools } from '@/lib/utils';
import { ToolCard } from '@/components/ui/ToolCard';

export function RelatedTools({ currentId }: { currentId: string }) {
  const related = getRelatedTools(currentId, 3);

  return (
    <section>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Related Tools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {related.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </section>
  );
}
