import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: "REACT_APP_",
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  plugins: [react()],
})
