'use client';

import { useState } from 'react';
import { Download, Loader2, RefreshCw, GripVertical } from 'lucide-react';
import { FileDropzone } from '@/components/tools/FileDropzone';

export function ImageToPdfTool() {
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

  const handleRemoveAll = () => {
    setFiles([]);
    setResultUrl(null);
  };

  const loadImage = (file: File): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });

  const handleConvert = async () => {
    if (files.length === 0) return;
    setProcessing(true);
    setError(null);

    try {
      const { jsPDF } = await import(/* webpackIgnore: true */ 'jspdf');
      const pdf = new jsPDF({ unit: 'px', format: 'a4' });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      for (let i = 0; i < files.length; i++) {
        const img = await loadImage(files[i]);
        const ratio = Math.min(pageWidth / img.width, pageHeight / img.height);
        const w = img.width * ratio;
        const h = img.height * ratio;
        const x = (pageWidth - w) / 2;
        const y = (pageHeight - h) / 2;

        if (i > 0) pdf.addPage();

        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.92);

        pdf.addImage(dataUrl, 'JPEG', x, y, w, h);
      }

      const blob = pdf.output('blob');
      setResultUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error(err);
      setError('Conversion failed. Please check your images and try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!resultUrl) return;
    const a = document.createElement('a');
    a.href = resultUrl;
    a.download = 'toolnest-converted.pdf';
    a.click();
  };

  return (
    <div className="glass-card p-6 sm:p-8">
      <FileDropzone
        accept="image/*"
        multiple
        onFilesSelected={handleFilesSelected}
        files={files}
        onRemoveFile={handleRemoveFile}
        label="Click to upload or drag and drop images"
        hint="Add multiple images — they'll appear in the PDF in upload order"
      />

      {error && (
        <div className="mt-4 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {files.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-6">
          <button onClick={handleConvert} disabled={processing} className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed">
            {processing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Converting...
              </>
            ) : (
              `Convert ${files.length} Image${files.length > 1 ? 's' : ''} to PDF`
            )}
          </button>
          {resultUrl && (
            <button onClick={handleDownload} className="btn-primary">
              <Download className="w-4 h-4" /> Download PDF
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
