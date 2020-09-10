module.exports = {
  extends: ['airbnb-typescript/base'],
    parserOptions: {
    project: './tsconfig.json',
  },
  "env": {
    "browser": true,
    "node": true,
    "jasmine": true
  },
};