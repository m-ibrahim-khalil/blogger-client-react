import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://fine-lime-bull-gear.cyclic.app/',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
});
