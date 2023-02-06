import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import externals from "rollup-plugin-node-externals";
import del from "rollup-plugin-delete";
import fs from "fs"

const pkg = JSON.parse(
  fs.readFileSync(
    new URL("./package.json", import.meta.url)))

export default [
  {
    input: "./src/index.js",
    plugins: [
      del({ targets: "dist/*" }),
      externals({ deps: true }),
      nodeResolve({
        extensions: [".js", ".ts", ".tsx"],
      }),
      babel({
        // babelHelpers: "runtime",
        babelHelpers: "bundled",
        exclude: "**/node_modules/**",
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      }),
      commonjs(),
    ],
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" },
    ],
  },
];