'use client';

import { useState, useEffect, useRef } from 'react';
import { Download, RefreshCw, Lock, Unlock } from 'lucide-react';
import { FileDropzone } from '@/components/tools/FileDropzone';

export function ImageResizerTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [originalDims, setOriginalDims] = useState<{ w: number; h: number } | null>(null);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [lockAspect, setLockAspect] = useState(true);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFilesSelected = (newFiles: File[]) => {
    setFiles(newFiles);
    setResultUrl(null);
    const file = newFiles[0];
    if (!file) return;
    const img = new Image();
    img.onload = () => {
      setOriginalDims({ w: img.width, h: img.height });
      setWidth(img.width);
      setHeight(img.height);
      imgRef.current = img;
    };
    img.src = URL.createObjectURL(file);
  };

  const handleRemove = () => {
    setFiles([]);
    setResultUrl(null);
    setOriginalDims(null);
  };

  const handleWidthChange = (val: number) => {
    setWidth(val);
    if (lockAspect && originalDims) {
      setHeight(Math.round((val * originalDims.h) / originalDims.w));
    }
  };

  const handleHeightChange = (val: number) => {
    setHeight(val);
    if (lockAspect && originalDims) {
      setWidth(Math.round((val * originalDims.w) / originalDims.h));
    }
  };

  const handleResize = () => {
    if (!imgRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(imgRef.current, 0, 0, width, height);
    canvas.toBlob((blob) => {
      if (blob) setResultUrl(URL.createObjectURL(blob));
    }, files[0]?.type || 'image/png');
  };

  const handleDownload = () => {
    if (!resultUrl) return;
    const a = document.createElement('a');
    a.href = resultUrl;
    a.download = `toolnest-resized-${width}x${height}.png`;
    a.click();
  };

  const presets = [
    { label: 'Instagram Post', w: 1080, h: 1080 },
    { label: 'Facebook Cover', w: 820, h: 312 },
    { label: 'YouTube Thumbnail', w: 1280, h: 720 },
    { label: 'Twitter Header', w: 1500, h: 500 },
  ];

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
          {originalDims && (
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              Original size: <span className="font-semibold text-slate-700 dark:text-slate-300">{originalDims.w} × {originalDims.h}px</span>
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Width (px)</label>
              <input
                type="number"
                value={width}
                onChange={(e) => handleWidthChange(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Height (px)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => handleHeightChange(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <button
            onClick={() => setLockAspect(!lockAspect)}
            className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-6 hover:text-primary-600 transition-colors"
          >
            {lockAspect ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
            {lockAspect ? 'Aspect ratio locked' : 'Aspect ratio unlocked'}
          </button>

          <div className="mb-6">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Quick Presets</p>
            <div className="flex flex-wrap gap-2">
              {presets.map((p) => (
                <button
                  key={p.label}
                  onClick={() => {
                    setWidth(p.w);
                    setHeight(p.h);
                    setLockAspect(false);
                  }}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-primary-100 dark:hover:bg-primary-950/50 hover:text-primary-700 dark:hover:text-primary-400 transition-colors"
                >
                  {p.label} ({p.w}×{p.h})
                </button>
              ))}
            </div>
          </div>

          {resultUrl && (
            <div className="mb-6 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 flex items-center justify-center bg-slate-50 dark:bg-slate-800/60 max-h-80">
              <img src={resultUrl} alt="Resized result" className="max-h-80 object-contain" />
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <button onClick={handleResize} className="btn-primary">
              Resize Image
            </button>
            {resultUrl && (
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
