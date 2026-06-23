import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { TOOLS } from './data';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getToolById(id: string) {
  return TOOLS.find((tool) => tool.id === id);
}

export function getRelatedTools(currentId: string, count = 3) {
  const current = getToolById(currentId);
  if (!current) return TOOLS.slice(0, count);
  return TOOLS.filter(
    (t) => t.id !== currentId && t.category === current.category
  )
    .slice(0, count)
    .concat(
      TOOLS.filter(
        (t) => t.id !== currentId && t.category !== current.category
      ).slice(0, Math.max(0, count - TOOLS.filter((t) => t.id !== currentId && t.category === current.category).length))
    )
    .slice(0, count);
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function generateMetadata(
  title: string,
  description: string,
  path: string
) {
  const url = `https://toolnest.app${path}`;
  return {
    title: `${title} | ToolNest`,
    description,
    openGraph: {
      title: `${title} | ToolNest`,
      description,
      url,
      siteName: 'ToolNest',
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ToolNest`,
      description,
      images: ['/og-image.png'],
      creator: '@toolnest',
    },
    alternates: { canonical: url },
  };
}
