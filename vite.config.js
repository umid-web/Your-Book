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
})