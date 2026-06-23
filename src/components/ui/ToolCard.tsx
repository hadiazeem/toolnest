import Link from 'next/link';
import { ArrowRight, Flame } from 'lucide-react';
import { Tool } from '@/types';
import { cn } from '@/lib/utils';

interface ToolCardProps {
  tool: Tool;
  className?: string;
}

export function ToolCard({ tool, className }: ToolCardProps) {
  return (
    <Link href={tool.href} className={cn('tool-card block', className)}>
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={cn(
          'w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-2xl flex-shrink-0 shadow-sm',
          tool.color
        )}>
          {tool.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors text-sm sm:text-base">
              {tool.name}
            </h3>
            {tool.popular && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full">
                <Flame className="w-2.5 h-2.5" />
                Popular
              </span>
            )}
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            {tool.description}
          </p>
        </div>

        <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-primary-500 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
      </div>
    </Link>
  );
}
