import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mkcert(),
    //   VitePWA({
    //     registerType: "autoUpdate",
    //     devOptions: { enabled: false },
    //     includeAssets: ["favicon.ico", "apple-touch-icon.png"],
    //     manifest: {
    //       name: "ToteTracker",
    //       short_name: "ToteTracker",
    //       description: "Your personalized tote tracking solution",
    //       theme_color: "#0d73d4",
    //       icons: [
    //         {
    //           src: "web-app-manifest-192x192.png",
    //           sizes: "192x192",
    //           type: "image/png",
    //         },
    //         {
    //           src: "web-app-manifest-512x512.png",
    //           sizes: "512x512",
    //           type: "image/png",
    //         },
    //       ],
    //     },
    //   }),
  ],
});
