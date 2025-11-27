import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),   // React plugin
    tailwindcss(), // Official Tailwind plugin
  ],
  // server: {
  //   port: 5173, // Custom port
  //   open: true, // Automatically opens in browser
  // },
});
