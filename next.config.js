/** @type {import('next').NextConfig} */

// ─────────────────────────────────────────────────────────────────────────────
// ROOT CAUSE OF THE BUILD FAILURE
// ─────────────────────────────────────────────────────────────────────────────
// @imgly/background-removal depends on onnxruntime-web which ships a file
// called ort.webgpu.bundle.min.js.  That file uses `import.meta.url` to locate
// its WASM binaries — a valid ESM-only syntax.
//
// During `next build`, webpack processes every dynamic import() it can find,
// including the one inside BackgroundRemoverTool.tsx.  Even though that
// component is `'use client'`, webpack still statically analyses it during the
// server-side compilation pass and chokes on `import.meta` with:
//
//   "import.meta cannot be used outside of module code"
//
// THE FIXES (applied in layers so each one acts as a backstop):
//
//  1. `serverExternalPackages` — Next.js 14's way of saying "never bundle
//     these on the server; treat them as external requires".  Because all of
//     these are only ever called from client components via dynamic import(),
//     they are never actually needed at server runtime, so this is safe.
//
//  2. `webpack resolve.alias` (server pass) — aliases @imgly/background-removal
//     and onnxruntime-web to `false` on the server, making webpack emit an
//     empty module stub instead of trying to parse the real package.
//
//  3. `webpackIgnore: true` magic comment in BackgroundRemoverTool.tsx —
//     tells webpack to emit the import() as-is without processing the target
//     module's internals.  This is the cleanest client-side fix.
//
//  4. `asset/resource` rule for ort*.js files — prevents webpack from trying
//     to parse onnxruntime's pre-bundled files as JavaScript modules.
//
//  5. `transpilePackages` for packages that ship untranspiled ESM without
//     import.meta issues (browser-image-compression, jspdf).
//
//  REMOVED FROM package.json:
//  - `pdfjs-dist`   — was never imported in any source file; ships ESM with
//                     import.meta.url; pure dead weight causing build errors.
//  - `framer-motion` — was never imported in any source file; v11 is pure ESM.
// ─────────────────────────────────────────────────────────────────────────────

const nextConfig = {

  // Fix 1 — never attempt to bundle these on the server side at all.
  serverExternalPackages: [
    '@imgly/background-removal',
    'onnxruntime-web',
    'onnxruntime-node',
    '@huggingface/transformers',
  ],

  // Fix 5 — transpile these ESM packages for the client bundle.
  transpilePackages: [
    'browser-image-compression',
    'jspdf',
  ],

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },

  compress: true,
  poweredByHeader: false,

  // Fix 2, 3, 4 — webpack config
  webpack: (config, { isServer }) => {

    // Fix 4 — treat pre-bundled onnxruntime JS chunks as static assets so
    // webpack copies them as files rather than parsing them as JS modules.
    // This stops "import.meta" errors from files inside onnxruntime-web.
    config.module.rules.push({
      test: /[\\/]node_modules[\\/]onnxruntime-web[\\/].*\.(js|mjs)$/,
      type: 'asset/resource',
    });

    // Catch any ort.*.js file regardless of nesting depth.
    config.module.rules.push({
      test: /ort\.(webgpu|wasm|training)\.bundle\.min\.js$/,
      type: 'asset/resource',
    });

    // Handle raw .wasm files emitted by onnxruntime-web.
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'asset/resource',
    });

    // Fix 2 — on the server build, alias problem packages to false so webpack
    // emits an empty module stub.  Since these are only ever used in client
    // components via dynamic import(), the stubs are never executed.
    if (isServer) {
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        '@imgly/background-removal': false,
        'onnxruntime-web': false,
      };
    }

    // Prevent webpack from trying to polyfill Node built-ins that WASM packages
    // reference.  These are never needed in a browser context.
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
      stream: false,
      buffer: false,
      os: false,
    };

    return config;
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Required for SharedArrayBuffer used by onnxruntime-web WASM threads
          // (background removal uses multi-threaded WASM inference).
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cross-Origin-Resource-Policy', value: 'cross-origin' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
