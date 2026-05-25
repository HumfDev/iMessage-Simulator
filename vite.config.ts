import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';
import { exportVideoPlugin } from './vite-plugin-export';

export default defineConfig({
  plugins: [react(), tailwindcss(), exportVideoPlugin()],
  optimizeDeps: {
    needsInterop: ['react-dom/client'],
    include: ['react-dom/client', 'react', 'react/jsx-dev-runtime'],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
