import { defineConfig } from 'vite'
import path from 'path';
import react from '@vitejs/plugin-react-swc'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import postcssPresetEnv from 'postcss-preset-env'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  base: './',
  resolve: {
    alias: {
      // '@': fileURLToPath(new URL('./src', import.meta.url))
      '@': path.resolve(__dirname, './src'),
    }
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          // 自动添加前缀
          overrideBrowserslist: [
            // 'Android 4.1',
            // 'iOS 7.1',
            // 'Chrome > 31',
            // 'ff > 31',
            // 'ie >= 8'
            //'last 2 versions', // 所有主流浏览器最近2个版本
          ],
          grid: true
        }),
        postcssPresetEnv(),
        tailwindcss()
      ]
    }
  }
})
