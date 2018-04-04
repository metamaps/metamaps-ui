module.exports = {
  "parser": "babel-eslint",
  "parserOptions": {
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "modules": true
    }
  },
  "extends": "standard",
  "env": {
    "es6": true,
    "node": true
  },
  "plugins": [
    "promise",
    "standard",
    "react"
  ],
  "rules": {
    "react/jsx-uses-react": [2],
    "react/jsx-uses-vars": [2],
    "space-before-function-paren": [2, "never"],
    "yoda": [2, "never", { "exceptRange": true }]
  }
}