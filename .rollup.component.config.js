import resolve from 'rollup-plugin-node-resolve';
import string from 'rollup-plugin-string';

export default {
  entry: 'src/components.js',
  dest: 'components.js',
  format: 'iife',
  plugins: [
    resolve({}),
    string({
			include: ['**/*.html', '**/*.css'],
		}),
  ]
};
