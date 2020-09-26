module.exports = {
  hooks: {
    'pre-commit': 'yarn lint:fix',
    'commit-msg': 'commitlint -e $GIT_PARAMS',
  },
};
