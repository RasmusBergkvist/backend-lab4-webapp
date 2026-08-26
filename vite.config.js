import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        add: resolve(__dirname, "add.html"),
        edit: resolve(__dirname, "edit.html"),
        login: resolve(__dirname, "login.html"),
        register: resolve(__dirname, "register.html"),
      }
    }
  },
  css: {
    devSourcemap: true
  }
});