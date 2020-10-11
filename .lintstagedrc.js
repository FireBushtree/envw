module.exports = {
  '*.{js,jsx,ts,tsx}': ['prettier -c --write .', 'eslint --fix --ext .js,.jsx,.ts,.tsx src'],
};
