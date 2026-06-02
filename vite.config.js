import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icon.svg'],
      manifest: {
        name: 'Dance Coach — DVIDA Bronze AI Trainer',
        short_name: 'Dance Coach',
        description: 'AI-powered ballroom dance training on the official DVIDA Bronze syllabus.',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#0d1018',
        theme_color: '#0d1018',
        categories: ['education', 'sports', 'lifestyle'],
        icons: [
          { src: '/icon.svg', type: 'image/svg+xml', sizes: 'any', purpose: 'any maskable' },
        ],
      },
      workbox: {
        // Precache the app shell; let API calls always hit the network.
        globPatterns: ['**/*.{js,css,html,svg,woff2}'],
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/api/],
      },
    }),
  ],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.js'],
  },
})
