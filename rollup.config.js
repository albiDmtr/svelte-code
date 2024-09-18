import svelte from 'rollup-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

const isProduction = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/CodeEditor.svelte',
  output: [
    {
      file: 'dist/CodeEditor.js',
      format: 'es',
    },
    {
      file: 'dist/CodeEditor.umd.js',
      format: 'umd',
      name: 'CodeEditor'
    }
  ],
  plugins: [
    svelte({
      preprocess: sveltePreprocess({
        typescript: true, // Enable TypeScript support
      }),
      dev: !isProduction,
    }),
    resolve({
      browser: true,
      dedupe: ['svelte']
    }),
    commonjs(),
    isProduction && terser()
  ]
};