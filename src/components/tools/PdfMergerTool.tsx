'use client';

import { useState } from 'react';
import { Download, Loader2, RefreshCw, ArrowUp, ArrowDown } from 'lucide-react';
import { FileDropzone } from '@/components/tools/FileDropzone';

export function PdfMergerTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFilesSelected = (newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles]);
    setResultUrl(null);
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setResultUrl(null);
  };

  const moveFile = (index: number, direction: -1 | 1) => {
    setFiles((prev) => {
      const newFiles = [...prev];
      const target = index + direction;
      if (target < 0 || target >= newFiles.length) return prev;
      [newFiles[index], newFiles[target]] = [newFiles[target], newFiles[index]];
      return newFiles;
    });
  };

  const handleRemoveAll = () => {
    setFiles([]);
    setResultUrl(null);
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      setError('Please add at least 2 PDF files to merge.');
      return;
    }
    setProcessing(true);
    setError(null);

    try {
      const { PDFDocument } = await import('pdf-lib');
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedBytes = await mergedPdf.save();
      const blob = new Blob([mergedBytes], { type: 'application/pdf' });
      setResultUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error(err);
      setError('Merge failed. Please make sure all files are valid, non-encrypted PDFs.');
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!resultUrl) return;
    const a = document.createElement('a');
    a.href = resultUrl;
    a.download = 'toolnest-merged.pdf';
    a.click();
  };

  return (
    <div className="glass-card p-6 sm:p-8">
      <FileDropzone
        accept="application/pdf"
        multiple
        onFilesSelected={handleFilesSelected}
        files={[]}
        onRemoveFile={() => {}}
        label="Click to upload or drag and drop PDF files"
        hint="Add 2 or more PDFs — drag order below to set the merge sequence"
      />

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-6 h-6 rounded-md bg-primary-100 dark:bg-primary-950 text-primary-600 dark:text-primary-400 text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">{file.name}</p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button onClick={() => moveFile(i, -1)} disabled={i === 0} className="p-1.5 rounded-lg text-slate-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-950/30 disabled:opacity-30 transition-colors">
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button onClick={() => moveFile(i, 1)} disabled={i === files.length - 1} className="p-1.5 rounded-lg text-slate-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-950/30 disabled:opacity-30 transition-colors">
                  <ArrowDown className="w-4 h-4" />
                </button>
                <button onClick={() => handleRemoveFile(i)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors">
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {files.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-6">
          <button onClick={handleMerge} disabled={processing} className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed">
            {processing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Merging...
              </>
            ) : (
              `Merge ${files.length} PDFs`
            )}
          </button>
          {resultUrl && (
            <button onClick={handleDownload} className="btn-primary">
              <Download className="w-4 h-4" /> Download Merged PDF
            </button>
          )}
          <button onClick={handleRemoveAll} className="btn-secondary">
            <RefreshCw className="w-4 h-4" /> Start Over
          </button>
        </div>
      )}
    </div>
  );
}
