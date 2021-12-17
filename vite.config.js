import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import liveReload from 'vite-plugin-live-reload'
import path from 'path'

export default defineConfig({
    plugins: [
        vue(),
        liveReload([
            __dirname + '/../public/*.php',
        ])
    ],
    root: 'resources/assets',
    base: process.env.APP_ENV === 'development' ? '/' : '/dist/',
    build: {
        outDir: path.resolve(__dirname, './resources/assets/dist/'),
        emptyOutDir: true,
        assetsDir: '',
        manifest: true,
        rollupOptions: {
            input: 'js/voyager.ts'
        }
    },
    server: {
        cors: true,
        strictPort: true,
        port: 3000
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.esm-bundler.js',
            '@': path.resolve(__dirname, './resources/assets/js'),
            '@components': path.resolve(__dirname, './resources/assets/components'),
            '@directives': path.resolve(__dirname, './resources/assets/js/directives'),
            '@helper': path.resolve(__dirname, './resources/assets/js/helper'),
            '@mixins': path.resolve(__dirname, './resources/assets/js/mixins'),
            '@sassmixins': path.resolve(__dirname, './resources/assets/sass/mixins'),
        }
    }
})