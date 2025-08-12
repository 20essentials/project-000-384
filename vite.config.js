import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ecsstatic } from "@acab/ecsstatic/vite";

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "react",
      babel: {
        plugins: [["@babel/plugin-transform-react-jsx", { runtime: "automatic" }]]
      }
    }),
    ecsstatic({
      classNamePrefix: "app",
      minify: true
    })
  ],
  server: {
    port: 5173,
    open: true
  },
  build: {
    target: "esnext",
    sourcemap: true,
    cssCodeSplit: true
  },
  resolve: {
    alias: {
      "@": "/src"
    }
  }
});
