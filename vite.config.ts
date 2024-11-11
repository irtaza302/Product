import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: process.env.NODE_ENV === 'production' 
          ? 'https://product-gold-mu.vercel.app'
          : 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    sourcemap: true
  },
  define: {
    'process.env.VITE_API_URL': JSON.stringify(
      process.env.NODE_ENV === 'production'
        ? 'https://product-gold-mu.vercel.app/api'
        : 'http://localhost:5000/api'
    )
  }
});