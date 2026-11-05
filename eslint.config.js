const js = require('@eslint/js');
const globals = require('globals');
const prettier = require('eslint-plugin-prettier');

module.exports = [
  { ignores: ['dist/**', 'node_modules/**'] },
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser, _: 'readonly' }
    },
    plugins: { prettier },
    rules: {
      ...prettier.configs.recommended.rules,
      'max-len': ['warn', { code: 80 }],
      indent: ['error', 2, { SwitchCase: 1 }],
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'prefer-const': 'error',
      'prefer-arrow-callback': 'warn',
      'prefer-destructuring': 'warn',
      'max-params': ['warn', 4]
    }
  },
  {
    files: ['test/**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { ...globals.node, ...globals.mocha, _: 'readonly' }
    },
    rules: { 'max-len': ['warn', { code: 100 }] }
  }
];
