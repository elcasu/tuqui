module.exports = {
    "env": {
      "amd": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "plugins": [
      "requirejs"
    ],
    "rules": {
      "requirejs/no-invalid-define": 2,
      "requirejs/no-multiple-define": 2,
      "requirejs/no-named-define": 2,
      "requirejs/no-commonjs-wrapper": 2,
      "requirejs/no-object-define": 1
    }
};
