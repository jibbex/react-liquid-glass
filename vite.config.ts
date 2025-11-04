import path from 'node:path';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import dts from 'vite-plugin-dts';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({ 
      tsconfigPath: './tsconfig.lib.json',
      outDir: 'dist/types',
      insertTypesEntry: true,
    })
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'ReactLiquidGlass',
      fileName: (format) =>
        format === 'cjs' ? 'react-liquid-glass.cjs' : 'react-liquid-glass.es.js',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'styles.css'
          }
          return 'assets/[name][extname]'
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: path.resolve(__dirname, 'vitest.setup.ts'),
    css: true,
    globals: true,
    exclude: [...configDefaults.exclude, 'dist/**'],
    coverage: {
      reporter: ['text', 'html'],
    },
  },
});
