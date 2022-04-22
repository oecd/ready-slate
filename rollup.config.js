import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

const packageJson = require('./package.json');

export default [
  {
    input: './src/index.js',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    external: [/@babel\/runtime/, /prop-types/, /react/],
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'runtime',
      }),
      commonjs(),
      postcss(),
      terser(),
    ],
  },
];
