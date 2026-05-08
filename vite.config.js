import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// Builds a single homecntrd.js bundle for use as a Home Assistant
// `panel_custom` module. Drop the resulting dist/homecntrd.js file in your
// HA box's /config/www/ folder, register the panel in configuration.yaml,
// and HA will serve it at /local/homecntrd.js.

export default defineConfig({
  plugins: [react({ jsxRuntime: 'automatic' })],
  // Copy static/ verbatim into dist/. Used to ship the OpenWakeWord
  // ONNX models (melspectrogram, embedding_model, hey_jarvis) next to
  // homecntrd.js — drop all four files into HA's /config/www/ and HA
  // serves them at /local/<name>.
  publicDir: 'static',
  // onnxruntime-web ships two import flavors via export conditions:
  // (a) the default bundle inlines all WASM variants as base64 (~70 MB
  // gzipped after Vite normalises it), and (b) "use-extern-wasm" loads
  // the .wasm at runtime from a configurable path. We pick (b) so the
  // bundle stays small and our wake-word code points ORT at a CDN.
  resolve: {
    conditions: ['onnxruntime-web-use-extern-wasm', 'browser', 'module', 'import', 'default'],
  },
  // React's UMD/ESM build references process.env.NODE_ENV at runtime to pick
  // dev vs prod assertions. In Vite's lib mode those references are NOT
  // replaced by default (the assumption is downstream bundlers will do it).
  // We're not bundled downstream — HA loads our file directly — so we have
  // to inline the replacement ourselves. Without this, the browser hits a
  // ReferenceError on `process` and the panel renders blank.
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env': JSON.stringify({ NODE_ENV: 'production' }),
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'es2022',
    minify: 'esbuild',
    // Sourcemaps on: the .map file is bigger than the bundle, but the
    // alternative is reading minified stack traces, which is brutal when
    // debugging from a phone. Worth the extra ~2 MB on disk.
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/ha-panel.jsx'),
      formats: ['es'],
      fileName: () => 'homecntrd.js',
    },
    rollupOptions: {
      output: {
        // Inline everything into the single homecntrd.js so HA only has to
        // serve one file. React is bundled in.
        inlineDynamicImports: true,
        // Banner runs at the very top of the emitted bundle, before any
        // module-level code. This catches bare `process` references that
        // the `define` step doesn't (some npm packages reference `process`
        // wholesale, not just `process.env.NODE_ENV`). Without this, React
        // throws `process is not defined` at module-load time and the
        // panel never renders.
        banner: 'if(typeof globalThis!=="undefined"&&typeof globalThis.process==="undefined"){globalThis.process={env:{NODE_ENV:"production"}};}',
      },
    },
  },
  server: {
    host: true,
    port: 5173,
  },
});
