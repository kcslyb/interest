import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [vue()],

  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${resolve('src/assets/style/common.less')}";`,
        },
        javascriptEnabled: true,
      }
    }
  }
})
