import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import viteTsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => {
  return {
    build: {
      minify: true,
      outDir: "build",
      silent: true,
    },
    plugins: [
      react(),
      svgr({ svgrOptions: { icon: true } }),
      viteTsconfigPaths(),
    ],
    server: {
      proxy: {
        "/api": {
          target: "https://deijobs.in/deijobs-api/api",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    define: {
      "process.env.DEBUG": JSON.stringify("vite:*"),
    },
  };
});
