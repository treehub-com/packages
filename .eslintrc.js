module.exports = {
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: 'google',
  rules: {
    'require-jsdoc': 0,
    'max-len': [2, {
      code: 80,
      tabWidth: 2,
      ignoreUrls: true,
      ignoreTemplateLiterals: true,
    }],
  }
}
