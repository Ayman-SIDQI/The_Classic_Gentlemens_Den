import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  base: 'https://ayman-sidqi.github.io/The_Classic_Gentlemens_Den/',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true
  }
});