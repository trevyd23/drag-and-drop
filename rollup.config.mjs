import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import tailwind from 'rollup-plugin-tailwindcss'
import postcss from 'rollup-plugin-postcss'
import external from 'rollup-plugin-peer-deps-external'
import { dts } from 'rollup-plugin-dts'
import packageJson from './package.json' assert { type: 'json' }

// const packageJson = require('./package.json')

export default [
    {
      input: "src/index.ts",
      output: [
        {
          file: packageJson.main,
          format: "cjs",
          sourcemap: true,
        },
        {
          file: packageJson.module,
          format: "esm",
          sourcemap: true,
        },
      ],
      plugins: [
        commonjs(),
        resolve(),
        external(),
        postcss({
            minimize: true,
            modules: true,
            use: {
                sass: null,
                stylus: null,
                less: { javascriptEnabled: true }
            }, 
            extract: true
        }),
        
        typescript({ tsconfig: "./tsconfig.json" }),
        tailwind({
            input: 'src/index.css', // required
            // Tailor the emitted stylesheet to the bundle by removing any unused CSS
            // (highly recommended when packaging for distribution).
            purge: false,
          }),
       ,
      ], 
    },
    {
      input: "dist/esm/types/index.d.ts",
      output: [{ file: "dist/index.d.ts", format: "esm" }],
      plugins: [dts()],
      external: ["react", "react-dom", "react-icons"]
    },
  ]

// import sucrase from '@rollup/plugin-sucrase'
// import resolve from '@rollup/plugin-node-resolve'

// export default {
//   input: 'src/index.ts',
//   output: {
//     file: 'dist/bundle.js',
//     format: 'cjs'
//   },
//   plugins: [
//     resolve({
//       extensions: ['.js', '.ts']
//     }),
//     sucrase({
//       exclude: ['node_modules/**'],
//       transforms: ['typescript']
//     })
//   ]
// }