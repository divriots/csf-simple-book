import { resolveConfig } from 'vite';
import { rollup } from 'rollup';

const config = await resolveConfig(
  {
    configFile: './vite.config.ts',
    build: {
      minify: false,
      lib: {
        entry: '',
      },
      rollupOptions: {
        preserveEntrySignatures: 'strict',
        output: {
          exports: 'auto',
          sourcemap: true,
          entryFileNames: `[name].js`,
          chunkFileNames: `chunks/[name].[hash].js`,
          assetFileNames: `[name].[ext]`,
          namespaceToStringTag: true,
        },
      },
    },
  },
  'build'
);
const inputOptions = {
  ...config.build.rollupOptions,
  plugins: config.plugins,
};

const bundle = await rollup(inputOptions);
await bundle.write(config.build.rollupOptions.output);
await bundle.close();
