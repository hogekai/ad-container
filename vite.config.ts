/// <reference types="vitest" />
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path, { resolve } from "path";
import { fileURLToPath } from "url";
import { getBabelOutputPlugin } from "@rollup/plugin-babel";
import autoprefixer from "autoprefixer";
import { libInjectCss } from "vite-plugin-lib-inject-css";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  build: {
    emptyOutDir: false,
    minify: false,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "AdContainer",
      fileName: "ad-container",
    },
    rollupOptions: {
      external: [],
      output: {
        plugins: [
          getBabelOutputPlugin({
            allowAllFormats: true,
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: "> 0.25%, not dead, IE 11",
                  useBuiltIns: "usage",
                  modules: false,
                  corejs: true,
                },
              ],
            ],
          }),
        ],
      },
    },
  },
  css: {
    postcss: {
      plugins: [autoprefixer],
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    alias: {
      "@/": path.resolve(__dirname, "./src/"),
    },
  },
  plugins: [tsconfigPaths(), libInjectCss()],
});