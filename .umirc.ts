import path from 'path';
import { defineConfig } from 'dumi';

export default defineConfig({
  // logo: '/images/logo.jpg',
  alias: {
    '@/src': path.resolve(__dirname, './src'),
  },
  extraBabelPlugins: [['import', { libraryName: 'antd', style: 'css' }]],
  proxy: {
    '/cas': {
      target: 'http://jbxq.ljfl.envcloud.com.cn:9391',
      changeOrigin: true,
    },
    '/cloud': {
      target: 'http://jbxq.ljfl.envcloud.com.cn:9391',
      changeOrigin: true,
    },
  },
});
