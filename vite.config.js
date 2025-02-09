import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "@vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const isProduction = command === "build"; // check if we're in production mode
  return {
    plugins: [react(), eslint()],
    build: { chunkSizeWarningLimit: 1000, outDir: "build" },
    base: isProduction ? "/Adventurize/" : "/", // Use "/" for development and "/Adventurize/" for production
  };
});
