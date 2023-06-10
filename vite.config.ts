import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base:"/React-NoteTaker",
  plugins: [react()],
  server:{
    port: 8080
  }
})
