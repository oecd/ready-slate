import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

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
    external: [/@babel\/runtime/],
    plugins: [
      external(),
      resolve(),
      babel({
        // babel presets and plugins are configured in .babelrc.json
        exclude: [/node_modules/],
        babelHelpers: 'runtime',
      }),
      commonjs(),
      postcss(),
    ],
  },
];
