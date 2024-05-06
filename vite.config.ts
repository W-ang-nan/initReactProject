import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import postcssPresetEnv from 'postcss-preset-env'
import AutoImport from 'unplugin-auto-import/vite'
// 自行编写插件用于antd组件的自动引入 默认以A+组件名称
import { AntDesignResolver } from './src/utils/antd';
// import AntdResolver from 'unplugin-auto-import-antd'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    AutoImport({
      dts: true,
      // defaultExportByFilename: false,
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      ],
      // 自定义导入
      imports: [
        'react',
        'react-router-dom'
      ],
      resolvers: [
        // 使用我自己编写的解析器，处理antd的组件
        AntDesignResolver({
          resolveIcons: true,
        }),
      ],
    })
  ],
  base: './',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
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
