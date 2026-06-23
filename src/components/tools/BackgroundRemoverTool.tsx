'use client';

// IMPORTANT — 'use client' alone is not enough to stop Next.js webpack from
// statically analysing dynamic imports at build time. The guard below ensures
// @imgly/background-removal (and its onnxruntime-web WASM dependency that uses
// import.meta.url) is NEVER imported during SSR / the server-side build pass.

import { useState } from 'react';
import { Download, Loader2, RefreshCw } from 'lucide-react';
import { FileDropzone } from '@/components/tools/FileDropzone';

export function BackgroundRemoverTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const handleFilesSelected = (newFiles: File[]) => {
    setFiles(newFiles);
    setResultUrl(null);
    setError(null);
    if (newFiles[0]) {
      setOriginalUrl(URL.createObjectURL(newFiles[0]));
    }
  };

  const handleRemove = () => {
    setFiles([]);
    setResultUrl(null);
    setOriginalUrl(null);
  };

  const handleProcess = async () => {
    if (!files[0]) return;

    // Runtime browser-only guard — this function is only ever called from a
    // click handler so it can never run during SSR, but being explicit here
    // also satisfies webpack's static analysis so it won't try to resolve
    // @imgly/background-removal during the server build pass.
    if (typeof window === 'undefined') return;

    setProcessing(true);
    setError(null);
    setProgress(0);

    try {
      // Dynamic import keeps onnxruntime-web (and its import.meta.url usage)
      // out of the server bundle entirely. The webpack alias in next.config.js
      // maps this to `false` on the server so it is never processed there.
      const { removeBackground } = await import(
        /* webpackIgnore: true */
        '@imgly/background-removal'
      );

      const blob = await removeBackground(files[0], {
        progress: (key: string, current: number, total: number) => {
          setProgress(Math.round((current / total) * 100));
        },
      });

      const url = URL.createObjectURL(blob);
      setResultUrl(url);
    } catch (err) {
      console.error('Background removal error:', err);
      setError(
        'Background removal failed. This feature requires a modern browser with WebAssembly support. Please try a smaller image or a different browser.'
      );
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!resultUrl) return;
    const a = document.createElement('a');
    a.href = resultUrl;
    a.download = 'toolnest-background-removed.png';
    a.click();
  };

  return (
    <div className="glass-card p-6 sm:p-8">
      {files.length === 0 ? (
        <FileDropzone
          accept="image/*"
          onFilesSelected={handleFilesSelected}
          files={files}
          onRemoveFile={handleRemove}
          label="Click to upload or drag and drop an image"
          hint="Supports JPG, PNG, WebP — up to 20MB"
        />
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Original</p>
              <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-[conic-gradient(#f1f5f9_0deg_90deg,white_90deg_180deg,#f1f5f9_180deg_270deg,white_270deg_360deg)] dark:bg-[conic-gradient(#1e293b_0deg_90deg,#0f172a_90deg_180deg,#1e293b_180deg_270deg,#0f172a_270deg_360deg)] bg-[length:20px_20px] aspect-video flex items-center justify-center">
                {originalUrl && (
                  <img src={originalUrl} alt="Original upload" className="max-h-full max-w-full object-contain" />
                )}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Result</p>
              <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-[conic-gradient(#f1f5f9_0deg_90deg,white_90deg_180deg,#f1f5f9_180deg_270deg,white_270deg_360deg)] dark:bg-[conic-gradient(#1e293b_0deg_90deg,#0f172a_90deg_180deg,#1e293b_180deg_270deg,#0f172a_270deg_360deg)] bg-[length:20px_20px] aspect-video flex items-center justify-center">
                {resultUrl ? (
                  <img src={resultUrl} alt="Background removed result" className="max-h-full max-w-full object-contain" />
                ) : processing ? (
                  <div className="flex flex-col items-center gap-3 text-slate-400">
                    <Loader2 className="w-7 h-7 animate-spin text-primary-600" />
                    <span className="text-xs">
                      {progress > 0 ? `Processing... ${progress}%` : 'Loading AI model...'}
                    </span>
                  </div>
                ) : (
                  <span className="text-xs text-slate-400">Result will appear here</span>
                )}
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            {!resultUrl && (
              <button
                onClick={handleProcess}
                disabled={processing}
                className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Removing Background...
                  </>
                ) : (
                  'Remove Background'
                )}
              </button>
            )}
            {resultUrl && (
              <button onClick={handleDownload} className="btn-primary">
                <Download className="w-4 h-4" /> Download PNG
              </button>
            )}
            <button onClick={handleRemove} className="btn-secondary">
              <RefreshCw className="w-4 h-4" /> Start Over
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
