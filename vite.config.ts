import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
   root: path.resolve(__dirname, "./src/example"),
   publicDir: path.resolve(__dirname, "./public"),
   build: {
      outDir: path.resolve(__dirname, "./dist"),
      emptyOutDir: true,
   },
   plugins: [react(), tailwindcss()],
   resolve: {
      alias: {
         "@": path.resolve(__dirname, "./src"),
      },
   },
});
