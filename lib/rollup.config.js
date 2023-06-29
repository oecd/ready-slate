const resolve = require('@rollup/plugin-node-resolve');
const babel = require('@rollup/plugin-babel');
const commonjs = require('@rollup/plugin-commonjs');
const external = require('rollup-plugin-peer-deps-external');
const postcss = require('rollup-plugin-postcss');

const packageJson = require('./package.json');

module.exports = [
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
