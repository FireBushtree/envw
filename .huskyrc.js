module.exports = {
  hooks: {
    'pre-commit': 'yarn prettier && yarn lint:fix',
    'commit-msg': 'commitlint -e $GIT_PARAMS',
  },
};
