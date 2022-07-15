import { defineConfig } from 'vite';
import vitePluginImp from 'vite-plugin-imp';
import reactRefresh from '@vitejs/plugin-react-refresh';
import react from '@vitejs/plugin-react';
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    reactRefresh(),
    vitePluginImp({
      libList: [
        {
          libName: 'antd-mobile',
          style: (name) => `antd-mobile/es/${name}/style`,
          libDirectory: 'es',
        },
      ],
    }),
  ],

  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  server: {
    // proxy: {
    //   // 选项写法
    //   '/api': {
    //     target: 'https://www.xxx.xxx',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //   },
    // },
  },
  css: {
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
        // 重写 less 变量，定制样式
      },
    },
  },
});
