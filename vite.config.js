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
    // Sourcemap off for the shipped bundle: the .map file ends up bigger
    // than the bundle itself and HA's frontend logs a confusing 404 for it
    // every page load. Local dev rebuilds can flip this back on.
    sourcemap: false,
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
      },
    },
  },
  server: {
    host: true,
    port: 5173,
  },
});
