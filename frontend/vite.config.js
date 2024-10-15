import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',  // Bind to all network interfaces
    strictPort: true,  // Ensures Vite will fail if the port is already in use
    port: 5173,        // Port number
  },
  plugins: [react()],
})