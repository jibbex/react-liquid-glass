import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [
    react(),
  ],
  build: {
    outDir: 'demo-dist',
    emptyOutDir: true,
    sourcemap: mode === 'production',
  },
}));
