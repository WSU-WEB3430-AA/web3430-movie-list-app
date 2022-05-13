const path = require('path')
const glob = require('glob')

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from '@rollup/plugin-eslint'

let input = {}

glob.sync('./src/**/*.html').map(file => {
  return [file.substring(`.${path.sep}src${path.sep}`.length), file]
}).forEach( f => {
    input[f[0]] = f[1]
})

export default defineConfig({
  root: 'src',
  build: {
    manifest: true,
    outDir: '../public',
    emptyOutDir: true,
    rollupOptions: {
      input
    }
  },
  server: {
    port: 8080,
    open: true
  },
  plugins: [  
    {
      ...eslint({
        include: ['src/**/*.js', 'src/**/*.jsx']
      }),
      enforce: 'pre',
      apply: 'build'
    },
    react()
  ]
})