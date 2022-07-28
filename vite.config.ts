import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts'

const pkg = require('./package.json')

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [dts()],
    build: {
      minify: false,
      lib: {
        entry: './src/index.ts',
        name: 'index',
      },
      rollupOptions: {
        preserveEntrySignatures: 'strict',
        external: Object.keys(pkg.dependencies),
        output: {
          dir: './dist',
          format: 'esm',
        },
        input: {
          index: '/src/index.ts',
          'story-card': '/src/story-card.ts',
          'story-book': '/src/story-book.ts',
          'story-file': '/src/story-file.ts',
        },
      },
    },
  };
});
