import { defineConfig } from 'vite'
import path from 'path';
import react from '@vitejs/plugin-react-swc'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import postcssPresetEnv from 'postcss-preset-env'
import postCssPxToRem from 'postcss-pxtorem'
import AutoImport from 'unplugin-auto-import/vite'
import viteCompression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    AutoImport({
      imports: ['react', 'react-router-dom'],
      dts: 'src/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true,
      },
    }),
    viteCompression({
      verbose: true, // 是否在控制台输出压缩结果
      disable: false, // 默认 false, 设置为 true 来禁用压缩
      threshold: 10240, // 只处理大于此大小的资源（单位：字节）。默认值为 0。
      algorithm: "gzip", // 使用 gzip 压缩
      ext: ".gz", // 输出文件的扩展名
      deleteOriginFile: false,
    }),
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
        postCssPxToRem({
          rootValue: 16,
          propList: ['*'],
        }),
        postcssPresetEnv(),
        tailwindcss()
      ]
    }
  },
  server: {
    port: 5173,
    // host: true,
    open: true,
    // proxy: {
    //   // 接口地址代理
    //   '/api': {
    //     target: 'http://data.aicnic.cn/', // 接口的域名
    //     secure: false, // 如果是https接口，需要配置这个参数
    //     changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
    //     rewrite: (path) => path.replace(/^\/api/, '/api')
    //   }
    // }
  }
})
