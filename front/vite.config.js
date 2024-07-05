import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    /*
      we're using aliases for directories here './src/components' => 'components'
    */
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src/"), // => import { index... } from '@/components';
            components: path.resolve(__dirname, "./src/components/"),
            pages: path.resolve(__dirname, "./src/pages"),
            contexts: path.resolve(__dirname, "./src/contexts"),
            utils: path.resolve(__dirname, "./src/utils"),
            routes: path.resolve(__dirname, "./src/routes"),
            globalStyles: path.resolve(__dirname, "./src/style/style"),
            css: path.resolve(__dirname, "./src/lib/css/index.css"),
        },
    },
});
