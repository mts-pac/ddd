import globals from 'globals'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import parser from '@typescript-eslint/parser'

const configs = [
  // Eslint recommended rules
  eslint.configs.recommended,

  // Typescript Eslint recommended rules
  ...tseslint.configs.recommended,
]

export default [
  ...configs,
  {
    files: ['**/*.{js,mjs,ts}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
      },
      parser,
      parserOptions: {
        ecmaVersion: 15,
        sourceType: 'module',
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    },
  },
]
