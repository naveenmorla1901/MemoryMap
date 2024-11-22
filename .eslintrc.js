// .eslintrc.js
module.exports = {
    root: true,
    extends: [
      '@react-native-community',
      'prettier',
      'prettier/@typescript-eslint',
      'prettier/react',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
      'prettier/prettier': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn'
    }
  };