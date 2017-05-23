import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import globals from 'rollup-plugin-node-globals';

export default {
  entry: 'src/route.js',
  dest: 'route.js',
  format: 'cjs',
  plugins: [
    resolve({}),
    commonjs({
      include: 'node_modules/**',
    }),
    globals(),
  ]
};
