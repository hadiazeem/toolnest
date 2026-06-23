'use client';

import { useState } from 'react';
import { Download, Loader2, RefreshCw, Eye, EyeOff, ShieldAlert } from 'lucide-react';
import { FileDropzone } from '@/components/tools/FileDropzone';

export function PdfPasswordProtectorTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unsupported, setUnsupported] = useState(false);

  const handleFilesSelected = (newFiles: File[]) => {
    setFiles(newFiles);
    setResultUrl(null);
    setError(null);
  };

  const handleRemove = () => {
    setFiles([]);
    setResultUrl(null);
    setPassword('');
    setConfirmPassword('');
  };

  const handleProtect = async () => {
    if (!files[0]) return;
    if (password.length < 4) {
      setError('Password must be at least 4 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setProcessing(true);
    setError(null);
    setUnsupported(false);

    try {
      const pdfLib = await import('pdf-lib');
      const { PDFDocument } = pdfLib;
      const arrayBuffer = await files[0].arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

      // pdf-lib's core API does not include password encryption out of the box.
      // We detect that here rather than silently producing an unprotected file.
      const docAny = pdfDoc as unknown as { encrypt?: (opts: unknown) => void };

      if (typeof docAny.encrypt === 'function') {
        docAny.encrypt({
          userPassword: password,
          ownerPassword: password,
        });
        const bytes = await pdfDoc.save();
        const blob = new Blob([bytes], { type: 'application/pdf' });
        setResultUrl(URL.createObjectURL(blob));
      } else {
        setUnsupported(true);
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong while processing your PDF. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!resultUrl) return;
    const a = document.createElement('a');
    a.href = resultUrl;
    a.download = `toolnest-protected-${files[0]?.name || 'document.pdf'}`;
    a.click();
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
          <div className="space-y-4 mb-6">
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Set Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter a strong password"
                  className="w-full px-4 py-2.5 pr-12 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Confirm Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          {unsupported && (
            <div className="mb-4 p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-sm text-amber-700 dark:text-amber-400 flex gap-3">
              <ShieldAlert className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium mb-1">Encryption requires a server-side step</p>
                <p>
                  The PDF encryption standard requires cryptographic operations that the installed version
                  of pdf-lib in this project doesn't expose client-side. To make this tool fully functional,
                  add a small API route using <code className="px-1 py-0.5 bg-amber-100 dark:bg-amber-900/50 rounded">qpdf</code> or{' '}
                  <code className="px-1 py-0.5 bg-amber-100 dark:bg-amber-900/50 rounded">node-qpdf2</code> on
                  the server (see the README for the exact setup) — this keeps the rest of ToolNest's
                  architecture unchanged.
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <button onClick={handleProtect} disabled={processing} className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed">
              {processing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Protecting...
                </>
              ) : (
                'Add Password'
              )}
            </button>
            {resultUrl && (
              <button onClick={handleDownload} className="btn-primary">
                <Download className="w-4 h-4" /> Download Protected PDF
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
