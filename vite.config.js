import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// Builds a single homecntrd.js bundle for use as a Home Assistant
// `panel_custom` module. Drop the resulting dist/homecntrd.js file in your
// HA box's /config/www/ folder, register the panel in configuration.yaml,
// and HA will serve it at /local/homecntrd.js.

export default defineConfig({
  plugins: [react({ jsxRuntime: 'automatic' })],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'es2022',
    minify: 'esbuild',
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
      },
    },
  },
  server: {
    host: true,
    port: 5173,
  },
});
