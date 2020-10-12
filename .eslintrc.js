const scriptExtensions = ['.js', '.jsx', '.ts', '.tsx'];

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'object-curly-newline': [0],
    'import/no-extraneous-dependencies': [0],
    'jsx-a11y/no-static-element-interactions': [0],
    'jsx-a11y/click-events-have-key-events': [0],
    'jsx-a11y/no-noninteractive-element-interactions': [0],
    'consistent-return': [0],
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': [0],
    'linebreak-style': ['error', 'windows'],
    'import/no-unresolved': 'error',
    'max-len': [2, { code: 100 }],
    'implicit-arrow-linebreak': [0],
    'react/prop-types': [0],
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': [0],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-unused-vars': 'off',
      },
    },
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: scriptExtensions,
      },
      typescript: {
        project: 'tsconfig.json',
      },
    },
  },
};
