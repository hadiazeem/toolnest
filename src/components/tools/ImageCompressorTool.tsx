'use client';

import { useState } from 'react';
import { Download, Loader2, RefreshCw } from 'lucide-react';
import { FileDropzone } from '@/components/tools/FileDropzone';
import { formatFileSize } from '@/lib/utils';

export function ImageCompressorTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [quality, setQuality] = useState(70);
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

  const handleProcess = async () => {
    if (!files[0]) return;
    setProcessing(true);
    setError(null);

    try {
      // Real client-side compression using browser-image-compression
      const imageCompression = (await import('browser-image-compression')).default;
      const compressedFile = await imageCompression(files[0], {
        maxSizeMB: Math.max(0.05, (files[0].size / 1024 / 1024) * (quality / 100)),
        maxWidthOrHeight: 4096,
        useWebWorker: true,
        initialQuality: quality / 100,
      });

      const url = URL.createObjectURL(compressedFile);
      setResult({ blob: compressedFile, url });
    } catch (err) {
      console.error(err);
      setError('Compression failed. Please try a different image.');
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const a = document.createElement('a');
    a.href = result.url;
    a.download = `toolnest-compressed-${files[0]?.name || 'image.jpg'}`;
    a.click();
  };

  const savings =
    result && files[0] ? Math.round((1 - result.blob.size / files[0].size) * 100) : 0;

  return (
    <div className="glass-card p-6 sm:p-8">
      {files.length === 0 ? (
        <FileDropzone
          accept="image/*"
          onFilesSelected={handleFilesSelected}
          files={files}
          onRemoveFile={handleRemove}
          label="Click to upload or drag and drop an image"
          hint="Supports JPG, PNG, WebP — up to 50MB"
        />
      ) : (
        <div>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Compression Quality
              </label>
              <span className="text-sm font-semibold text-primary-600">{quality}%</span>
            </div>
            <input
              type="range"
              min={10}
              max={95}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full accent-primary-600"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>Smaller file</span>
              <span>Higher quality</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Original Size</p>
              <p className="text-lg font-bold text-slate-900 dark:text-white">{formatFileSize(files[0].size)}</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Compressed Size</p>
              <p className="text-lg font-bold text-primary-600">
                {result ? formatFileSize(result.blob.size) : '—'}
                {result && <span className="text-sm font-medium text-green-600 ml-2">-{savings}%</span>}
              </p>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <button onClick={handleProcess} disabled={processing} className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed">
              {processing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Compressing...
                </>
              ) : (
                'Compress Image'
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
        </div>
      )}
    </div>
  );
}
