import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// DocuPH — PWA build config
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://hackathon-face-liveness-api.e.gov.ph',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/egov-api': {
        target: 'https://egov-ai-core-ws.oueg.info',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/egov-api/, ''),
      },
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'DocuPH — Unified Document Wallet',
        short_name: 'DocuPH',
        description:
          'Blockchain-verified digital wallet for Philippine government documents.',
        theme_color: '#1F3A5F',
        background_color: '#FBFAF7',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          { src: 'pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
})
