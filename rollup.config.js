import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

export default {
	input: 'index.js',
	output: {
		dir: 'umd',
		format: 'umd',
		name: 'map'
	},
	plugins: [
		commonjs(),
		resolve()
	]
};
