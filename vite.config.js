import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// Builds a single homecntrd.js bundle for use as a Home Assistant
// `panel_custom` module. Drop the resulting dist/homecntrd.js file in your
// HA box's /config/www/ folder, register the panel in configuration.yaml,
// and HA will serve it at /local/homecntrd.js.

export default defineConfig({
  plugins: [react({ jsxRuntime: 'automatic' })],
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
