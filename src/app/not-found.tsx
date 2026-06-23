import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <span className="text-8xl font-extrabold gradient-text">404</span>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-4 mb-3">
          Page Not Found
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          The page you're looking for doesn't exist or may have been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/" className="btn-primary">
            <Home className="w-4 h-4" /> Back to Home
          </Link>
          <Link href="/all-tools" className="btn-secondary">
            <Search className="w-4 h-4" /> Browse All Tools
          </Link>
        </div>
      </div>
    </div>
  );
}
