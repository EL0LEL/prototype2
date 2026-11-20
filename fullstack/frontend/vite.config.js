import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Shortcut '@' agar import file lebih bersih, cth: import Header from '@/components/common/HeaderBar'
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    // host: true membuka akses jaringan lokal Wi-Fi agar bisa langsung dites dari browser HP / Tablet Anda
    host: true,
  },
});
