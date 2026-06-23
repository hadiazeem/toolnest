'use client';

import { useState, useEffect, useCallback } from 'react';
import { Copy, RefreshCw, Check, ShieldCheck, ShieldAlert } from 'lucide-react';

const CHAR_SETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
};

function getStrength(password: string): { label: string; color: string; score: number } {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return { label: 'Weak', color: 'bg-red-500', score: 25 };
  if (score <= 4) return { label: 'Good', color: 'bg-amber-500', score: 60 };
  return { label: 'Strong', color: 'bg-green-500', score: 100 };
}

export function PasswordGeneratorTool() {
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const generatePassword = useCallback(() => {
    let chars = '';
    if (useUpper) chars += CHAR_SETS.uppercase;
    if (useLower) chars += CHAR_SETS.lowercase;
    if (useNumbers) chars += CHAR_SETS.numbers;
    if (useSymbols) chars += CHAR_SETS.symbols;

    if (!chars) {
      setPassword('');
      return;
    }

    // Cryptographically secure random generation using Web Crypto API
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length];
    }
    setPassword(result);
    setHistory((prev) => [result, ...prev].slice(0, 5));
  }, [length, useUpper, useLower, useNumbers, useSymbols]);

  useEffect(() => {
    generatePassword();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const strength = password ? getStrength(password) : null;

  const toggles = [
    { label: 'Uppercase (A-Z)', value: useUpper, setter: setUseUpper },
    { label: 'Lowercase (a-z)', value: useLower, setter: setUseLower },
    { label: 'Numbers (0-9)', value: useNumbers, setter: setUseNumbers },
    { label: 'Symbols (!@#$)', value: useSymbols, setter: setUseSymbols },
  ];

  return (
    <div className="glass-card p-6 sm:p-8">
      {/* Password display */}
      <div className="relative mb-6">
        <div className="flex items-center gap-3 p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <code className="flex-1 text-lg sm:text-xl font-mono font-semibold text-slate-900 dark:text-white break-all">
            {password || 'Select at least one option'}
          </code>
          <button
            onClick={() => handleCopy(password)}
            disabled={!password}
            className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-primary-600 hover:border-primary-300 transition-colors flex-shrink-0 disabled:opacity-50"
            aria-label="Copy password"
          >
            {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            onClick={generatePassword}
            className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-primary-600 hover:border-primary-300 transition-colors flex-shrink-0"
            aria-label="Regenerate password"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {strength && (
          <div className="mt-3 flex items-center gap-3">
            <div className="flex-1 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <div
                className={`h-full ${strength.color} transition-all duration-300`}
                style={{ width: `${strength.score}%` }}
              />
            </div>
            <span className="text-xs font-medium flex items-center gap-1 text-slate-600 dark:text-slate-400">
              {strength.label === 'Strong' ? (
                <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
              ) : (
                <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
              )}
              {strength.label}
            </span>
          </div>
        )}
      </div>

      {/* Length slider */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Password Length</label>
          <span className="text-sm text-primary-600 font-semibold">{length} characters</span>
        </div>
        <input
          type="range"
          min={6}
          max={64}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          onMouseUp={generatePassword}
          onTouchEnd={generatePassword}
          className="w-full accent-primary-600"
        />
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {toggles.map((toggle) => (
          <label
            key={toggle.label}
            className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
          >
            <input
              type="checkbox"
              checked={toggle.value}
              onChange={(e) => {
                toggle.setter(e.target.checked);
                setTimeout(generatePassword, 0);
              }}
              className="w-4 h-4 rounded accent-primary-600"
            />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{toggle.label}</span>
          </label>
        ))}
      </div>

      <button onClick={generatePassword} className="btn-primary w-full sm:w-auto justify-center">
        <RefreshCw className="w-4 h-4" /> Generate New Password
      </button>

      {/* History */}
      {history.length > 1 && (
        <div className="mt-8">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Recent Passwords</p>
          <div className="space-y-2">
            {history.slice(1).map((p, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700"
              >
                <code className="text-sm font-mono text-slate-500 dark:text-slate-400 truncate">{p}</code>
                <button onClick={() => handleCopy(p)} className="text-slate-400 hover:text-primary-600 flex-shrink-0">
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
