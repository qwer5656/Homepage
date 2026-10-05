// vite.config.mts
import { defineConfig } from "file:///C:/Users/Neil/Desktop/Homepage_backend/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/Neil/Desktop/Homepage_backend/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import vuetify from "file:///C:/Users/Neil/Desktop/Homepage_backend/node_modules/vite-plugin-vuetify/dist/index.js";
var __vite_injected_original_dirname = "C:\\Users\\Neil\\Desktop\\Homepage_backend";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "src")
    }
  },
  plugins: [
    vue(),
    vuetify({ autoImport: true })
  ],
  base: "./",
  test: {
    globals: true,
    environment: "jsdom",
    server: {
      deps: {
        inline: ["vuetify"]
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcTmVpbFxcXFxEZXNrdG9wXFxcXEhvbWVwYWdlX2JhY2tlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXE5laWxcXFxcRGVza3RvcFxcXFxIb21lcGFnZV9iYWNrZW5kXFxcXHZpdGUuY29uZmlnLm10c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvTmVpbC9EZXNrdG9wL0hvbWVwYWdlX2JhY2tlbmQvdml0ZS5jb25maWcubXRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS92dWV0aWZ5anMvdnVldGlmeS1sb2FkZXIvdHJlZS9uZXh0L3BhY2thZ2VzL3ZpdGUtcGx1Z2luXG5pbXBvcnQgdnVldGlmeSBmcm9tICd2aXRlLXBsdWdpbi12dWV0aWZ5J1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmNcIiksXG4gICAgfSxcbiAgfSxcbiAgcGx1Z2luczogW1xuXHRcdHZ1ZSgpLFxuXHRcdHZ1ZXRpZnkoeyBhdXRvSW1wb3J0OiB0cnVlIH0pLFxuXHRdLFxuICBiYXNlOlwiLi9cIixcbiAgdGVzdDp7XG4gICAgZ2xvYmFsczogdHJ1ZSxcbiAgICBlbnZpcm9ubWVudDogJ2pzZG9tJyxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIGRlcHM6IHtcbiAgICAgICAgaW5saW5lOiBbJ3Z1ZXRpZnknXSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFnVCxTQUFTLG9CQUFvQjtBQUM3VSxPQUFPLFNBQVM7QUFDaEIsT0FBTyxVQUFVO0FBRWpCLE9BQU8sYUFBYTtBQUpwQixJQUFNLG1DQUFtQztBQU96QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBQUEsSUFDcEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDVCxJQUFJO0FBQUEsSUFDSixRQUFRLEVBQUUsWUFBWSxLQUFLLENBQUM7QUFBQSxFQUM3QjtBQUFBLEVBQ0MsTUFBSztBQUFBLEVBQ0wsTUFBSztBQUFBLElBQ0gsU0FBUztBQUFBLElBQ1QsYUFBYTtBQUFBLElBQ2IsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLFFBQ0osUUFBUSxDQUFDLFNBQVM7QUFBQSxNQUNwQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUYsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
