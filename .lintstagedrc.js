module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix --ext .js,.jsx,.ts,.tsx src', 'prettier -c --write .'],
};
