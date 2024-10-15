import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // Ensure that font files are placed in a specific folder
          if (
            assetInfo.name &&
            /\.(woff|woff2|ttf|otf)$/.test(assetInfo.name)
          ) {
            return "fonts/[name][extname]"; // Change this as needed
          }
          return "assets/[name][extname]"; // Default handling
        },
      },
    },
  },
});
