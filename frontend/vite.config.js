import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // ---------- I add this for  the error following -------
  /*  Top-level await is not available in the configured target environment ("chrome87", "edge88", "es2020", "firefox78", "safari14" + 2 overrides) */

  // build: {
  //   target: "es2022",
  // },
  // esbuild: {
  //   target: "es2022",
  // },
  // optimizeDeps: {
  //   esbuildOptions: {
  //     target: "es2022",
  //   },
  // },
});
