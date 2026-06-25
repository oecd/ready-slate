import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';

export default [
  {
    input: './src/index.js',
    output: [
      {
        dir: 'dist/cjs',
        format: 'cjs',
        sourcemap: true,
      },
      {
        dir: 'dist/esm',
        format: 'esm',
        sourcemap: true,
        entryFileNames: () => 'index.js',
      },
    ],
    external: [/@babel\/runtime/],
    plugins: [
      external(),
      resolve(),
      babel({
        presets: [
          '@babel/preset-env',
          ['@babel/preset-react', { runtime: 'automatic' }],
        ],
        plugins: [['@babel/plugin-transform-runtime', { corejs: 3 }]],
        exclude: [/node_modules/],
        babelHelpers: 'runtime',
      }),
      commonjs(),
      postcss(),
      terser(),
    ],
  },
];
