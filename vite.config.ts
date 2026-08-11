/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// https://vite.dev/config/
// The portfolio is the GitHub Pages user site, so development and production
// both resolve assets from the root URL.
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // Ported R3F canvases live here, isolated from the app's type-check
      // (see src/ported.d.ts) so their complexity can never break the build.
      '#ported': path.resolve(__dirname, './src/pages/home/hero/modules/_ported'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    css: false,
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    // Split long-lived vendor code out of the app bundle so it caches independently.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          // Order matters: react-router paths also contain "react".
          if (id.includes('react-router')) return 'router-vendor'
          // three + r3f + drei are large and long-lived — cache them apart.
          if (
            id.includes('/three/') ||
            id.includes('@react-three') ||
            id.includes('/troika') ||
            id.includes('/its-fine/')
          ) {
            return 'three-vendor'
          }
          if (id.includes('/react/') || id.includes('/react-dom/')) {
            return 'react-vendor'
          }
          return undefined
        },
      },
    },
  },
})
