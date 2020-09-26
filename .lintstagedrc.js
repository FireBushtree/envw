module.exports = {
  '*.{js,jsx,less,md,json,ts,tsx}': [
    'eslint --fix --ext .js,.jsx,.ts,.tsx src',
    'prettier -c --write .',
  ],
};
