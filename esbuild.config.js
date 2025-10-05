import ruby2js from "@ruby2js/esbuild-plugin";
import build from "./config/esbuild.defaults.js"
import { plugins } from "./config/esbuild-plugins.js"



// You can customize this as you wish, perhaps to add new esbuild plugins.
//
// ```
// import { copy } from 'esbuild-plugin-copy'
// 
// const esbuildOptions = {
//   plugins: [
//     copy({
//       resolveFrom: 'cwd',
//       assets: {
//         from: ['./node_modules/somepackage/files/*')],
//         to: ['./output/_bridgetown/somepackage/files')],
//       },
//       verbose: false
//     }),
//   ]
// }
// ```
//
// You can also support custom base_path deployments via changing `publicPath`.
//
// ```
// const esbuildOptions = {
//   publicPath: "/my_subfolder/_bridgetown/static",
//   ...
// }
// ```

/**
 * @typedef { import("esbuild").BuildOptions } BuildOptions
 * @type {BuildOptions}
 */
const esbuildOptions = {
  plugins: [
    ...plugins,
    ruby2js()
    // add new plugins here...
  ],
  globOptions: {
    excludeFilter: /\.(dsd|lit)\.css$/
  }
}

build(esbuildOptions)
