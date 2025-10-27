import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import fs from 'fs'

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'))
const version = packageJson.version || '0.0.0'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/components/FreestarAdSlot/index.js'),
      name: 'FreestarAdSlot',
      fileName: () => 'index.js',
      formats: ['es']
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
        exports: 'named'
      }
    },
    copyPublicDir: false
  },
  define: {
    __PACKAGE_VERSION__: JSON.stringify(version)
  }
})
