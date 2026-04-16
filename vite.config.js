import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const Api_Address = "http://10.193.255.176:8000"

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5174,
    proxy: {
      '/api': {
        target: Api_Address,
        changeOrigin: true,
        secure: false,
        headers: {
          'Origin': Api_Address,
          'Referer': Api_Address + '/'
        }
      },
      '/admin': {
        target: Api_Address,
        changeOrigin: true,
        secure: false
      },
      '/auth': {
        target: Api_Address,
        changeOrigin: true,
        secure: false,
        headers: {
          'Origin': Api_Address,
          'Referer': Api_Address + '/'
        }
      },
      '/media': {
        target: Api_Address,
        changeOrigin: true,
        secure: false
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'vendor-react';
            if (id.includes('framer-motion')) return 'vendor-motion';
            if (id.includes('lucide')) return 'vendor-icons';
            return 'vendor';
          }
        }
      }
    }
  }
})