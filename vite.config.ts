import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/copy-of-shanhaiguan-smart-guide/', // Ensure relative paths for assets work
  build: {
    outDir: 'dist',
  }
});