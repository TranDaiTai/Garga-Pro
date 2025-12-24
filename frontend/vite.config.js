import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import tailwindcss from '@tailwindcss/vite'  //
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  tailwindcss()
  ],
  server:{
    proxy: {
      '/api':{
        target: 'http://myapp.local:5000',
        changeOrigin: false,
      }
    },
    port:5173,
    // allowedHosts: ['myapp.local'],
  },
  resolve:{
    alias:{
      '@': path.resolve(__dirname, './src'),
    }
  }
})
