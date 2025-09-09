import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// recreate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  server: {},
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
