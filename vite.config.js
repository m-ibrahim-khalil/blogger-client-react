import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isProd = false;
const END_POINT = isProd
  ? 'https://fine-lime-bull-gear.cyclic.app/'
  : 'http://localhost:3001';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: END_POINT,
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.js'],
    testMatch: ['./tests/**/*.test.jsx'],
    globals: true,
  },
});
