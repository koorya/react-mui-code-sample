import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  server: {
    port: 5001,
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: [
            "node_modules/react/index.js",
            "node_modules/react-dom/index.js",
          ],
          lodash: ["node_modules/lodash/index.js"],
          mobx: ["node_modules/mobx/dist/mobx.esm.js"],
        },
      },
    },
  },
  define: {
    "process.env": process.env,
  },
  publicDir: "./src/public",
});
