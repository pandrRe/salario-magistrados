import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import nodePolyfills from "rollup-plugin-node-polyfills";

export default {
    input: 'src/index.js',
    output: {
      file: 'public/bundle.js',
      format: 'iife',
      sourcemap: true
    },
    plugins: [
      nodePolyfills(),
      resolve(),
      commonjs()
    ]
};
