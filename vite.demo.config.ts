import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  build: {
    outDir: 'demo-dist',
    emptyOutDir: true,
    sourcemap: mode === 'production',
  },
}));
