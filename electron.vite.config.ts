import { resolve } from 'path'
import { defineConfig } from 'electron-vite' // <-- Ya no importas externalizeDepsPlugin
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  main: {
    // plugins: []  // <-- Lo dejamos vacío o lo omitimos
  },
  preload: {
    // plugins: []  // <-- Igual aquí
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [
      react(),
      tailwindcss()
    ]
  }
})