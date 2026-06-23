'use client';

import { useState } from 'react';
import { Download, Loader2, RefreshCw } from 'lucide-react';
import { FileDropzone } from '@/components/tools/FileDropzone';

type SplitMode = 'all' | 'range';

export function PdfSplitterTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [mode, setMode] = useState<SplitMode>('all');
  const [rangeStart, setRangeStart] = useState(1);
  const [rangeEnd, setRangeEnd] = useState(1);
  const [results, setResults] = useState<{ name: string; url: string }[]>([]);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFilesSelected = async (newFiles: File[]) => {
    setFiles(newFiles);
    setResults([]);
    setError(null);
    if (!newFiles[0]) return;

    try {
      const { PDFDocument } = await import('pdf-lib');
      const arrayBuffer = await newFiles[0].arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      const count = pdf.getPageCount();
      setPageCount(count);
      setRangeEnd(count);
    } catch {
      setError('Could not read this PDF. It may be corrupted or encrypted.');
    }
  };

  const handleRemove = () => {
    setFiles([]);
    setResults([]);
    setPageCount(null);
  };

  const handleSplit = async () => {
    if (!files[0] || !pageCount) return;
    setProcessing(true);
    setError(null);

    try {
      const { PDFDocument } = await import('pdf-lib');
      const arrayBuffer = await files[0].arrayBuffer();
      const sourcePdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

      const newResults: { name: string; url: string }[] = [];

      if (mode === 'all') {
        for (let i = 0; i < pageCount; i++) {
          const newPdf = await PDFDocument.create();
          const [page] = await newPdf.copyPages(sourcePdf, [i]);
          newPdf.addPage(page);
          const bytes = await newPdf.save();
          const blob = new Blob([bytes], { type: 'application/pdf' });
          newResults.push({ name: `page-${i + 1}.pdf`, url: URL.createObjectURL(blob) });
        }
      } else {
        const start = Math.max(1, Math.min(rangeStart, pageCount));
        const end = Math.max(start, Math.min(rangeEnd, pageCount));
        const indices = Array.from({ length: end - start + 1 }, (_, i) => start - 1 + i);
        const newPdf = await PDFDocument.create();
        const pages = await newPdf.copyPages(sourcePdf, indices);
        pages.forEach((p) => newPdf.addPage(p));
        const bytes = await newPdf.save();
        const blob = new Blob([bytes], { type: 'application/pdf' });
        newResults.push({ name: `pages-${start}-${end}.pdf`, url: URL.createObjectURL(blob) });
      }

      setResults(newResults);
    } catch (err) {
      console.error(err);
      setError('Split failed. Please try again with a valid PDF.');
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = (url: string, name: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = `toolnest-${name}`;
    a.click();
  };

  const handleDownloadAll = () => {
    results.forEach((r, i) => setTimeout(() => handleDownload(r.url, r.name), i * 200));
  };

  return (
    <div className="glass-card p-6 sm:p-8">
      {files.length === 0 ? (
        <FileDropzone
          accept="application/pdf"
          onFilesSelected={handleFilesSelected}
          files={files}
          onRemoveFile={handleRemove}
          label="Click to upload or drag and drop a PDF"
          hint="Supports PDF files up to 100MB"
        />
      ) : (
        <div>
          {pageCount && (
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              This PDF has <span className="font-semibold text-slate-700 dark:text-slate-300">{pageCount} pages</span>
            </p>
          )}

          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setMode('all')}
              className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                mode === 'all' ? 'bg-primary-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              Split Every Page
            </button>
            <button
              onClick={() => setMode('range')}
              className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                mode === 'range' ? 'bg-primary-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              Extract Page Range
            </button>
          </div>

          {mode === 'range' && pageCount && (
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">From Page</label>
                <input
                  type="number"
                  min={1}
                  max={pageCount}
                  value={rangeStart}
                  onChange={(e) => setRangeStart(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">To Page</label>
                <input
                  type="number"
                  min={1}
                  max={pageCount}
                  value={rangeEnd}
                  onChange={(e) => setRangeEnd(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          {results.length > 0 && (
            <div className="mb-6 space-y-2 max-h-64 overflow-y-auto">
              {results.map((r, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{r.name}</span>
                  <button onClick={() => handleDownload(r.url, r.name)} className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    Download
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <button onClick={handleSplit} disabled={processing} className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed">
              {processing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Splitting...
                </>
              ) : (
                'Split PDF'
              )}
            </button>
            {results.length > 1 && (
              <button onClick={handleDownloadAll} className="btn-primary">
                <Download className="w-4 h-4" /> Download All
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
