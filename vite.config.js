// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   base: './', // ✅ Important: ensures relative paths in build output
//   plugins: [react()],
//   build: {
//     outDir: 'dist',
//     sourcemap: false,
//     rollupOptions: {
//       output: {
//         manualChunks: undefined,
//       },
//     },
//   },
//   server: {
//     proxy: {
//       '/api': 'http://localhost:5001', // Proxy requests to your backend in dev
//     },
//   },
// });
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './', // Ensures relative paths in build output
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  server: {
    port: 5174, // optional: explicitly set dev server port
    proxy: {
      '/api': 'http://localhost:5001', // Proxy requests to your backend in dev
    },
  },
});
