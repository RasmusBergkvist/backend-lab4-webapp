import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        add: resolve(import.meta.dirname, "add.html"),
        edit: resolve(import.meta.dirname, "edit.html"),
        login: resolve(import.meta.dirname, "login.html"),
        register: resolve(import.meta.dirname, "register.html"),
        mypage: resolve(import.meta.dirname, "my-page.html"),
      }
    }
  },
  css: {
    devSourcemap: true
  }
});