import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    host: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (/framer-motion|motion-dom|motion-utils/.test(id)) return 'motion'
          if (/react-router/.test(id)) return 'router'
          if (/node_modules\/(react|react-dom|scheduler)\//.test(id)) return 'react'
          return 'vendor'
        },
      },
    },
  },
})
