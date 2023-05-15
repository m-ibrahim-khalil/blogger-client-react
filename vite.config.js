import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://fine-lime-bull-gear.cyclic.app/',
      '^/api': {
        target: 'https://fine-lime-bull-gear.cyclic.app/',
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
