import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/microfrontend-with-systemjs/' // GitHub Pages Support https://github.com/sitek94/vite-deploy-demo
})
