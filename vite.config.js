import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  base: '/The_Classic_Gentlemens_Den/',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true
  }
});