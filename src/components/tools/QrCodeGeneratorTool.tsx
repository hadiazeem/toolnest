'use client';

import { useState, useEffect, useRef } from 'react';
import { Download, Link as LinkIcon, Type, Wifi, Mail } from 'lucide-react';

type QRType = 'url' | 'text' | 'email' | 'wifi';

export function QrCodeGeneratorTool() {
  const [type, setType] = useState<QRType>('url');
  const [url, setUrl] = useState('https://toolnest.app');
  const [text, setText] = useState('Hello from ToolNest!');
  const [email, setEmail] = useState('hello@example.com');
  const [wifiSSID, setWifiSSID] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');
  const [fgColor, setFgColor] = useState('#0f172a');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [size, setSize] = useState(280);
  const [dataUrl, setDataUrl] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getValue = () => {
    switch (type) {
      case 'url':
        return url || 'https://toolnest.app';
      case 'text':
        return text || ' ';
      case 'email':
        return `mailto:${email}`;
      case 'wifi':
        return `WIFI:T:WPA;S:${wifiSSID};P:${wifiPassword};;`;
      default:
        return '';
    }
  };

  useEffect(() => {
    const generate = async () => {
      const QRCode = (await import('qrcode')).default;
      try {
        const canvas = canvasRef.current;
        if (!canvas) return;
        await QRCode.toCanvas(canvas, getValue(), {
          width: size,
          margin: 2,
          color: { dark: fgColor, light: bgColor },
        });
        setDataUrl(canvas.toDataURL('image/png'));
      } catch (err) {
        console.error(err);
      }
    };
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, url, text, email, wifiSSID, wifiPassword, fgColor, bgColor, size]);

  const handleDownload = () => {
    if (!dataUrl) return;
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'toolnest-qrcode.png';
    a.click();
  };

  const types: { id: QRType; label: string; icon: typeof LinkIcon }[] = [
    { id: 'url', label: 'URL', icon: LinkIcon },
    { id: 'text', label: 'Text', icon: Type },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'wifi', label: 'Wi-Fi', icon: Wifi },
  ];

  return (
    <div className="glass-card p-6 sm:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div>
          <div className="flex gap-2 mb-6 flex-wrap">
            {types.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setType(t.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    type === t.id
                      ? 'bg-primary-600 text-white shadow-md shadow-primary-500/25'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <Icon className="w-4 h-4" /> {t.label}
                </button>
              );
            })}
          </div>

          {type === 'url' && (
            <div className="mb-6">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Website URL</label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          )}

          {type === 'text' && (
            <div className="mb-6">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Text Content</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              />
            </div>
          )}

          {type === 'email' && (
            <div className="mb-6">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          )}

          {type === 'wifi' && (
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Network Name (SSID)</label>
                <input
                  type="text"
                  value={wifiSSID}
                  onChange={(e) => setWifiSSID(e.target.value)}
                  placeholder="MyWiFiNetwork"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Password</label>
                <input
                  type="text"
                  value={wifiPassword}
                  onChange={(e) => setWifiPassword(e.target.value)}
                  placeholder="WiFi password"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Foreground</label>
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="w-full h-10 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Background</label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-full h-10 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Size</label>
              <span className="text-sm text-primary-600 font-semibold">{size}px</span>
            </div>
            <input
              type="range"
              min={150}
              max={600}
              step={10}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full accent-primary-600"
            />
          </div>
        </div>

        {/* Preview */}
        <div className="flex flex-col items-center justify-center">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm mb-6">
            <canvas ref={canvasRef} className="rounded-lg" style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
          <button onClick={handleDownload} className="btn-primary">
            <Download className="w-4 h-4" /> Download QR Code
          </button>
        </div>
      </div>
    </div>
  );
}
