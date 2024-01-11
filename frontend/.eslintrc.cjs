module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    indent: ['error', 2], // Используйте отступ из двух пробелов
    quotes: ['error', 'single' | 'backtick'], // Используйте одинарные кавычки для строк
    semi: ['error', 'always'], // Всегда ставьте точку с запятой в конце выражения
    'comma-dangle': ['error', 'always-multiline'], // Всегда используйте запятую в последней строке многострочных объектов и массивов
    'no-console': 'warn', // Вывод в консоль должен вызывать предупреждение
    'no-unused-vars': 'warn', // Предупреждение о неиспользуемых переменных
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
