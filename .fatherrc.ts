import path from 'path'

export default {
  esm: {
    type: 'babel',
    importLibToEs: true
  },
  cjs: 'babel',
  extraRollupPlugins: [
  ],
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
      }
    ]
  ]
};
