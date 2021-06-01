import { defineConfig } from 'vite'
import svelte from '@sveltejs/vite-plugin-svelte'

const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      '@sections': path.resolve(__dirname, 'src', 'sections'),
      '@components': path.resolve(__dirname, 'src', 'components'),
    }
  }
})
