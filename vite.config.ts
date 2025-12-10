import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Enable Vitest globals like `describe`, `it`, and `expect`
    environment: "jsdom", // Simulate a browser-like environment
    setupFiles: "./setupTests.ts", // Optional: Add setup file if needed
  },
});
