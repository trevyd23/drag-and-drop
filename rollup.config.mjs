import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss'
import tailwindcss from 'tailwindcss'
import tailwindConfig from './tailwind.config.js'
import peerDepsExternal from "rollup-plugin-peer-deps-external"
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
        peerDepsExternal(),
        resolve(),
        commonjs(),
        typescript({ tsconfig: "./tsconfig.json" }),
        postcss({
          config: {
            path: "./postcss.config.js",
          },
          extensions: [".css"],
          minimize: true,
          inject: {
            insertAt: 'top',
          },
          plugins: [tailwindcss(tailwindConfig)]
        })
      ], 
    },
    {
      input: "dist/esm/types/index.d.ts",
      output: [{ file: "dist/index.d.ts", format: "esm" } ],
      plugins: [dts()],
      external: ["react", "react-dom", "react-icons", './index.css']
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