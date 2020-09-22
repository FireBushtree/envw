import path from 'path'
import { defineConfig } from 'dumi'

export default defineConfig({
  // logo: '/images/logo.jpg',
  alias: {
    "@/src": path.resolve(__dirname, './src')
  },
  extraBabelPlugins: [
    ['import', { libraryName: "antd", style: "css" }],
  ]
})