module.exports = {
  "env": {
    "browser": true,
    // "es6": true,
    // "node": true,
  },
  "extends": [
    "airbnb"
  ],
  "plugins": [
    "react",
    "jsx-a11y",
    "import"
  ],
  "rules": {
    "jsx-a11y/no-static-element-interactions": 0,
    "react/prefer-stateless-function": 0,
    "class-methods-use-this": 0,
    "no-unused-expressions": 0,
    "react/sort-comp": 0,
    "no-shadow": 0,
    "no-param-reassign": 0,
    "no-console": 0,
    "no-new": 0,
    "comma-dangle": 1,
    "no-trailing-spaces": 0,
    "object-curly-spacing": 0,
    "no-use-before-define": 0,
    "react/no-unused-prop-types": 0,
  }
};