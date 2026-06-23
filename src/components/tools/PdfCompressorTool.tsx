'use client';

import { useState } from 'react';
import { Download, Loader2, RefreshCw } from 'lucide-react';
import { FileDropzone } from '@/components/tools/FileDropzone';
import { formatFileSize } from '@/lib/utils';

export function PdfCompressorTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [result, setResult] = useState<{ blob: Blob; url: string } | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFilesSelected = (newFiles: File[]) => {
    setFiles(newFiles);
    setResult(null);
    setError(null);
  };

  const handleRemove = () => {
    setFiles([]);
    setResult(null);
  };

  const handleCompress = async () => {
    if (!files[0]) return;
    setProcessing(true);
    setError(null);

    try {
      const { PDFDocument } = await import('pdf-lib');
      const arrayBuffer = await files[0].arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

      // pdf-lib compression: rewrites the PDF with object streams enabled,
      // which removes redundant structures and reduces file size for most documents.
      const compressedBytes = await pdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false,
      });

      const blob = new Blob([compressedBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setResult({ blob, url });
    } catch (err) {
      console.error(err);
      setError('Compression failed. The PDF may be encrypted or corrupted.');
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const a = document.createElement('a');
    a.href = result.url;
    a.download = `toolnest-compressed-${files[0]?.name || 'document.pdf'}`;
    a.click();
  };

  const savings =
    result && files[0] && result.blob.size < files[0].size
      ? Math.round((1 - result.blob.size / files[0].size) * 100)
      : 0;

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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Original Size</p>
              <p className="text-lg font-bold text-slate-900 dark:text-white">{formatFileSize(files[0].size)}</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Compressed Size</p>
              <p className="text-lg font-bold text-primary-600">
                {result ? formatFileSize(result.blob.size) : '—'}
                {result && savings > 0 && <span className="text-sm font-medium text-green-600 ml-2">-{savings}%</span>}
              </p>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <button onClick={handleCompress} disabled={processing} className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed">
              {processing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Compressing...
                </>
              ) : (
                'Compress PDF'
              )}
            </button>
            {result && (
              <button onClick={handleDownload} className="btn-primary">
                <Download className="w-4 h-4" /> Download
              </button>
            )}
            <button onClick={handleRemove} className="btn-secondary">
              <RefreshCw className="w-4 h-4" /> Start Over
            </button>
          </div>

          <p className="text-xs text-slate-400 mt-4">
            Note: compression results vary by document. PDFs with large embedded images compress best;
            text-only PDFs may see minimal size reduction.
          </p>
        </div>
      )}
    </div>
  );
}
