module.exports = {
  'env': {
      'es6': true,
      'jest': true,
      'node': true
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
      'ecmaVersion': 2017,
      'sourceType': 'module'
  },
  'rules': {
      'quotes': [
          'error',
          'single',
        ],
      'no-trailing-spaces': ['error', {
        'skipBlankLines': true,
      }],
      'semi': [
          'error',
          'never'
      ],
       'no-console': 'off',
  }
}
